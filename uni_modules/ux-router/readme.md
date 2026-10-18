# ux-router

为 **uni-app x** 提供的、API 对标 **vue-router 4** 的路由管理库。以 **UTS** 源码（`.uts`）形式随 uni_modules 分发，由 uni-app x 编译链按平台现场编译（Web / 小程序 → JS，Android → Kotlin，iOS → Swift），无需预编译。

## 简介

uni-app x 原生提供 `uni.navigateTo / redirectTo / reLaunch / navigateBack / switchTab`，但当页面增多后「无路由表、无守卫、无统一路由状态、参数传递繁琐」成为痛点。ux-router 用一套与 vue-router 一致的 API 抹平这些差异，并提供登录鉴权、导航控制、参数传递等能力。

## 特性

- **vue-router 风格 API**：`createRouter`、`push` / `replace` / `relaunch` / `back`，自动根据 `meta.isTab` 切换 `switchTab`
- **路由匹配**：path / name 双索引，字符串 / 对象 / 命名三种解析，`strict` 严格模式
- **路由守卫**：`beforeEach` / `beforeResolve` / `afterEach` / `beforeEnter` / 组件内守卫，支持重定向、守卫超时与重定向深度上限
- **组合式 API**：`useRouter()` / `useRoute()` / `useLink()`，响应式 `currentRoute`
- **导航控制**：重复导航自动拒绝（`DUPLICATED`）、并发导航自动排队
- **错误体系**：`RouterError` / `NavigationFailure` / `UniNavigationApiError`，`RouterErrorCode` 错误码，`isNavigationFailure()` 精准判断，`onError` 全局捕获
- **冷启动守卫**：`guardRoute()` 对 H5 直达 / 场景值 / deeplink 补执行守卫链，支持重定向与中止回调（`onAbort`）
- **路由状态同步**：页面 `onShow` 自动 `syncRoute()`，物理返回 / TabBar 切换等非路由器导航自动对齐
- **基于文件的路由生成（构建期 dev 工具，opt-in）**：从 npm 包 `@meng-xi/unix-router/vite-plugin`（uni_modules 分发版随包附带 `plugins/` 适配器）引入 vite 插件，页面就近声明 `defineUniPage` 宏，构建期自动生成 `pages.json` 与路由表 `routes.gen.uts`，消除 path / title / isTab 双份手工维护；提供 `routeGen` / `pagesGen` / `routesGen` 三个独立插件
- **插件体系（opt-in，注册须实例化）**：
  - **ParamsPlugin** 页面参数传递：`params`（`Map<string,string>`）经 `__params__` 关联存储跨页传递，键名不暴露明文
  - **InterceptorPlugin** uni API 拦截：`interceptUniApi: true` 时，直调 `uni.navigateTo` / `switchTab` 等原生导航也转入守卫链
  - **AnimationPlugin** 导航窗口动画：App 端透传原生 `animationType` / `animationDuration`（动画字段官方仅 App 支持，小程序端官方不支持、无动画），H5 端通过 WAAPI 播放进入 / 退出动画；支持全局默认（`animation` 选项）与单次覆盖
  - **EventsPlugin** 页面事件通信：对齐官方 `navigateTo` 的 `events` 语义，被打开页经 `useOpenerEventChannel()` 回传 / 接收数据

## 目录结构

```
ux-router/
├── package.json          # uni_modules 插件清单（id / displayName / 版本等）
├── changelog.md          # 更新日志
├── readme.md             # 本说明
├── plugins/              # 构建期文件路由 vite 插件适配器（JS 产物，routeGen / pagesGen / routesGen）
└── utssdk/               # UTS 源码（核心逻辑）
    ├── index.uts         # 公共入口
    ├── router/           # 路由器（createRouter 主实现）
    ├── matcher/          # 路由匹配
    ├── guard/            # 守卫管理
    ├── history/          # 页面栈适配
    ├── navigation/       # uni.* 导航封装
    ├── state/ store/     # 路由状态
    ├── composables/      # useRouter / useRoute / useLink / useOpenerEventChannel / 组件内守卫
    ├── plugins/          # 内置插件：params / interceptor / animation / events
    ├── components/       # RouterLink.uvue 声明式导航组件
    ├── errors/ enums/    # 错误与错误码
    ├── types/            # 类型定义
    ├── utils/            # path / query / params 工具
    └── constants/        # 常量
```

## 引入方式

本插件为 uni_modules 自包含，无需 npm 安装，直接 `import` 即可：

```uts
import { createRouter } from '@/uni_modules/ux-router/utssdk/index.uts'
```

## 快速开始

### 1. 定义路由配置

`path` 须与 `pages.json` 注册的页面路径一致：

```uts
import type { RouteConfig } from '@/uni_modules/ux-router/utssdk/index.uts'

export const routes: RouteConfig[] = [
	{ path: 'pages/index/index', name: 'home', meta: { title: '首页', isTab: true } },
	{ path: 'pages/about/about', name: 'about', meta: { title: '关于', requireAuth: true } }
]
```

### 2. 创建路由器

```uts
import { createRouter } from '@/uni_modules/ux-router/utssdk/index.uts'
import { routes } from './router.config'

export const router = createRouter({ routes, strict: true })

// 可选：按需注册插件（注册须实例化，0.7.0 起为破坏性变更）
// import { ParamsPlugin, InterceptorPlugin, AnimationPlugin, EventsPlugin } from '@/uni_modules/ux-router/utssdk/index.uts'
// export const router = createRouter({
// 	routes,
// 	plugins: [new ParamsPlugin(), new InterceptorPlugin(), new AnimationPlugin(), new EventsPlugin()]
// })
```

### 3. 安装到应用

```uts
// main.uts
import { createSSRApp } from 'vue'
import App from './App.uvue'
import { router } from './router'

export function createApp() {
	const app = createSSRApp(App)
	app.use(router) // provide 路由 + 注入全局 mixin（onShow 自动 syncRoute）
	return { app }
}
```

### 4. 页面内使用

```uts
<script setup lang="uts">
import { useRouter, useRoute } from '@/uni_modules/ux-router/utssdk/index.uts'

const router = useRouter()
const route = useRoute()

function go() {
	router.push({ name: 'about', query: new Map([['from', 'home']]) })
}
</script>
```

## 路由选项

`createRouter` 支持以下常用选项：

| 选项           | 类型            | 默认值   | 说明                                                       |
| -------------- | --------------- | -------- | ---------------------------------------------------------- |
| `routes`       | `RouteConfig[]` | -        | 路由配置，需与 `pages.json` 声明一致                       |
| `strict`       | `boolean`       | `true`   | 严格模式，未匹配的命名路由抛出 `RouterError`               |
| `guardTimeout` | `number`        | `10000`  | 守卫超时（ms），超时警告并自动中止导航，设 `0` 关闭        |
| `readyTimeout` | `number`        | `0`      | 就绪超时（ms），防止 `await router.isReady()` 挂起          |
| `plugins`      | `RouterPlugin[]`| -        | 可选插件列表，**传入实例**：`[new ParamsPlugin()]` / `[new InterceptorPlugin()]` / `[new AnimationPlugin()]` / `[new EventsPlugin()]` |
| `paramsPersistent` | `boolean`  | `false`  | 是否默认将 `params` 持久化到 storage（需配合 `ParamsPlugin`） |
| `interceptUniApi`  | `boolean`  | `false`  | opt-in：拦截 `uni.*` 原生导航，使直调也走守卫链（运行时版本要求：Web 4.0 / 微信 4.41 / Android 3.97 / iOS 4.11 / Harmony 4.61，需配合 `InterceptorPlugin`） |
| `animation`    | `NavigationAnimation` | - | 全局默认导航动画 `{ type, duration }`（需配合 `AnimationPlugin` 才生效） |

## 路由导航

| 方法 | 对应原生 API | 行为 |
| --- | --- | --- |
| `router.push(location)` | `uni.navigateTo` / `switchTab` | 保留当前页，推入新页 |
| `router.replace(location)` | `uni.redirectTo` / `switchTab` | 替换当前页 |
| `router.relaunch(location)` | `uni.reLaunch` / `switchTab` | 关闭所有页，打开目标 |
| `router.back(delta)` | `uni.navigateBack` | 返回上一页或多级 |

```uts
await router.push({ name: 'about', query: new Map([['a', '1']]) })
await router.replace('/pages/detail/detail')
await router.relaunch('/pages/index/index')
await router.back()      // 返回一页
await router.back(2)     // 返回两级
```

目标为 `meta.isTab` 的路由会自动使用 `uni.switchTab`。

## 路由守卫

```uts
router.beforeEach((to, from) => {
	if (to.meta.requireAuth === true && !isLoggedIn()) {
		return { name: 'login', query: new Map([['redirect', to.fullPath]]) } // 重定向
	}
	return true // null / true 放行
})

router.afterEach((to, from, failure) => {
	console.log(`导航: ${from.fullPath} -> ${to.fullPath}`, failure?.message ?? '')
})

// 组件内离开守卫（返回 false 阻止离开）
import { onBeforeRouteLeave } from '@/uni_modules/ux-router/utssdk/index.uts'
onBeforeRouteLeave((to, from) => hasUnsavedChanges ? false : true)
```

守卫全集：`beforeEach` / `beforeResolve` / `afterEach` / `beforeEnter` / `onBeforeRouteLeave` / `onBeforeRouteEnter` / `onBeforeRouteUpdate`，以及冷启动补执行 `guardRoute()`。

冷启动（H5 直达 / 场景值 / deeplink）时页面已加载、守卫未执行，可补跑守卫链：

```uts
router.isReady().then(() => {
	router.guardRoute(undefined, {
		onAbort: () => router.relaunch('/pages/index/index') // 守卫中止时转跳安全页
	})
})
```

## 参数传递

- **`query`**：URL 可见，适合少量、简单、可分享的数据
- **`params`**：经 **ParamsPlugin**（`__params__` 关联存储）跨页传递，键名不暴露明文，适合命名参数（需注册 `plugins: [new ParamsPlugin()]`）

两者均为 `Map<string,string>`：

```uts
import { queryInt, queryBool } from '@/uni_modules/ux-router/utssdk/index.uts'

router.push({ name: 'detail', params: new Map([['id', '42'], ['from', '首页']]) })

// 目标页读取（Map API）
const route = useRoute()
const id = route.params.get('id') ?? ''   // "42"

// query 读取同样用 Map API，配合工具函数便捷解析
const from = route.query.get('utm') ?? ''   // query 用 .query.get
const idNum = queryInt(route.query, 'id', 0)     // 便捷解析数值
const flag  = queryBool(route.query, 'vip', false) // 便捷解析布尔
```

> 复杂对象请先 `JSON.stringify`，或改用全局状态 / `uni.setStorageSync` 承载。

## 组合式 API

- `useRouter()`：获取路由器实例
- `useRoute()`：响应式当前路由（脚本/模板直接访问字段，如 `route.path` / `route.query.get()`）
- `useLink()`：声明式导航的响应式状态与触发（`isActive` / `navigate` 等），配套 `RouterLink` 组件直接使用
- `useOpenerEventChannel()`：获取打开方事件通道（需 `EventsPlugin`），不依赖路由同步时机，`onShow` 内即可使用

## API 概览

| 分类 | 内容 |
| --- | --- |
| 创建 | `createRouter(options)` |
| 导航 | `push` / `replace` / `relaunch` / `back` |
| 守卫 | `beforeEach` / `beforeResolve` / `afterEach` / `beforeEnter` |
| 组合式 | `useRouter` / `useRoute` / `useLink` / `useOpenerEventChannel` / `onBeforeRouteLeave/Enter/Update` |
| 查询 | `getRoutes` / `hasRoute` / `resolve` / `currentRoute` / `isReady` |
| 同步/扩展 | `syncRoute` / `guardRoute` / `onError` / `onRouteChange` |
| 插件 | `ParamsPlugin` / `InterceptorPlugin` / `AnimationPlugin` / `EventsPlugin` / `eventBus`（注册须实例化） |
| 组件 | `RouterLink`（声明式导航） |
| 错误 | `RouterError` / `NavigationFailure` / `RouterErrorCode` / `isNavigationFailure` |

> 完整 API 与「从入门到精通」教程见仓库 `packages/docs`。

## 平台兼容性

- Web / H5、微信小程序：编译为 JS
- App-Android / App-HarmonyOS（VDOM / 蒸汽模式）：编译为 Kotlin / JS（HarmonyOS 需 HBuilderX 4.61+）
- App-iOS：编译为 Swift
- 底层仅依赖 `uni.*` 原生导航 API（`navigateTo / redirectTo / reLaunch / navigateBack / switchTab`）
- 导航动画字段官方仅 App 支持（Android 4.18+ / iOS 4.25+ / HarmonyOS 4.61+），小程序端官方不支持；H5 端由 AnimationPlugin 以 WAAPI 实现
- 物理返回键 / TabBar 切换不经过路由器，通过 `syncRoute()` 在 `onShow` 自动对齐

## License

[MIT](LICENSE)
