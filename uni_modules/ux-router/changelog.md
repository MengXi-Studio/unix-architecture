## 0.8.2 (2026-11-01)
### 新增

- **`RouterOptions.backFallback`**：返回栈底兜底目标（路径或命名路由）。`back()` 页面栈不足时自动 `relaunch` 到该页（走完整守卫链），覆盖无 tabBar 页工程（如 `navigationStyle: custom` 自绘导航的应用）；未配置时自动取首个 `meta.isTab` 路由，显式配置优先级高于 isTab 自动推断
## 0.8.1（2026-10-29）

### 修复

- **Android 云打包 Kotlin 编译错误（Return type mismatch）**：非 async 函数裸 `return` 内部 `Promise<never>`（`failNavigation`）生成的 `UTSPromise<Any?>` 与函数声明的 `UTSPromise<RouteLocation>` 不匹配；相关函数 async 化修复（`backWithStackFallback`）
- **H5 刷新 / 冷启动直连非首页后返回无效**：H5 导航栏返回箭头在页面栈仅 1 层时框架实际调用
  `uni.reLaunch({ url: '/' })`，此前该调用被 InterceptorPlugin 拦截后因根路径无有效页面被静默丢弃，同时原始调用被阻止，导致返回无任何反应；现根路径 `reLaunch` 转交入口页兜底（`relaunch` 首个 `meta.isTab`
  路由，走完整守卫链）
- **`back()` 页面栈不足兜底**：栈长 < 2 或 `delta >= 栈长` 时，由 reject `CANCELLED` 改为自动 `relaunch` 到首个 `meta.isTab` 路由（解决 App 端冷启动深链后返回无处可退）；路由表无 tabBar 路由时维持 `CANCELLED`

## 0.8.0（2026-09-27）

### 新增

- **基于文件的路由生成插件**（构建期 dev 工具，随路由库同包分发）：
  - 页面就近声明 `defineUniPage` 宏（或 `<route-config lang="jsonc|uts">` 自定义块），构建期自动生成 `pages.json`（含 tabBar / subPackages）与 `routes.gen.uts` 路由表，消除 path / title / tabBar / isTab 双份手工维护
  - 优先级链：宏 > 块 > 插件推导（`titleFallback` / `tabBar` 配置兜底），字段级合并
  - name 自动规范化：末段 camelCase → 冲突回退全路径 camelCase → 终极冲突按 `errorStrategy`（strict 抛错 / warn 告警）
  - `beforeEnter` / meta 扩展经宏声明（UTS 表达式原样注入生成文件，须自包含）
  - `preserveRouteChanges`（默认开启）：重生成时保留你对路由文件的既有修改与自定义路由
  - pages.json 手写的非页面字段（globalStyle、uniIdRouter 等）重生成时合并保留
  - watch：页面新增/删除/修改 200ms 去抖串行重跑两阶段流水线
  - 生成 `route-name.gen.d.ts`（WEB 端 `RouteNameMap` 字面量类型）与 `define-uni-page.d.ts`（宏类型声明），均可关闭
- **新增子路径导出 `@meng-xi/unix-router/vite-plugin`**：vite / webpack 适配器（unplugin 打包内置，运行时零额外依赖），`node/` 源码目录在 UTS 编译扫描范围外，主入口 UTS 编译不受影响
- **插件拆分为三个独立实现**（`node/` 重组为 `route-gen` / `pages-gen` / `routes-gen` + `shared` 目录），可独立或组合注册、互不影响：
  - `routeGen`：页面文件 → `pages.json` + `routes.gen.uts` 全量流水线（行为与此前一致）
  - `pagesGen`：页面文件 → 仅 `pages.json`（含宏 dts），不触碰路由文件
  - `routesGen`：`pages.json` → 仅路由表，不触碰 `pages.json`；支持扩展声明文件 `routes.ext.uts`（path / name ↔ 显式 name / meta 扩展 / beforeEnter，函数原文注入；`router.extensions` 可改路径或 `false` 关闭）
  - 选项随插件拆分：公共选项（`pagesJsonPath` / `watch` / `verbose` / `errorStrategy`）+ `pages` 段 / `router` 段

### 修复

- **Android 云打包编译错误（UTS 强类型）**：
  - `Promise.catch` 回调参数类型由 `any` 调整为 `any | null`：UTS 的 `any` 编译为 Kotlin 非空 `Any`，无法匹配 `UTSPromise.catch` 要求可空回调参数的重载
  - `isNavigationFailure` 首参签名由 `Error | null` 放宽为 `any | null`（内部 `instanceof` 收窄），修复 `.catch((e) => isNavigationFailure(e))` 链式用法编译失败
- **H5 端 `uni.*` 导航 API 编译类型警告**：WEB 端导航 options 收敛为统一桥接函数 `applyWebNavOptions`（动态字段经 `as any` 桥接），消除 `uni.navigateTo` 等的编译警告，运行时行为不变
- **H5 端 `router.push` 崩溃**：`pickAnimation` / `toUniAnimation` / `pickEvents` 对可选字段 `=== null` 判断后直接取 `.length` / `.size`，H5（JS 运行时）缺省值是 `undefined` 导致 `TypeError`、导航中断；统一 `?? null`
  归一化后判断
- **App 端导航动画透传缺失**：`AnimationPlugin` 此前 App 端实际未透传动画参数，现 `uni.navigateTo` / `uni.navigateBack` 具名 Options 携带 `animationType` / `animationDuration`（官方类型声明标注**仅 App 支持**：Android
  4.18+ / iOS 4.25+ / HarmonyOS 4.61+）；小程序端官方不支持动画字段，`redirectTo` / `reLaunch` / `switchTab` 官方 Options 无动画字段，均不携带

## 0.7.0（2026-09-20）

### 变更（破坏性）

- **插件注册改为实例化**：非蒸汽（原生 Kotlin/Swift）端不支持「对象字面量承载方法」，`RouterPlugin` 由 type 调整为 abstract class，内置插件改为 `class ParamsPlugin extends RouterPlugin` 实现，注册写法从
  `plugins: [ParamsPlugin]` 变更为 `plugins: [new ParamsPlugin()]`（Interceptor / Animation / Events 三个插件同理）

### 修复

- **非蒸汽（原生）编译全链路兼容**：
  - 含方法的对象字面量 class 化：`RouteState` / `GuardManager` / `RouteMatcher` / `ParamsManager` / `PluginContext` 均由「工厂返回对象字面量」重构为 class，消除 Kotlin 端被推断为 UTSJSONObject 导致的方法调用失效
  - 条件语句显式布尔化：全库移除 truthy 判断（`if (x)` → `if (x != null)`），符合 UTS 条件必须为布尔值的规范
  - uni.* 导航 options 跨端适配：App / 小程序使用无动画字段的对象字面量（匹配 `NavigateToOptions` 具名参数），H5 使用 UTSJSONObject 携带 `animationType`
  - 变参函数类型兼容：事件回调由 `(...args: any[]) => any` 调整为单参数 `(data: any) => any`（Kotlin 函数类型参数不支持 vararg / 修饰符）
  - 遍历与类型清理：移除 `for..in` + `Object.prototype` 遍历（改用 `UTSJSONObject.keys()`）、清除 `undefined` 标识符与 `Promise.reject` 返回类型问题、显式可空参数
  - 页面层：模板绑定顶层函数改为本地包装函数（非蒸汽下端顶层函数以属性对象暴露）；ucss 复合/后代选择器改为动态 class

## 0.6.0（2026-09-18）

### 新增

- **`EventsPlugin` 页面间事件通信插件**（opt-in，`plugins: [EventsPlugin]`）：
  - 对齐 uni-app 官方 `navigateTo` 的 `events` 语义：打开方 `push` 携带 `events` 监听表，被打开页通过 `useOpenerEventChannel()` 的 `EventChannel` `emit` 回传数据 / `on` 接收推送
  - 底层为自研 `eventBus`（`$on` / `$once` / `$off` / `$emit`，按 id 移除监听），不受官方 `uni.$on` 版本门槛限制
  - 通道 key 经内部 `__evt__` URL 查询串跨页桥接，状态同步时剔除（不暴露给用户）；`useOpenerEventChannel()` 不依赖路由同步时机，onShow 内即可使用
  - 未注册插件却携带 `events` 的导航抛 `PLUGIN_REQUIRED`，明确引导
- 新增导出：`EventsPlugin` / `eventBus` / `useOpenerEventChannel`
- 新增类型：`EventsMap`；`RawLocation` / `RouteLocationRaw` 支持 `events` 可选字段

## 0.5.1（2026-09-17）

### 修复

- **打包安卓基座编译错误（UTS110111101）**：`UniHistory.currentStack()` 的返回类型原为内联对象字面量
  `{ path: string; query: Map<string, string> }`，UTS 不允许直接声明对象字面量类型，导致打包安卓基座时编译失败；已提取为具名类型 `CurrentStackInfo` 并引用

## 0.5.0（2026-09-16）

### 新增

- **`AnimationPlugin` 导航窗口动画插件**（opt-in，`plugins: [AnimationPlugin]`）：
  - App / 小程序：透传 `animationType` / `animationDuration` 给 `uni.*` 原生导航 API（原生窗口动画）
  - H5：通过 Web Animations API（`element.animate`）播放进入 / 退出动画，无需 CSS `@keyframes`
  - 全局默认动画（`RouterOptions.animation`）+ 单次覆盖（`animationType` / `animationDuration`）
- **`RouterOptions.animation`**：全局默认导航动画配置 `{ type, duration }`
- **查询参数工具公开导出**：`queryInt()` / `queryNumber()` / `queryBool()` 由库入口直接导出，无需按相对路径导入
- 新增类型：`NavigationAnimation` / `AnimationType`，`RawLocation` 支持 `animationType` / `animationDuration` 可选字段

### 修复

- **H5 首次进入二级页面动画卡顿**：`onCompleteNavigation` 时 uni-app x H5 已将新页内容替换进
  `uni-page`，此时**同步应用动画起点样式 + 强制 reflow**，让新页渲染首帧即位于屏幕外，再于下一帧播放滑入动画——消除「内容原位闪现后再跳到屏幕外滑入」的割裂感；动画结束后清理内联起点样式，避免残留影响后续 back 退出动画
- **H5 返回动画不生效**：新增 `toExitType()` 映射（进入型 → 退出型动画），返回时先播完退出动画再真正 `navigateBack`

## 0.4.0（2026-09-13）

### 新增

- **`RouterLink` 组件公开导出**：基于 `useLink` 的声明式导航组件（`to` / `replace` / `relaunch`），从库入口直接导入
- **插件契约合规**：`RouterPlugin` / `PluginContext` 等类型由 `interface` 调整为 `type`，支持对象字面量直接赋值（规避 UTS 对象字面量不能赋给 interface 的编译约束）

### 变更（破坏性）

- **params 传递机制统一**：移除旧的 `__unixr_p_` 查询前缀编码（`encodeParamsToQuery` / `extractParamsFromQuery` 及相关常量），params 一律经 `ParamsPlugin`（`__params__`
  关联存储）跨页传递。旧格式 URL 不再恢复参数，携带 params 的导航须注册 `plugins: [ParamsPlugin]`

### 修复

- 全库消除 `undefined` 残留（统一 `== null` / `??` 窄化），修复 Web 端编译类型警告
- `RouterLink` 组件 css 合规（移除 `scoped` / `inline-block`，改用 flex 布局）

## 0.3.0（2026-09-11）

### 新增

- **`RouterOptions.paramsPersistent`**：配合 `ParamsPlugin` 将 params 默认持久化到 storage（跨刷新/重进保留），默认 `false`
- **插件体系完善**：`PluginContext` 提供完整导航 hook（`onEnrichLocation` / `onAfterResolve` / `onPrepareNavigation` / `onCompleteNavigation` / `onNavigationAbort` / `onRouteSync` / `onAppInstall`）与 `router` /
  `paramsManager` / `hasPlugin`，支持自定义插件
- **`Router.guardRoute()` / `onRouteChange`**：冷启动守卫补跑与路由变化监听能力补齐

### 修复

- 导航成功后写入 `currentRoute` 前剔除内部 `__params__` key（`stripInternalKeys`），避免内部 key 暴露给用户
- `ParamsPlugin` 的 `afterResolve` 在无 `__params__` 键时对 `Map.get` 返回值（`null`）做空值防护，修复可能中断导航链路的崩溃

## 0.2.0（2026-09-09）

### 新增

- **uni API 拦截（opt-in）**：新增 `RouterOptions.interceptUniApi` 配置，拦截 `uni.navigateTo` / `redirectTo` / `switchTab` / `reLaunch` / `navigateBack` 的直接调用，转由 `router.*` 走完整守卫链，守卫下沉到 uni
  API 层；内置调用去重（计数器），并针对 H5 平台 `switchTab` 做放行 + 状态同步的特殊处理

### 修复

- 重复导航判定优化：`path + query + params + hash` 全部一致才判 `DUPLICATED`，允许以不同参数重入当前页面（此前 params 差异会被忽略而误判重复）

## 0.1.0（2026-09-05）

首个可运行版本。

### 新增

- 核心：路由器创建、路由匹配（path / name 双索引）、严格模式
- 导航：`push` / `replace` / `relaunch` / `back`，自动识别 TabBar
- 守卫：`beforeEach` / `beforeResolve` / `afterEach` / `beforeEnter` / 组件内守卫（`onBeforeRouteLeave` / `onBeforeRouteUpdate` / `onBeforeRouteEnter`）
- 组合式 API：`useRouter` / `useRoute` / `useLink`
- 状态同步：`syncRoute`，基于 `getCurrentPages()` 的响应式 `currentRoute`
- 错误体系：`RouterError` / `NavigationFailure` / `isNavigationFailure` / `RouterErrorCode`
- 双模式：UTS 源分发，web / 小程序 → JS，Android → Kotlin，iOS → Swift
