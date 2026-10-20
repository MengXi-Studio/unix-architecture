# 更新日志（Changelog）

本项目遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 格式，版本号遵循[语义化版本](https://semver.org/lang/zh-CN/)。

## [1.0.1] - 2026-10-20

### Added

- 启用 ux-router `InterceptorPlugin`（`interceptUniApi: true`）作为导航兜底：外部直调的 `uni.navigateTo` 等原生导航将被拦截转交守卫链，防止绕过鉴权守卫。Web 端全链路回归通过（冷启动守卫 / 登录 / 登出确认 / relaunch 均正常，拦截器无误拦）。

### Changed

- 页面路由元信息补齐：`pages/index/index.uvue` 补 `defineUniPage({ name, title })` 编译宏（此前仅 login 页声明），路由 meta.title 由插件同步生成。

## [1.0.0] - 2026-10-20

工程架构从零搭建至首个稳定形态：对标 vue-admin-template 分层思想，以 uni-app x 技术栈 + 梦曦插件系（ux-router / ux-pinia / mx-request / ux-storage / ux-utils）完整落地，Web 端全链路验证通过。

### Added

- **分层骨架**：`api/`（领域接口）、`stores/`（状态）、`composables/`（组合式函数）、`components/`（easycom 组件）、`router/`（路由与守卫）、`utils/`（request / auth）、`config/`（全局配置源）七大域。
- **网络层封装**（`utils/request.uts`）：基于 mx-request 的全局默认配置、`Authorization: Bearer` 自动注入拦截器、按错误码映射文案的统一错误 toast（`ERR_CANCELED` 静默）。
- **鉴权体系**（`utils/auth.uts`）：token 内存缓存（同步读）+ ux-storage 持久化（异步落盘），`ensureAuthReady()` 消除冷启动竞态。
- **全局路由守卫**（`router/permission.uts`）：白名单 + token 检查 + getInfo 补拉（失败 resetToken 回登录页）；冷启动经 `router.guardRoute()` 补跑守卫链；async 守卫 + 显式 `RawLocation`/`NavigationRedirect` 重定向。
- **登录闭环**：`pages/login/login.uvue` 登录页（redirect 回跳）、首页欢迎语与退出登录、pages.json 与路由表注册（`defineUniPage` 宏 + vite 插件生成）。
- **领域模块**：`api/user.uts`（login / getInfo / logout 薄封装，DTO 强类型还原）、`stores/modules/user.uts`（loginAction / getInfoAction / logoutAction / resetToken）、`composables/useLoading.uts`（异步加载态，错误透传）。
- **组件**：`components/AppLogo/AppLogo.uvue`（easycom 免注册，登录页与首页消费）。
- **类型组织体系**：域级 `types/` 目录 + `types.uts` 具名类型聚合出口（api / stores / composables 三域同构），DTO 与出口形状集中管理；归属标准写入各域文件头注释。
- **ux-utils 接入**：request 层错误 toast、App 端返回键提示（自绘通道 position 全生效）、退出登录前置 `showModalAsync` 确认弹窗。
- **文档**：`README.md`（项目与架构说明）与本更新日志。

### Changed

- `servers/` 目录解散并重构为社区流行命名：`servers/http.uts` → `utils/request.uts`（`initHttp` → `initRequest`）、`servers/api/` → `api/`、`servers/index.uts` 装配薄层移除（main.uts 直接调用 `initRequest()`）。
- `permission.uts` / `settings.uts` 从项目根目录归位至 `router/`、`config/`。
- 类型定义分批抽取：`UserStore`（stores）、`LoadingState`（composables）、DTO（api）统一收拢至各域 `types/`；config 的 `AppSettings` 维持就近（单文件模块私有契约，判据已注释存档）。
- 响应处理升级：api 层以 `JSON.parse<T>` 官方路径还原 DTO，store 与页面不再接触裸 `UTSJSONObject` 下标。
- toast 调用从 `uni.showToast` 迁移至 ux-utils `showToast`（参数同构，迁移零成本）。

### Removed

- `servers/` 目录（http.uts / api/user.uts / index.uts）——职责拆入 `utils/request.uts` 与 `api/`。
- 根目录 `permission.uts`、`settings.uts`（迁移至 router/、utils/ 后又随 config 层落地至 `config/index.uts`）。
- store / composable 模块内的内联类型定义（迁移至各域 `types/`）。

### Verified

- Web 端（HBuilderX 5.26 / VDOM / vapor）全链路验证：冷启动守卫重定向、登录 → 首页、带 token 冷启动、登出确认弹窗（取消 / 确定双路径）、DTO 解析、easycom 组件渲染、错误 toast；mock 服务端日志确认拦截器注入与请求协议正确。

### Known Issues

- `redirect` query 在 Web 端存在双重编码（`%252F`）现象，round-trip 正常；深链场景需在 Android 端实测确认。
- 控制台 `NavigationFailure`（relaunch 后的确认日志）为 ux-router Web 端已知行为，跳转结果正确。
- Android（Kotlin）端代码同构，待真机回归。
