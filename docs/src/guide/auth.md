# 鉴权与守卫

## 设计难点

Web 时代的经验是 `js-cookie` 同步读 token，到处直接取。但 uni-app x 的持久化（ux-storage）是**异步**的，而守卫、请求拦截器都是「同步心智」——直接 async/await 传染会污染整条调用链。

解法是**内存缓存 + 显式就绪原语**（`utils/auth.uts`）：

- 写入时「内存即时生效 + 异步落盘」，读取永远是同步的；
- `ensureAuthReady()`：冷启动时由守卫链首行 `await` 调用，从持久层恢复内存缓存。内部 Promise 复用——只读一次持久层，并发调用共享同一 Promise，无竞态。

异步被压缩在启动的一瞬间，之后的整条链路（守卫、拦截器、页面）回到同步心智。

## 数据流

```
登录 → setToken（内存即时生效 + ux-storage 异步落盘）
     → 请求拦截器注入 Authorization: Bearer
冷启动 → ensureAuthReady() 先行恢复内存缓存 → 守卫链正常工作
```

## 守卫链（router/permission.uts）

```
await ensureAuthReady()
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

白名单：`whiteList` 数组（当前仅登录页）。新页面默认要求登录，免登录页面必须同时在白名单登记。

## 冷启动补跑

冷启动（H5 直达 / deeplink）时页面可能已加载而守卫未执行。`setupPermission()` 在 `router.isReady()` 后显式调用 `router.guardRoute(null, null)` 补跑守卫链，redirect 按 relaunch 执行。

## 导航兜底

运行时启用 `InterceptorPlugin`（`interceptUniApi: true`）：外部直调的 `uni.navigateTo` 等原生导航被拦截转交守卫链。这是纵深防御——规约仍要求统一走 `useRouter()`，不得依赖兜底。

## 职责分离

- **token 读写**：`utils/auth.uts`（对标 js-cookie 职责）；
- **登录/登出动作**：`stores/modules/user.uts`（loginAction / logoutAction / resetToken）；
- **退出登录**：`showModalAsync` 确认弹窗（破坏性操作标准语义）→ logoutAction 调接口（失败不阻断本地清理）→ 清状态与持久层 → relaunch 登录页。

ux-pinia 0.2.0 的内置持久化插件**不用于 token**：避免与 ux-storage 双轨持久化语义分裂（判据详见仓库任务文档）。
