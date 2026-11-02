# Introduction

## Why This Architecture Exists

uni-app x is DCloud's next-generation cross-platform solution: the UTS language with a compile-time static model, one codebase compiling to JS (Web / mini-programs) and native Kotlin / Swift. The performance is excellent — but when you set out to build a serious mid-to-large project, you hit a reality: **the default ecosystem shape is a "pile of pages"**. Requests are written inside pages, state hangs off page data, navigation relies on bare string paths, and responses are raw `UTSJSONObject` subscript access.

The engineering tooling from the standard Vue3 ecosystem (vue-router's single route table, pinia's plugin protocol, axios wrappers, synchronous js-cookie reads) **cannot be transplanted directly**. uni-app x pages follow a compile-time static model with four fundamental differences:

1. **No single route table** — pages are statically registered in `pages.json`, fixed at compile time;
2. **Plugin protocol unreliable** — `app.use(pinia)` on the App side (Kotlin) is verified not to work;
3. **Storage is entirely async** — no synchronous cookie available;
4. **Nominal type system** — incompatible types on the Kotlin side are not errors but cast crashes.

This means the engineering layering must be **redesigned** under platform constraints. This template is the complete implementation of that design.

## Design Goals

- **Complete layering**: api / stores / router / utils / pages each with a single responsibility, clear type contracts, one assembly point;
- **Auth out of the box**: login loop, global guards, and cold-start race elimination all built in;
- **Reproducible**: every architectural decision has explicit criteria and verified evidence; integrating a real backend requires changing exactly one configuration point.

## Tech Stack

| Item | Description |
| --- | --- |
| Framework | uni-app x (HBuilderX 5.34+, VDOM mode, vapor: true) |
| Language | UTS (compiles to JS / Kotlin / Swift) |
| UI paradigm | Vue3 Composition API, uvue pages |
| State management | ux-pinia (class-style stores, mount-free) |
| Routing | ux-router (vue-router-style API + global guards) |
| Networking | mx-request (interceptor system) |
| Persistence | ux-storage (async) |
| Feedback | ux-utils (toast / modal, self-drawn on all platforms) |
| UI components | m-ui-x (11 base components, zero-registration easycom) |

## Layers and Plugin Mapping

Each layer has a single responsibility with one-way dependencies:

| Layer | Location | Plugin |
| --- | --- | --- |
| Network (global config + dual interceptors) | `utils/request.uts` | mx-request |
| API (domain functions + DTO restoration) | `api/*.uts` | mx-request |
| Credentials (synchronous token reads) | `utils/auth.uts` | ux-storage |
| State (business state and actions) | `stores/modules/*.uts` | ux-pinia |
| Routing (named routes + guard chain) | `router/index.uts` | ux-router |
| Global guard (auth redirects) | `router/permission.uts` | ux-router guard |
| Config (single source of global config) | `config/index.uts` | — |
| View (statically registered pages) | `pages/` | uni-app x convention |

Two platform facts worth knowing:

- uni-app x has no global layout mechanism; each page owns its own structure;
- The old notion of `computed` acting as getters in setup-style stores is outdated — ux-pinia 0.2.0 uses class-style stores, with derived values expressed as class getters.

## Next Steps

- [Quick Start](./getting-started): clone, configure, run;
- [Architecture](./architecture): directory structure, call chain, and assembly paradigm;
- [Conventions](./conventions): type organization, UTS red lines, and domain-specific rules.
