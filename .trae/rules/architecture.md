# 架构开发规则（unix-architecture）

> 本规则约束在本项目中的一切代码生成行为。分层原理与设计细节见仓库首页架构文档；
> 与本规则冲突的写法一律视为错误实现，即使 AI 认为「更简洁」或「TS 里惯用」。

## 1. 分层与调用链（强制）

```
页面(.uvue) → composables → stores/modules → api/<domain> → utils/request → mx-request → uni.request
```

- 页面**禁止**直连 mx-request / uni.request；页面不接触裸 JSON。
- api 层只做「请求转发 + 路径收敛 + DTO 还原」，禁止写业务逻辑。
- store 禁止引用组件；组件禁止反向依赖 store 之外的任何层。
- 全局网络配置只存在于 `utils/request.uts` 的 `initRequest()`；新增全局配置一律进 `config/index.uts`（唯一配置源）。

### 1.1 插件清单（导入路径以此为准，禁止凭记忆写包名）

| 插件 | 职责 | 导入路径 | 常用 API |
| --- | --- | --- | --- |
| ux-router | 路由 / 守卫 / 组合式 | `@/uni_modules/ux-router/utssdk/index.uts`（注意带 utssdk 后缀） | `useRouter` / `useRoute` / `queryInt` / `queryBool` |
| ux-pinia | 状态管理（免挂载） | `@/uni_modules/ux-pinia` | `defineStore` / `storeToRefs` |
| mx-request | 网络请求 | `@/uni_modules/mx-request` | `request` / `configureRequest` / `useRequestInterceptor` / `useResponseInterceptor` |
| ux-storage | 持久化（异步） | `@/uni_modules/ux-storage` | `set` / `get` / `remove` / `createStorage` |
| ux-utils | toast / modal（全端自绘） | `@/uni_modules/ux-utils` | `showToast` / `showToastAsync` / `showModalAsync` / `showModalAlert` |
| m-ui-x | UI 组件库（11 个基础组件） | **无需导入**（easycom，`<m-button>` 等标签即用） | `m-button` / `m-cell` / `m-cell-group` / `m-row` / `m-col` / `m-icon` / `m-image` / `m-text` / `m-space` / `m-loading` / `m-badge` |

> 目录名与 npm 包名不同（如 `ux-utils` ↔ `@meng-xi/unix-utils`、`m-ui-x` ↔ `@meng-xi/unix-ui`），一律以上表路径为准。

## 2. 新增业务功能的标准落码顺序

按「类型 → api → store → 页面」顺序，缺一不可：

1. **DTO**：`api/types/<domain>.uts` 定义后端协议类型（type，字段显式），并在 `api/types.uts` 聚合出口补一行具名转发。
2. **api**：`api/<domain>.uts` 导出领域函数，返回 `Promise<DTO>`；响应以 `UTSJSONObject` 承载，**逐调用点内联** `JSON.parse<T>(JSON.stringify(res.data))` 还原，解析失败（null）即 throw `Error`。
3. **store**：`stores/types/<domain>.uts` 定义 Store 类型 → `stores/types.uts` 补转发 → `stores/modules/<domain>.uts` 实现（setup 式 `defineStore<T>(id, setup)`，返回值 `as T` 收尾）。
4. **页面**：`pages/<name>/<name>.uvue` + `pages.json` 注册 + 页内 `defineUniPage({ name, title })`。**每个页面（新建与改造）都必须声明该宏**——`name` 供命名路由跳转，`title` 由插件同步到 pages.json 与路由 meta；**改造既有页面时必须先检查宏是否存在**。分包页面放 `pages-sub/`（routeGen 配置见 vite.config.ts）。路由表由 vite 插件自动生成，**禁止手改** `router/routes.gen.uts`。
   守卫语义：新页面默认要求登录（白名单制，见 `router/permission.uts` 的 `whiteList`），免登录页面必须同时在白名单登记。
5. **验证**：编译 + 运行日志（见第 7 节），达到 core-protocol DoD 方可声称完成。

## 3. 类型组织（强制）

**判据：类型跟着消费关系走。**

| 类型性质 | 位置 |
| --- | --- |
| 跨层共享（api → store → 页面/守卫） | `<域>/types/<file>.uts` + `<域>/types.uts` 聚合出口 |
| 多文件域的出口形状（如 Store 类型） | 同上 |
| 单文件模块私有契约 | 就近定义（如 config 的 AppSettings） |
| 第三方库类型 | `import type` 导入，**绝不复制**进项目 |

- 聚合出口一律**具名类型转发**：`export type { X } from './types/xxx.uts'`。
- **禁止** `export * from`、禁止经转发链导出值（函数/常量）——Kotlin 端未实证/已证伪。
- 消费方统一从 `<域>/types.uts` 导入类型。

## 4. UTS 红线（本项目实测沉淀，违反即编译错误或运行时崩溃）

- 不支持 `undefined`，一切可空用 `null | T`；条件语句必须布尔表达式（禁 truthy/falsy）。
- **DTO 还原禁止提取公共泛型包装**：`JSON.parse<T>` 只能逐调用点以具体类型内联，二次泛型传递在 Kotlin 端触发泛型擦除。
- `throw` 只能抛 `Error` 及子类；对象字面量只能赋给 `type` 定义的类型（禁 interface）。
- 函数声明不能作值传递——回调一律箭头函数；type 的属性方法不能带泛型（uts110111161）。
- 守卫重定向用导出的 `RawLocation` / `NavigationRedirect` 显式类型构造，**禁止**裸对象字面量（Kotlin 名义类型下 cast 崩溃）。
- `Ref` 类型标注需 `import type { Ref } from 'vue'`；`ref` / `computed` 值可全局注入无需导入。
- 不用 enum 跨端传递（字面量联合类型替代）；不用 Partial/Record 等 utility 类型（手写等效 type）。
- 数组访问前判界（Kotlin 越界抛异常）；Map 取值判 null（`route.query.get('k') ?? ''`）。

## 5. UI、导航与持久化

- 页面跳转一律 ux-router：`useRouter()` 的 `push` / `replace` / `relaunch` / `back`；**禁止** `uni.navigateTo` / `uni.redirectTo` / `uni.reLaunch`（绕过守卫链）。运行时已启用 `InterceptorPlugin`（`interceptUniApi: true`，见 `router/index.uts`）兜底——违规直调的 uni 原生导航会被拦截转交守卫链，但不得依赖该兜底写代码。参数用 query（`Map<string, string>`，读取配 `queryInt` / `queryBool`），复杂对象经 store 传递。
- 持久化：token 一律经 `utils/auth.uts`；其它业务数据直接用 ux-storage 顶层 `set` / `get` / `remove`（key 加业务前缀，如 `order:draft`）；**禁用** `uni.setStorageSync` 系。
- toast / modal 一律用 ux-utils：`showToast` / `showToastAsync` / `showModalAsync` / `showModalAlert`；**禁用** `uni.showToast` / `uni.showModal`。
- 组件走 easycom 约定：`components/<Name>/<Name>.uvue`，页面免 import 直接使用；组件内只管自身样式，页面间距经外层 view 控制（规避样式隔离）。
- 第三方 UI 一律用 `uni_modules/m-ui-x`：easycom 零注册，**新增 UI 优先复用其现成组件**，不自绘重复轮子；主题定制只在根 `uni.scss` 直接定义 `$m-*` 变量（编译期覆盖），**禁止** `@import` 其 `theme/vars.scss`——uni.scss 会注入全组件样式，与组件内引用同一文件触发 sass 循环导入。
- 样式：仅 class 选择器 + flex 布局；文字样式只设在 text/button 上；不用 scoped、不用 rpx（除非随屏宽变化场景）。
- 组合式函数放 `composables/`（`useXxx.uts` 命名），函数直接导入；State 类型进 `composables/types/`。

## 6. 装配点（唯一，禁止在别处做全局副作用）

| 需求 | 唯一落点 |
| --- | --- |
| 网络初始化 / 拦截器 | `utils/request.uts` → `initRequest()`（幂等守卫） |
| 路由守卫 | `router/permission.uts` → `setupPermission()` |
| 全局配置 | `config/index.uts` |
| 应用生命周期 | `App.uvue`（仅生命周期逻辑） |

main.uts 保持极薄：`app.use(router)` + `initRequest()` + `setupPermission()`，不新增其它装配调用。

## 7. 验证（core-protocol DoD 的项目级补充）

- 编译运行：`D:\HBuilderX\cli.exe launch web --project <绝对路径>`；日志：`logcat web --mode lastBuild`。
- 本地 mock 协议：`POST /user/login → {token}`；`GET /user/info → {name, avatar}`；`POST /user/logout`；CORS 需放行 `Authorization` 头。后端地址在 `config/index.uts` 的 `baseURL`。
- 改动 api / stores / composables 后**必须**编译验证；涉及交互的必须浏览器走通对应链路并核对 mock/服务端请求日志。
- 控制台 `NavigationFailure`（relaunch 后的确认日志）为 ux-router Web 端已知行为，不作为错误处理。
