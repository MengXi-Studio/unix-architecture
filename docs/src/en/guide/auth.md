# Auth & Guards

## The Design Challenge

The Web-era experience is reading the token synchronously with `js-cookie` and grabbing it anywhere. But uni-app x persistence (ux-storage) is **asynchronous**, while guards and request interceptors are "synchronous-minded" — letting async/await infect them pollutes the entire call chain.

The solution is an **in-memory cache + an explicit readiness primitive** (`utils/auth.uts`):

- Writes take effect in memory immediately and persist asynchronously; reads are always synchronous;
- `ensureAuthReady()`: awaited on the first line of the guard chain at cold start, restoring the in-memory cache from the persistence layer. The internal Promise is reused — the persistence layer is read exactly once, concurrent calls share the same Promise, no races.

Asynchrony is compressed into the single moment of startup; the rest of the chain (guards, interceptors, pages) returns to a synchronous mindset.

## Data Flow

```
Login → setToken (immediate in memory + async persistence via ux-storage)
      → request interceptor injects Authorization: Bearer
Cold start → ensureAuthReady() restores the memory cache first → guard chain works normally
```

## Guard Chain (router/permission.uts)

```
await ensureAuthReady()
├─ Has token
│   ├─ Visiting login page → redirect home
│   ├─ User info present → allow
│   └─ No user info → await getInfoAction
│       ├─ Success → allow
│       └─ Failure → resetToken + redirect to login (with redirect)
└─ No token
    ├─ Whitelisted (login page) → allow
    └─ Otherwise → redirect to login (query carries redirect=path)
```

Whitelist: the `whiteList` array (currently the login page only). New pages require login by default; pages that skip login must be registered in the whitelist.

## Cold-Start Re-Run

On cold start (H5 direct entry / deeplink), the page may have loaded without the guard running. `setupPermission()` explicitly calls `router.guardRoute(null, null)` after `router.isReady()` to re-run the guard chain, with the redirect executed as a relaunch.

## Navigation Fallback

The runtime enables `InterceptorPlugin` (`interceptUniApi: true`): raw native navigation such as direct `uni.navigateTo` calls is intercepted and handed to the guard chain. This is defense in depth — the convention still requires going through `useRouter()` and never relying on the fallback.

## Separation of Concerns

- **Token read/write**: `utils/auth.uts` (mirrors js-cookie's responsibility);
- **Login/logout actions**: `stores/modules/user.uts` (loginAction / logoutAction / resetToken);
- **Logging out**: `showModalAsync` confirmation dialog (standard semantics for destructive operations) → logoutAction calls the API (failure does not block local cleanup) → clears state and persistence → relaunch to the login page.

ux-pinia 0.2.0's built-in persistence plugin is **not used for tokens**: it avoids splitting persistence semantics across ux-storage and the built-in plugin (criteria in the repository task documents). The built-in persistence is left for business-state scenarios such as drafts.
