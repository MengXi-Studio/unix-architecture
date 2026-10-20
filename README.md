# unix-architecture

> uni-app x 工程架构模板，以 vue-admin-template 的分层思想为蓝本，底层由梦曦工作室自研插件系（unix-* / mx-*）承载。
> 技术栈：uni-app x（HBuilderX 5.26，VDOM 模式，vapor: true）· UTS 语言 · Vue3 组合式 API。

## 1. 项目定位

uni-app x 的页面是编译期静态模型（多端编译到 JS / Kotlin / Swift），无法照搬标准 Vue3 的「单路由表、单插件协议」形态。本项目验证的目标是：**在 uni-app x 的底座约束下，最大程度还原 vue-admin-template 式的工程分层**——api / store / router / utils / views 各司其职、类型契约清晰、装配点唯一。

技术栈映射关系（学习架构而非搬代码）：

| vue-admin-template | 本项目 | 承载插件 |
| --- | --- | --- |
| `utils/request.js`（axios） | `utils/request.uts` | mx-request |
| `api/*.js` 领域接口 | `api/*.uts` | mx-request |
| `utils/auth.js`（js-cookie） | `utils/auth.uts` | ux-storage |
| `store/modules/*.js`（vuex） | `stores/modules/*.uts` | ux-pinia |
| `router/index.js`（vue-router） | `router/index.uts` | ux-router |
| `permission.js` 全局守卫 | `router/permission.uts` | ux-router guard |
| `settings.js` | `config/index.uts` | — |
| `views/` | `pages/` | uni-app x 约定 |
| `layout/` | （无对应，uni-app x 无全局布局机制） | — |
| `store/getters.js` | （无对应，setup 式 store 中 computed 即 getter） | — |

## 2. 目录结构

```
├── main.uts                  # 唯一装配点：app.use(router) + initRequest() + setupPermission()
├── App.uvue                  # 应用生命周期（App 端返回键拦截等）
├── pages.json / manifest.json
│
├── api/                      # 接口层：薄封装（请求转发 + 路径收敛 + DTO 还原），不写业务逻辑
│   ├── user.uts
│   ├── types.uts             # 域类型聚合出口（具名类型转发）
│   └── types/
│       └── api.uts           # DTO 唯一事实源（LoginResult / UserInfo）
│
├── stores/                   # 状态层：ux-pinia 免挂载，模块级注册表即全局单例
│   ├── index.uts             # useXxxStore 出口
│   ├── types.uts             # 域类型聚合出口
│   ├── types/
│   │   └── user.uts          # UserStore 定义
│   └── modules/
│       └── user.uts          # token/name/avatar + login/getInfo/logout/resetToken
│
├── composables/              # 组合式函数：函数无出口（按需直接导入），类型走聚合出口
│   ├── useLoading.uts
│   ├── types.uts
│   └── types/
│       └── useLoading.uts    # LoadingState 定义
│
├── components/               # easycom 约定目录（components/<Name>/<Name>.uvue，免注册使用）
│   └── AppLogo/AppLogo.uvue
│
├── router/                   # 路由层
│   ├── index.uts             # createRouter（routes 由 vite 插件生成）
│   ├── permission.uts        # 全局守卫：白名单 + token 检查 + getInfo + 重定向
│   └── routes.gen.uts        # ⚠ 由 @meng-xi/unix-router/vite-plugin 自动生成，勿手改
│
├── utils/                    # 工具层
│   ├── request.uts           # mx-request 封装：configureRequest + 双拦截器（token 注入/错误 toast）
│   └── auth.uts              # token 读写：内存缓存（同步读）+ ux-storage 持久化（异步落盘）
│
├── config/
│   └── index.uts             # 全局唯一配置源（appName / baseURL / timeout）
│
├── pages/                    # 页面（uni-app x 约定，pages.json 静态注册）
│   ├── index/index.uvue
│   └── login/login.uvue
│
├── types/                    # 插件生成的 d.ts（defineUniPage / RouteNameMap），业务类型不放这里
├── static/  uni_modules/  uni.scss
```

## 3. 核心调用链

```
页面(.uvue)
  → composables/useXxx（横切 UI 状态）
  → stores/modules/*（业务状态与动作）
  → api/<domain>（DTO 还原：JSON.parse<T>(JSON.stringify(res.data))）
  → utils/request（拦截器：token 注入 + 统一错误 toast）
  → mx-request → uni.request
```

- **页面不直连网络层**，不接触裸 JSON；store 不引用组件。
- **鉴权数据流**：登录 → `setToken`（内存即时生效 + ux-storage 异步落盘）→ 请求拦截器注入 `Authorization: Bearer` → 冷启动由 `ensureAuthReady()` 先行恢复内存缓存。

### 启动装配（main.uts，唯一装配点）

```uts
app.use(router)      // ux-router：provide + 全局 mixin(onShow syncRoute)
initRequest()        // mx-request：默认实例配置 + 双拦截器（幂等）
setupPermission()    // 注册 beforeEach + 冷启动 guardRoute() 补跑守卫链
```

三种装配范式并存是 uni-app x 的底座约束：ux-router 实现 Vue install 协议；ux-pinia 免挂载（原生端 `app.use` 不可靠，P8 实测）；mx-request 为纯函数库（全局默认实例）。

### 鉴权守卫（router/permission.uts，对标 permission.js）

```
await ensureAuthReady()           // 异步守卫（ux-router 守卫链支持 await Promise）
├─ 有 token
│   ├─ 访问登录页 → 重定向首页
│   ├─ 已有用户信息 → 放行
│   └─ 无用户信息 → await getInfoAction
│       ├─ 成功 → 放行
│       └─ 失败 → resetToken + 重定向登录页（带 redirect）
└─ 无 token
    ├─ 白名单（登录页）→ 放行
    └─ 其余 → 重定向登录页（query 带 redirect=path）
```

冷启动（H5 直达 / deeplink）页面已加载而守卫未执行：`router.isReady().then(() => router.guardRoute())` 补跑守卫链，redirect 按 relaunch 执行。重定向指令用导出的 `RawLocation` / `NavigationRedirect` 显式类型构造（规避 UTSJSONObject 在 Kotlin 名义类型下的 cast 风险）。

## 4. 类型组织标准

**判据：类型跟着消费关系走。**

| 类型性质 | 位置 | 实例 |
| --- | --- | --- |
| 跨层共享（api → store → 页面/守卫） | `<域>/types/` + `<域>/types.uts` 聚合出口 | `LoginResult` / `UserInfo` |
| 多文件域的出口形状 | 同上 | `UserStore` / `LoadingState` |
| 单文件模块私有契约 | 就近定义 | `AppSettings`（config 头注释已记录判据） |
| 第三方库类型 | `import type` 导入，绝不复制 | `RequestConfig` / `ResponseResult` / `Ref` |

- 聚合出口一律**具名类型转发**（`export type { X } from`），不用 star re-export（Kotlin 端未实证）。
- 消费方统一从 `<域>/types.uts` 导入，新增类型文件时在出口追加一行转发。
- api 层负责 DTO 还原，且**逐调用点内联** `JSON.parse<T>(...)`（具体类型）——勿提取公共泛型包装，二次泛型传递在 Kotlin 端触发泛型擦除。

## 5. 各域细则

- **api/**：薄封装；响应以 `UTSJSONObject` 承载、在 api 层还原为 DTO 后上抛；`JSON.parse<T>` 解析失败（返回 null）即 throw 快速失败。
- **stores/**：setup 式 `defineStore<T>(id, setup)`，state 用 `Ref`、action 用箭头函数、返回值 `as T` 收尾；免挂载，无需聚合实例（`stores/index.uts` 仅作消费入口）。
- **composables/**：函数从 `<name>.uts` 直接导入；类型经 `types.uts`；UTS 类型属性方法不支持泛型（uts110111161）——`run` 仅收 `() => Promise<void>` 任务，带返回值需求扩展 `useTask<T>` 而非给函数加泛型。
- **components/**：easycom 免注册；组件内只管自身样式，页面间距经外层 view 控制（规避样式隔离对组件根节点的约束）。
- **router/**：`routes.gen.uts` 与页面级 `defineUniPage` 宏由插件维护，人手不碰（preserveRouteChanges 会保留手工追加字段）。

## 6. 关键机制

| 机制 | 实现 | 原因 |
| --- | --- | --- |
| token 同步读写体验 | ux-storage 异步持久化 + 模块级内存缓存 | js-cookie 是同步的，ux-storage 是异步的 |
| 冷启动无竞态 | 守卫内首行 `await ensureAuthReady()`（Promise 复用，只读一次持久层） | 持久层恢复是异步的，守卫是同步心智 |
| 统一错误提示 | 响应拦截器按错误码映射文案，`ERR_CANCELED` 静默，返回 null 放行 | 错误仍 reject 给调用方做业务处理，提示只打一次 |
| 退出登录确认 | `showModalAsync`（ux-utils，confirm/cancel 恒存在互斥） | 破坏性操作标准语义 |
| toast/modal 全端一致 | ux-utils（App 端 UTS 直挂系统窗口自绘 / Web DOM 自绘 / 小程序原生降级） | uni 原生 position/icon 各端差异大 |

## 7. 跨端注意事项（截至 1.0.0）

- **Web 端已全量验证**：冷启动守卫、登录闭环、DTO 链路、easycom、自绘 modal/toast。
- **Android（Kotlin）同构代码待真机回归**，已知风险点均已规避：泛型二次传递（DTO 内联还原）、`export { x } from` 值转发（仅用 `export type`）、UTSJSONObject cast（守卫重定向用导出类型构造）、`app.use(pinia)`（免挂载）。
- `redirect` query 在 Web 端存在双重编码（`%252F`）现象，round-trip 正常；深链场景上 Android 前建议实测。
- 控制台的 `NavigationFailure`（relaunch 后的确认日志）为 ux-router Web 端已知行为，跳转结果正确。

## 8. 运行与验证

```powershell
# 运行到 Web（HBuilderX CLI）
D:\HBuilderX\cli.exe launch web --project <项目绝对路径>
# 运行日志
D:\HBuilderX\cli.exe logcat web --project <项目绝对路径> --mode lastBuild
```

- 后端地址：`config/index.uts` → `settings.baseURL`（接真实后端替换一处即可）。
- 本地联调可用任意 mock 服务（协议：`POST /user/login → {token}`，`GET /user/info → {name, avatar}`，`POST /user/logout`），注意 CORS（`Authorization` 头需放行）。
- 页面路由由 vite 插件从 `pages/` 目录生成，新增页面 = 建文件 + `pages.json` 注册 + 页内 `defineUniPage({ name, title })`。
