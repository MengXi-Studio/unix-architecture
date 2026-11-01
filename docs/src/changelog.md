# 更新日志

本页与仓库根 [CHANGELOG.md](https://github.com/MengXi-Studio/unix-architecture/blob/master/CHANGELOG.md) 保持同步。

## [1.1.0] - 2026-11-01

### Added

- **UI 组件库集成**（`uni_modules/m-ui-x` v0.1.0）：11 个基础组件 easycom 零注册接入；主题经根 `uni.scss` 定义 `$m-*` 变量编译期覆盖（禁 `@import` vars.scss，防 sass 循环导入）。
- **页面消费替换**：登录页 / 首页按钮替换为 `m-button`（loading 态绑定 useLoading、danger-plain-hairline 语义形态）。
- **ux-router 0.8.2 `backFallback` 接入**：back() 页面栈不足时兜底 relaunch 回首页（走完整守卫链）。
- **文档站**：VitePress 使用文档（本站），部署于 GitHub Pages。

### Changed

- **ux-pinia 0.1.0 → 0.2.0 强制迁移**（插件 setup 式 API 移除）：store 重写为 class 式 `UserStore extends PiniaStoreBase`（state `reactive<T>` 包裹、action method 化、constructor `bindState`）；`storeToRefs` / `.value` 访问改为 `store.state.字段` 直读。

### Fixed

- **发行打包修复**：uts 插件入口导出字符串常量在 5.34 发行流水线生成非法 JS（9 个无消费方常量去导出规避）；app-android 发行拷贝不追踪 `export type ... from` 转发链（域类型收敛 types.uts 单文件）；Android 云打包 Kotlin 编译修复（显式泛型、guardRoute 显式实参、m-loading 规避 5.34 生成器缺陷）。

### Verified

- Web 端登录闭环 E2E；Android 云打包编译通过（Kotlin 链路）。

## [1.0.0] - 2026-10-21

工程架构从零搭建至首个稳定形态：api / stores / router / utils / pages 全分层落地，Web 端全链路验证通过。含分层骨架、网络层封装（双拦截器）、鉴权体系（内存缓存 + ensureAuthReady）、全局守卫（白名单 + 冷启动补跑 + InterceptorPlugin 兜底）、类型组织体系、ux-utils 接入、AI 协作规则体系（.trae）。

完整记录见仓库 [CHANGELOG.md](https://github.com/MengXi-Studio/unix-architecture/blob/master/CHANGELOG.md)。
