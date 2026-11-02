# 更新日志（Changelog）

本项目遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 格式，版本号遵循[语义化版本](https://semver.org/lang/zh-CN/)。

## [1.1.0] - 2026-11-02

### Changed

- **ux-pinia 0.1.0 → 0.2.0 强制迁移**（插件 setup 式 API 移除，破坏性升级）：`stores/modules/user.uts` 重写为 class 式 `UserStore extends PiniaStoreBase`（state `reactive<T>` 包裹、action method 化、constructor `bindState`）；`stores/types/user.uts` 删除（class 声明即出口形状，`UserState` 按判据就近定义），`stores/types.uts` 改为转发 class 类型；`pages/index/index.uvue` 与 `router/permission.uts` 的 `storeToRefs` / `.value` 访问改为 `store.state.字段` 直读。

### Added

- **UI 组件库集成**（`uni_modules/m-ui-x` v0.1.0，梦曦 unix-ui 的 uni_modules 发行版）：11 个基础组件 easycom 零注册接入，无需 import 与手动注册；主题经根 `uni.scss` 直接定义 `$m-*` 变量编译期覆盖（`!default` 叠加），**禁止** `@import` 插件内 `vars.scss`——uni.scss 注入全组件样式会触发 sass 循环导入，判据已注释存档于 uni.scss。
- **页面消费替换**：登录页提交按钮替换为 `m-button`（primary + block，`:loading` 绑定 `useLoading` 加载态，加载中自动阻断点击并切换 `loading-text`）；首页退出登录替换为 `m-button`（`danger + plain + hairline` 语义形态）；页面间距按样式隔离规约经外层 view 控制。
- **ux-router 0.8.2 `backFallback` 接入**（`router/index.uts`）：back() 页面栈不足时兜底 relaunch 回首页——本工程路由表无 `meta.isTab` 路由，深链 / 刷新直连后的返回由 CANCELLED 失败转为走完整守卫链的兜底跳转。
- **文档站**：新增 `docs/` VitePress 双语使用文档（中英各 10 页：hero 首页 + guide 八篇 + changelog；配置拆分 `config/{index,shared,zh,en}.ts`，自定义主题 + hero 徽章，侧边栏按入门/架构/进阶/精通分组），部署于 GitHub Pages：https://mengxi-studio.github.io/unix-architecture/ ；部署经 ci-core `deploy-docs` dispatch（推 gh-pages 分支），模板仓库保持零工作流。

### Fixed

- **发行打包修复**（`uni_modules/ux-storage` / `ux-utils` / `mx-request`）：HBuilderX 5.34 发行流水线的 uts-proxy 对插件入口**导出的字符串常量**生成非法 JS（`genInitCode` 输出未加引号的字符串字面量，如 `= mx_storage:`，esbuild 于 13:44 报 `Expected a semicolon`；dev 模式不触发）。三个插件入口共 9 个无消费方的字符串常量暂去导出（内部 BUILTIN_ 孪生常量不受影响），全部插件 proxy 经 esbuild（js loader）解析验证通过；上游 unix-storage / unix-utils / unix-request 仓库需同步规避。
- **发行树类型文件修复**（app-android）：发行拷贝不追踪 `export type ... from` 转发链——`api/types/` 与 `composables/types/` 子目录文件不进发行树，分析器解析转发语句报 `index not found`。DTO（`LoginResult` / `UserInfo`）与 `LoadingState` 收敛进 `api/types.uts` / `composables/types.uts` 单文件（与 stores 域模式对齐），架构类型约定同步更新（禁 types/ 子目录转发链，转发仅允许指向运行时可达文件）。
- **Android 云打包 Kotlin 编译修复**：① `utils/auth.uts` 的 `get(...)` 补显式泛型 `get<string>`（Kotlin 端 T 推断失败）；② `router.guardRoute()` 显式传 `null, null`（5.34 Kotlin 生成器丢弃可选参数默认值）；③ `m-loading` 组件移除 `Animation` 类型句柄 / `slots.default` 脚本检查 / 带 `flush` 的 watch——5.34 Kotlin 生成器对插件组件的上述运行时符号解析失效（type 动态切换改由使用方 `:key` 重建组件触发）。

### Verified

- Web 端（HBuilderX 5.34 / VDOM / vapor）登录闭环 E2E 实测：冷启动守卫重定向 → 登录（m-button）→ `[unix-pinia] store 'user' 已创建`（class 实例化正常）→ GET /user/info 200（Bearer 注入正常）→ 首页「欢迎，梦曦用户」reactive 渲染 → 退出确认 modal → 清理登录态回登录页；控制台无错误。token 持久化经评审维持 `utils/auth.uts` 现状（不迁移内置持久化插件，判据存档于任务文档 Q1）。

## [1.0.0] - 2026-10-21

工程架构从零搭建至首个稳定形态：对标 vue-admin-template 分层思想，以 uni-app x 技术栈 + 梦曦插件系（ux-router / ux-pinia / mx-request / ux-storage / ux-utils）完整落地，Web 端全链路验证通过。

### Added

- **分层骨架**：`api/`（领域接口）、`stores/`（状态）、`composables/`（组合式函数）、`components/`（easycom 组件）、`router/`（路由与守卫）、`utils/`（request / auth）、`config/`（全局配置源）七大域。
- **网络层封装**（`utils/request.uts`）：基于 mx-request 的全局默认配置、`Authorization: Bearer` 自动注入拦截器、按错误码映射文案的统一错误 toast（`ERR_CANCELED` 静默）。
- **鉴权体系**（`utils/auth.uts`）：token 内存缓存（同步读）+ ux-storage 持久化（异步落盘），`ensureAuthReady()` 消除冷启动竞态。
- **全局路由守卫**（`router/permission.uts`）：白名单 + token 检查 + getInfo 补拉（失败 resetToken 回登录页）；冷启动经 `router.guardRoute()` 补跑守卫链；async 守卫 + 显式 `RawLocation`/`NavigationRedirect` 重定向。
- **导航兜底**：启用 ux-router `InterceptorPlugin`（`interceptUniApi: true`）——外部直调的 `uni.navigateTo` 等原生导航被拦截转交守卫链，防止绕过鉴权守卫；Web 端全链路回归通过，拦截器无误拦。
- **登录闭环**：`pages/login/login.uvue` 登录页（redirect 回跳）、首页欢迎语与退出登录、pages.json 与路由表注册（`defineUniPage` 宏 + vite 插件生成）。
- **领域模块**：`api/user.uts`（login / getInfo / logout 薄封装，DTO 强类型还原）、`stores/modules/user.uts`（loginAction / getInfoAction / logoutAction /
  resetToken）、`composables/useLoading.uts`（异步加载态，错误透传）。
- **组件**：`components/AppLogo/AppLogo.uvue`（easycom 免注册，登录页与首页消费）。
- **类型组织体系**：域级 `types/` 目录 + `types.uts` 具名类型聚合出口（api / stores / composables 三域同构），DTO 与出口形状集中管理；归属标准写入各域文件头注释。
- **ux-utils 接入**：request 层错误 toast、App 端返回键提示（自绘通道 position 全生效）、退出登录前置 `showModalAsync` 确认弹窗。
- **文档**：架构说明文档（仓库单文档门面）与本更新日志。
- **AI 协作规则体系**（`.trae/`）：`rules/` 四件套（architecture 架构红线 / core-protocol 行为协议与 DoD / workflow 文档驱动四步工作流 / project_rules 通用规范沉淀）、`skills/arch-feature` 新功能开发技能、`documents/` 任务文档归档（含 implementation-log 汇总索引）、uni-app-x MCP 配置；各部分职责见仓库首页架构文档第 9 节。

### Changed

- `servers/` 目录解散并重构为社区流行命名：`servers/http.uts` → `utils/request.uts`（`initHttp` → `initRequest`）、`servers/api/` → `api/`、`servers/index.uts` 装配薄层移除（main.uts 直接调用 `initRequest()`）。
- `permission.uts` / `settings.uts` 从项目根目录归位至 `router/`、`config/`。
- 类型定义分批抽取：`UserStore`（stores）、`LoadingState`（composables）、DTO（api）统一收拢至各域 `types/`；config 的 `AppSettings` 维持就近（单文件模块私有契约，判据已注释存档）。
- 响应处理升级：api 层以 `JSON.parse<T>` 官方路径还原 DTO，store 与页面不再接触裸 `UTSJSONObject` 下标。
- toast 调用从 `uni.showToast` 迁移至 ux-utils `showToast`（参数同构，迁移零成本）。
- 页面路由元信息补齐：`pages/index/index.uvue` 补 `defineUniPage({ name, title })` 编译宏（此前仅 login 页声明），路由 meta.title 由插件同步生成。

### Removed

- `servers/` 目录（http.uts / api/user.uts / index.uts）——职责拆入 `utils/request.uts` 与 `api/`。
- 根目录 `permission.uts`、`settings.uts`（迁移至 router/、utils/ 后又随 config 层落地至 `config/index.uts`）。
- store / composable 模块内的内联类型定义（迁移至各域 `types/`）。

### Verified

- Web 端（HBuilderX 5.26 / VDOM /
  vapor）全链路验证：冷启动守卫重定向、登录 → 首页、带 token 冷启动、登出确认弹窗（取消 / 确定双路径）、DTO 解析、easycom 组件渲染、错误 toast；mock 服务端日志确认拦截器注入与请求协议正确。

### Known Issues

- `redirect` query 在 Web 端存在双重编码（`%252F`）现象，round-trip 正常；深链场景需在 Android 端实测确认。
- 控制台 `NavigationFailure`（relaunch 后的确认日志）为 ux-router Web 端已知行为，跳转结果正确。
- Android（Kotlin）端代码同构，待真机回归。
