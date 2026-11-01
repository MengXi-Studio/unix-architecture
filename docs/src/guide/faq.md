# 常见问题

## redirect 参数在 Web 端出现双重编码（`%252F`）？

已知行为。round-trip 正常（守卫登记与回跳还原一致）；深链场景上 Android 前建议实测确认。

## 控制台出现 `NavigationFailure` 日志？

ux-router Web 端已知行为（relaunch 后的确认日志），跳转结果正确，**不作为错误处理**。

## 为什么状态管理不用标准 Pinia？

uni-app x 的 App 端（Kotlin）不支持标准 Pinia 的插件协议（`app.use` 实测不生效），且 UTS 无 Proxy / 无反射，标准 Pinia 的响应式模型无法实现。ux-pinia 以 class + reactive 架构在 UTS 内实现了 Pinia 风格 API（详见 [unix-pinia 文档](https://mengxi-studio.github.io/unix-pinia/)的「与标准 Pinia 的差异」章节）。

## 为什么 token 不用 ux-pinia 的内置持久化插件？

职责分离：token 读写收敛在 `utils/auth.uts`（对标 js-cookie 职责），`ensureAuthReady()` 消除冷启动竞态的设计已全链路验证；内置持久化默认后端为 uni storage，与 ux-storage 双轨并存会造成持久化语义分裂。内置持久化留给业务状态场景（如草稿箱）。

## ux-storage 是异步的，为什么读 token 是同步的？

内存缓存抹平：写入时「内存即时生效 + 异步落盘」，冷启动由守卫链首行 `await ensureAuthReady()` 一次性恢复内存缓存（Promise 复用，无竞态）。详见[鉴权与守卫](./auth)。

## 发行打包（云打包 / 发行到 Web）报错，但 dev 运行正常？

发行流水线与 dev 的差异导致的坑已在模板内修复（5.34 实测）：

- uts 插件入口**不得导出字符串常量**（uts-proxy 生成非法 JS）；
- 域类型必须在 `<域>/types.uts` 单文件内定义（发行拷贝不追踪 `export type ... from` 转发链）；
- 插件组件内避免 `Animation` 类型标注、`slots.default` 脚本级检查、带 `flush` 的 watch（5.34 Kotlin 生成器 Unresolved）。

详见仓库 CHANGELOG 1.1.0 的 Fixed 章节。

## Android 端连接不上本地 mock？

`127.0.0.1` 在真机上指向手机自身。将 `config/index.uts` 的 `baseURL` 改为电脑局域网 IP（如 `http://192.168.x.x:3210`），保证手机与电脑同网，且 mock 服务监听 `0.0.0.0`。

## 新页面跳转后守卫没生效？

确认两点：页面声明了 `defineUniPage({ name, title })` 宏（路由表由插件生成）；跳转走的是 `useRouter()` 而非 `uni.navigateTo` 系（后者会被 InterceptorPlugin 兜底拦截，但不得依赖兜底）。

## HBuilderX 版本有要求吗？

模板在 **5.34** 完成编译与打包验证（Web + Android 云打包）。更早版本未验证；更高版本需关注 UTS 编译器的行为变化。
