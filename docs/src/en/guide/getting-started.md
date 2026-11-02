# Quick Start

## Requirements

- HBuilderX **5.34+** (the uni-app x compiler ships with HBuilderX)
- Git

## 1. Get the Template

```bash
git clone https://github.com/MengXi-Studio/unix-architecture.git
```

## 2. Configure the Backend URL

The single source of global config is `config/index.uts`. Pointing to a real backend only requires replacing `baseURL`:

```uts
export const settings: AppSettings = {
  appName: 'unix-architecture',
  baseURL: 'https://your-api.example.com',  // ← change here
  timeout: 15000
}
```

## 3. Local Mock (Optional)

While the backend is not ready, use any mock service with this protocol:

| Endpoint | Method | Response |
| --- | --- | --- |
| `/user/login` | POST | `{ token }` |
| `/user/info` | GET | `{ name, avatar }` (requires the `Authorization: Bearer token` header, otherwise 401) |
| `/user/logout` | POST | anything |

Note that CORS must allow the `Authorization` header.

## 4. Run

Run the project **to the browser** in HBuilderX; alternatively use the HBuilderX CLI:

```powershell
D:\HBuilderX\cli.exe launch web --project <absolute project path>
# Runtime logs
D:\HBuilderX\cli.exe logcat web --project <absolute project path> --mode lastBuild
```

## 5. Verify the Login Loop

- Cold-start visit to any page → automatically redirected to the login page when no token exists;
- The login page is pre-filled with `admin / 123456`; click "Login" → navigates to home, showing "Welcome, username";
- Click "Log out" on the home page → confirmation dialog → back to the login page.

If this loop works end to end, the network layer (token injection), state layer (class store), and routing layer (guard chain) are all functioning.

## 6. Add a Business Page

Three steps, none optional:

1. Create the page file `pages/<name>/<name>.uvue` (Composition API);
2. Declare the compile macro `defineUniPage({ name: '<name>', title: 'Page Title' })` — the route table and pages.json are generated automatically by the vite plugin, **never edit them by hand**;
3. Fetch page data through the call chain: page → composable (cross-cutting UI state) → store (business state) → api (DTO) → utils/request.

Guard semantics: new pages **require login by default** (whitelist-based); pages that skip login must be registered in the `whiteList` of `router/permission.uts`.

## Next Steps

- [Architecture](./architecture): understand the layers and call chain;
- [Conventions](./conventions): type organization and UTS red lines — required reading before writing code.
