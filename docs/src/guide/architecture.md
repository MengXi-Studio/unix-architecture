# 架构设计

## 目录结构

```
├── main.uts                  # 唯一装配点：app.use(router) + initRequest() + setupPermission()
├── App.uvue                  # 应用生命周期（App 端返回键拦截等）
├── pages.json / manifest.json
│
├── api/                      # 接口层：薄封装（请求转发 + 路径收敛 + DTO 还原），不写业务逻辑
│   ├── user.uts
│   └── types.uts             # DTO 唯一事实源（LoginResult / UserInfo，单文件即聚合出口）
│
├── stores/                   # 状态层：ux-pinia class 式 store，免挂载（模块级注册表即全局单例）
│   ├── index.uts             # useXxxStore 出口
│   ├── types.uts             # 域类型聚合出口（转发 store class 类型）
│   └── modules/
│       └── user.uts          # UserStore class：state(reactive) + login/getInfo/logout/resetToken
│
├── composables/              # 组合式函数：函数无出口（按需直接导入），类型走聚合出口
│   ├── useLoading.uts
│   └── types.uts             # LoadingState 定义（域类型单文件收敛）
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
│   ├── request.uts           # mx-request 封装：configureRequest + 双拦截器
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
├── .trae/                    # AI 辅助开发体系（rules / skills / documents / mcp.json）
├── docs/                     # 本文档站（VitePress）
├── static/  uni.scss
└── uni_modules/              # 插件系 + m-ui-x 组件库（easycom 零注册）
```

## 核心调用链

```
页面(.uvue)
  → composables/useXxx（横切 UI 状态）
  → stores/modules/*（业务状态与动作）
  → api/<domain>（DTO 还原）
  → utils/request（拦截器：token 注入 + 统一错误 toast）
  → mx-request → uni.request
```

三条硬规则贯穿全程：

- **页面不直连网络层**，不接触裸 JSON；store 不反向引用组件；
- **api 层只做薄封装**：请求转发 + 路径收敛 + DTO 还原，禁止写业务逻辑；
- **装配点唯一**：全局初始化只发生在 `main.uts`，禁止在模块顶层做副作用。

## 启动装配（main.uts，唯一装配点）

```uts
app.use(router)      // ux-router：provide + 全局 mixin(onShow syncRoute)
initRequest()        // mx-request：默认实例配置 + 双拦截器（幂等）
setupPermission()    // 注册 beforeEach + 冷启动 guardRoute() 补跑守卫链
```

三种装配范式并存**不是不统一，是底座如此**：ux-router 实现 Vue install 协议（Kotlin 端可靠）；ux-pinia 免挂载（原生端 `app.use` 实测不生效，模块级注册表即全局单例）；mx-request 为纯函数库（显式初始化避免模块顶层副作用的时序问题）。

## 鉴权守卫（router/permission.uts）

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

三层防漏设计：

1. **白名单 + token 检查**：常规守卫语义；
2. **冷启动补跑**：H5 直达 / deeplink 进入时页面可能已加载而守卫未执行——启动时 `router.isReady().then(() => router.guardRoute(null, null))` 显式补跑；
3. **导航拦截兜底**：运行时启用 `InterceptorPlugin`（`interceptUniApi: true`）拦截外部直调的 `uni.navigateTo` 等原生导航转交守卫链——但规约仍要求统一走 `useRouter()`，不得依赖兜底。

`backFallback` 已配置为首页：深链 / 刷新直连后 back() 页面栈不足时，自动 relaunch 回首页（走完整守卫链），而非 CANCELLED 失败。

## 装配点（唯一，禁止在别处做全局副作用）

| 需求 | 唯一落点 |
| --- | --- |
| 网络初始化 / 拦截器 | `utils/request.uts` → `initRequest()`（幂等守卫） |
| 路由守卫 | `router/permission.uts` → `setupPermission()` |
| 全局配置 | `config/index.uts` |
| 应用生命周期 | `App.uvue`（仅生命周期逻辑） |

main.uts 保持极薄：`app.use(router)` + `initRequest()` + `setupPermission()`，不新增其它装配调用。
