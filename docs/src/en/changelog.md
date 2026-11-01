# Changelog

This page stays in sync with the root [CHANGELOG.md](https://github.com/MengXi-Studio/unix-architecture/blob/master/CHANGELOG.md).

## [1.1.0] - 2026-11-01

### Added

- **UI component library integration** (`uni_modules/m-ui-x` v0.1.0): 11 base components wired in with zero-registration easycom; theming via `$m-*` variables defined in the root `uni.scss` overridden at compile time (`@import` of vars.scss forbidden, preventing sass circular imports).
- **Page consumption replacement**: login / home page buttons replaced with `m-button` (loading state bound to useLoading, danger-plain-hairline semantic forms).
- **ux-router 0.8.2 `backFallback` integration**: when the page stack is too shallow for back(), it falls back to relaunching home (through the full guard chain).
- **Documentation site**: VitePress usage docs (this site), deployed on GitHub Pages.

### Changed

- **Mandatory migration ux-pinia 0.1.0 → 0.2.0** (the plugin's setup-style API removed): stores rewritten as class-style `UserStore extends PiniaStoreBase` (state wrapped in `reactive<T>`, actions as methods, `bindState` in the constructor); `storeToRefs` / `.value` access replaced by direct `store.state.field` reads.

### Fixed

- **Release packaging fixes**: exporting string constants from UTS plugin entries generated invalid JS in the 5.34 release pipeline (9 unused constants de-exported); app-android release builds do not follow `export type ... from` forwarding chains (domain types consolidated into single types.uts files); Android cloud-packaging Kotlin compilation fixes (explicit generics, explicit guardRoute arguments, m-loading avoiding 5.34 generator defects).

### Verified

- Web login loop E2E; Android cloud-packaging compilation passed (Kotlin pipeline).
- Android cloud-packaging artifact (APK): `__UNI__FDA7014` — <https://mp-b8b8347a-48e9-434d-8302-3e9d99c2cb01.cdn.bspapp.com/cloudstorage/app-build-pkg/1793535799767-__UNI__FDA7014_1793535789282.apk> (direct uniCloud storage link, time-limited; if expired, re-package via HBuilderX cloud packaging).

## [1.0.0] - 2026-10-21

The engineering architecture built from zero to its first stable form: api / stores / router / utils / pages fully layered, verified end to end on Web. Includes the layered skeleton, network layer wrapper (dual interceptors), auth system (in-memory cache + ensureAuthReady), global guards (whitelist + cold-start re-run + InterceptorPlugin fallback), type organization system, ux-utils integration, and the AI collaboration rules system (.trae).

Full history in the repository [CHANGELOG.md](https://github.com/MengXi-Studio/unix-architecture/blob/master/CHANGELOG.md).
