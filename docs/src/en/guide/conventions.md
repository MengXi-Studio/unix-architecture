# Conventions

Required reading before writing code. These conventions are not style preferences — every one of them corresponds to a real compile error or runtime crash, and they stay in sync with the AI assistance rules (`.trae/rules/architecture.md`).

## Type Organization Standard

**Criterion: types follow their consumers.**

| Type Nature | Location | Examples |
| --- | --- | --- |
| Cross-layer shared (api → store → pages/guards) | Defined in a single `<domain>/types.uts` file | `LoginResult` / `UserInfo` / `LoadingState` |
| Store export shape | Class declaration in `stores/modules/*.uts`, forwarded by `stores/types.uts` | `UserStore` |
| Module-private contract of a single file | Defined locally | `AppSettings` (config), `UserState` (store module) |
| Third-party library types | Imported via `import type`, never copied | `RequestConfig` / `ResponseResult` / `Ref` |

- **Layout constraint (verified on the app-android release pipeline)**: release builds do not follow `export type ... from` forwarding chains — subdirectory files referenced only through type forwarding never enter the release tree, and the analyzer fails while parsing the forwarding statement with `index not found`. Therefore domain types are defined within the single `<domain>/types.uts` file; **types/ subdirectory forwarding chains are forbidden**. Forwarding is only allowed toward runtime-reachable files (e.g. stores/types.uts → modules).
- Consumers always import types from `<domain>/types.uts`.

## UTS Red Lines

Violations mean compile errors or runtime crashes:

| # | Pitfall | Correct Approach |
| --- | --- | --- |
| 1 | `undefined` not supported (UTS110111119) | Use `null \| T` for all nullability; variables must be initialized before use |
| 2 | No truthy/falsy in conditionals (UTS110111120) | `if (x > 0)`, `while (isValid)`; `if (arr)` is forbidden |
| 3 | Object literals only assignable to `type`-defined types (UTS110111163) | Never use interfaces to hold literals |
| 4 | Re-passing generics triggers Kotlin generic erasure | `JSON.parse<T>` inlined per call site with a concrete type |
| 5 | `export * from` / value forwarding chains unreliable on Kotlin | Aggregate exports always use named `export type { X } from` |
| 6 | Property methods on types cannot be generic (uts110111161) | Concretize callback signatures, or lift generics to the type level |
| 7 | Enums not used for cross-platform transfer | Replaced by literal union types |
| 8 | Function declarations cannot be passed as values (UTS110111152) | Callbacks are always arrow functions |
| 9 | Array access out of bounds throws on Kotlin | Bounds-check before access |
| 10 | Bare object casts crash under the nominal type system | Construct cross-library objects with exported explicit types (e.g. `RawLocation`) |

## Store (ux-pinia 0.2.0 class-style)

```uts
import { reactive } from 'vue'
import { defineStore, PiniaStoreBase } from '@/uni_modules/ux-pinia'

export type XxxState = { /* private contract defined locally */ }

export class XxxStore extends PiniaStoreBase {
  state: XxxState = reactive<XxxState>({ /* ... */ })

  constructor() {
    super()
    this.bindState(this.state)   // prerequisite for $-APIs and persistence
  }

  // Derived values use class getters (computed fields are forbidden:
  // the plugin's internal effectScope fails across pages)
  // Actions are plain methods that call api functions internally
}

export const useXxxStore = defineStore<XxxStore>('xxx', (): XxxStore => new XxxStore())
```

- State fields are read/written directly (**no `.value`**); consumers access `store.state.field`;
- Cross-store dependencies are resolved by calling the other `useXxxStore` inside methods (never in field initializers);
- Token persistence goes through `utils/auth.uts` (separation of concerns), not the built-in persistence plugin.

## UI, Navigation, and Persistence

- Navigation always via ux-router: `useRouter()`'s `push` / `replace` / `relaunch` / `back`; the `uni.navigateTo` family is **forbidden** (the InterceptorPlugin fallback exists but must not be relied upon);
- Persistence: tokens always go through `utils/auth.uts`; other business data uses ux-storage top-level `set` / `get` / `remove` (keys get a business prefix, e.g. `order:draft`); the `uni.setStorageSync` family is **forbidden**;
- Toast / modal always via ux-utils; `uni.showToast` / `uni.showModal` are **forbidden**;
- Components follow easycom: project components in `components/<Name>/<Name>.uvue`; for third-party UI, prefer reusing existing m-ui-x components;
- Styles: class selectors + flex layout only; text styles only on text/button; no scoped, no rpx (except for screen-width-dependent scenarios).

## Assembly Points

See [Architecture · Assembly Points](./architecture#assembly-points-unique-global-side-effects-nowhere-else). The vast majority of features **never** need to touch the assembly layer.
