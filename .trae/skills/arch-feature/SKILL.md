---
name: arch-feature
description: 按本项目既定架构标准流程开发新功能或新业务模块，覆盖 DTO 类型、api 薄封装、store 模块、页面组件、注册与验证闭环。当用户要求新增订单模块、设置页、商品列表等具体业务功能时使用。不用于架构重构、文档编写或纯修复。
---

# 架构内新功能开发（arch-feature）

在本仓库开发任何新功能/业务模块，一律按下方六步落码，全程强制遵循 `.trae/rules/architecture.md`（红线与禁令）、`.trae/rules/workflow.md`（文档驱动四步工作流：建立任务文档 → 等待并读取回答 → 实现与验证 → 实施记录回填；方案、疑问与用户回答全部落盘 `.trae/documents/` 的任务文档，跨会话循环）与仓库首页架构文档（分层原理）。禁止跳步，禁止「为了简洁」绕过分层。

## 0. 需求确认（动手前）

- 判定域归属：新领域（如订单 order）还是既有域扩展（user 加字段）。新领域按下方全流程建文件；扩展则只改既有文件。
- 判定交付面：新页面 / 既有页面改造 / 纯逻辑层（无 UI）。
- 后端协议未明确时：先与用户确认字段；确需占位则按 `POST /<domain>/xxx` 风格自拟并在 api 函数注释标注「协议待确认」。

## 1. DTO 类型（api/types/）

- 新建 `api/types/<domain>.uts`：type 定义后端协议字段（显式类型，不加 ? 除非后端确认可缺省）。
- 在 `api/types.uts` 追加一行具名转发：`export type { XxxResult } from './types/<domain>.uts'`。
- 禁止：interface、可选字段瞎猜、把 UI 字段混进 DTO。

## 2. api 模块（api/<domain>.uts）

- 导出领域函数，返回 `Promise<DTO>`；`request<UTSJSONObject>` 发请求后**逐调用点内联** `JSON.parse<T>(JSON.stringify(res.data))` 还原，null 即 throw Error。
- 禁止：写业务逻辑、提取公共泛型还原包装（Kotlin 泛型擦除）、直连 uni.request。

## 3. store 模块（stores/）

- `stores/types/<domain>.uts` 定义 `XxxStore` 类型（state 用 Ref、action 用箭头函数签名）→ `stores/types.uts` 补转发。
- `stores/modules/<domain>.uts`：setup 式 `defineStore<XxxStore>('<domain>', (): XxxStore => {...})`，返回值 `as XxxStore` 收尾；action 内调 api 函数。
- 令牌相关写 `utils/auth.uts`；跨 store 依赖直接在 setup 内调用对方 `useXxxStore`（注册表保证单例）。

## 4. 页面 / 组件

- 新页面：`pages/<name>/<name>.uvue`（组合式 API）+ `pages.json` 注册 + 页内 `defineUniPage({ name, title })`——**每个页面（新建与改造）都必须声明该宏**，缺声明即不符合路由规则（title 会由插件同步到 pages.json 与路由 meta）。路由表 `router/routes.gen.uts` 由 vite 插件生成，**禁止手改**；分包页面放 `pages-sub/`。
- 页面跳转：一律 `useRouter()` 的 `push` / `replace` / `relaunch` / `back`，**禁止** `uni.navigateTo` 系（绕过守卫链）；参数用 query Map（读取配 `queryInt` / `queryBool`）。
- 守卫语义：新页面默认要求登录（白名单制），免登录页面必须同时在 `router/permission.uts` 的 `whiteList` 登记。
- 可复用 UI：`components/<Name>/<Name>.uvue`（easycom，页面免 import）；组件内只管自身样式，间距由页面外层 view 控制。
- 横切 UI 状态：抽 `composables/useXxx.uts`，State 类型进 `composables/types/` 并补聚合出口转发。
- 交互反馈：toast/modal 一律 ux-utils（`showToast` / `showModalAsync`）；禁用 uni.showToast / uni.showModal。

## 5. 装配点检查

绝大多数功能**不需要**动装配层。仅当出现以下需求时才动，且落点唯一：

- 新增全局默认 header / baseURL 切换 → `utils/request.uts` 的 `initRequest()`
- 新增路由级权限 → `router/permission.uts` 的 `authGuard`
- 新增全局配置项 → `config/index.uts`（同步更新其类型）

禁止在页面、App.uvue、模块顶层做全局副作用。

## 6. 验证闭环（DoD 硬性要求）

1. 编译运行：`D:\HBuilderX\cli.exe launch web --project <项目绝对路径>`，确认「编译成功」。
2. 运行验证：本地 mock（协议见 `.trae/rules/architecture.md` 第 7 节，CORS 放行 Authorization）或真实后端，浏览器走通新功能完整链路；`logcat web --mode lastBuild` 留存日志。
3. 核对关键日志（api/store 请求是否按预期发出、守卫是否按预期拦截），清理临时调试代码后方可报告完成。
4. 控制台 `NavigationFailure`（relaunch 确认日志）为已知行为，不算错误。

## 常见错误（直接判失败）

- 页面缺 `defineUniPage` 宏（新建与改造都要检查）、用 `uni.navigateTo` 系做跳转、免登录页未加白名单
- 页面直连 mx-request / 在页面拼 baseURL
- api 函数返回裸 UTSJSONObject / 用下标 `res.data['x'] as T` 取值（必须走 DTO）
- 新建 `export * from` 转发、值转发链、跨域复制第三方类型
- 手改 `routes.gen.uts`、在模块顶层写 configureRequest 等副作用
- UTS 写法踩线：undefined、truthy 判断、interface 对象字面量、enum 跨端传值、throw 非 Error
- 凭记忆写插件导入路径（一律以 `.trae/rules/architecture.md` 第 1.1 节插件清单为准）
