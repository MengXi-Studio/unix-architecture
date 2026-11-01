# 介绍

## 为什么需要这套架构

uni-app x 是 DCloud 的新一代跨端方案：UTS 语言、编译期静态模型，一份代码编译为 JS（Web / 小程序）与 Kotlin / Swift 原生。性能出色——但当你想认真做一个中大型项目时，会撞上一个现实：**生态默认形态是「页面堆」**。请求写在页面里、状态挂在页面 data、跳转靠裸字符串路径、响应是裸 `UTSJSONObject` 下标取值。

标准 Vue3 生态那套工程化（vue-router 单路由表、pinia 插件协议、axios 封装、js-cookie 同步读取）**不能直接搬过来**。uni-app x 的页面是编译期静态模型，有四个根本性差异：

1. **没有单路由表**——页面在 `pages.json` 静态注册，编译期确定；
2. **插件协议不可靠**——App 端（Kotlin）`app.use(pinia)` 实测不生效；
3. **存储全是异步**——没有同步 cookie 可用；
4. **名义类型系统**——Kotlin 端类型不兼容不是报错，而是 cast 崩溃。

这意味着工程化必须在底座约束下**重新设计**。本模板就是这套设计的完整落地。

## 设计目标

- **分层完备**：api / stores / router / utils / pages 各司其职、类型契约清晰、装配点唯一；
- **鉴权开箱即用**：登录闭环、全局守卫、冷启动竞态消除全部内置；
- **可复制**：每个架构决策都有明确的判据与实测依据，接入真实后端只需改一处配置。

## 技术栈

| 项 | 说明 |
| --- | --- |
| 框架 | uni-app x（HBuilderX 5.34+，VDOM 模式，vapor: true） |
| 语言 | UTS（编译到 JS / Kotlin / Swift） |
| UI 范式 | Vue3 组合式 API，uvue 页面 |
| 状态管理 | ux-pinia（class 式 store，免挂载） |
| 路由 | ux-router（vue-router 风格 API + 全局守卫） |
| 网络 | mx-request（拦截器体系） |
| 持久化 | ux-storage（异步） |
| 反馈 | ux-utils（toast / modal 全端自绘） |
| UI 组件库 | m-ui-x（11 个基础组件，easycom 零注册） |

## 分层与插件承载关系

各层职责单一、依赖单向：

| 分层 | 位置 | 承载插件 |
| --- | --- | --- |
| 网络层（全局配置 + 双拦截器） | `utils/request.uts` | mx-request |
| 接口层（领域函数 + DTO 还原） | `api/*.uts` | mx-request |
| 凭证读写（token 同步读体验） | `utils/auth.uts` | ux-storage |
| 状态层（业务状态与动作） | `stores/modules/*.uts` | ux-pinia |
| 路由层（命名路由 + 守卫链） | `router/index.uts` | ux-router |
| 全局守卫（鉴权重定向） | `router/permission.uts` | ux-router guard |
| 配置层（全局唯一配置源） | `config/index.uts` | — |
| 视图层（静态注册页面） | `pages/` | uni-app x 约定 |

两条底座事实需要了解：

- uni-app x 无全局 layout 机制，页面结构由各页面自持；
- setup 式 store 中 `computed` 即 getter 的老观念已过时——ux-pinia 0.2.0 为 class 式 store，派生值用 class getter。

## 下一步

- [快速开始](./getting-started)：克隆、配置、跑起来；
- [架构设计](./architecture)：目录结构、调用链与装配范式；
- [工程约定](./conventions)：类型组织、UTS 红线与各域细则。
