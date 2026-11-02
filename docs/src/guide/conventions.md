# 工程约定

写代码前必读。这些约定不是风格偏好——每一条都对应一次真实的编译错误或运行时崩溃，并与 AI 辅助规则（`.trae/rules/architecture.md`）同源同步。

## 类型组织标准

**判据：类型跟着消费关系走。**

| 类型性质 | 位置 | 实例 |
| --- | --- | --- |
| 跨层共享（api → store → 页面/守卫） | `<域>/types.uts` 单文件定义 | `LoginResult` / `UserInfo` / `LoadingState` |
| store 出口形状 | `stores/modules/*.uts` class 声明，`stores/types.uts` 转发 | `UserStore` |
| 单文件模块私有契约 | 就近定义 | `AppSettings`（config）、`UserState`（store 模块） |
| 第三方库类型 | `import type` 导入，绝不复制 | `RequestConfig` / `ResponseResult` / `Ref` |

- **布局约束（app-android 发行链路实测）**：发行拷贝不追踪 `export type ... from` 转发链——仅被类型转发引用的子目录文件不进发行树，分析器解析转发语句即报 `index not found`。故域类型收敛在 `<域>/types.uts` 单文件内定义，**禁止 types/ 子目录转发链**；转发仅允许指向运行时可达文件（如 stores/types.uts → modules）。
- 消费方统一从 `<域>/types.uts` 导入类型。

## UTS 红线

违反即编译错误或运行时崩溃：

| # | 坑 | 正确姿势 |
| --- | --- | --- |
| 1 | 不支持 `undefined`（UTS110111119） | 一切可空用 `null \| T`，变量必须初始化后使用 |
| 2 | 条件语句禁 truthy/falsy（UTS110111120） | `if (x > 0)`、`while (isValid)`，禁止 `if (arr)` |
| 3 | 对象字面量只能赋给 `type` 定义的类型（UTS110111163） | 禁 interface 承接字面量 |
| 4 | 泛型二次传递触发 Kotlin 泛型擦除 | `JSON.parse<T>` 逐调用点以具体类型内联 |
| 5 | `export * from` / 值转发链 Kotlin 端不可靠 | 聚合出口一律 `export type { X } from` 具名转发 |
| 6 | type 的属性方法不能带泛型（uts110111161） | 回调签名具体化，或泛型提升到 type 级别 |
| 7 | enum 不用于跨端传递 | 字面量联合类型替代 |
| 8 | 函数声明不能作值传递（UTS110111152） | 回调一律箭头函数 |
| 9 | Kotlin 端数组越界抛异常 | 访问前判界 |
| 10 | 名义类型下裸对象 cast 崩溃 | 跨库对象用导出的显式类型构造（如 `RawLocation`） |

## store（ux-pinia 0.2.0 class 式）

```uts
import { reactive } from 'vue'
import { defineStore, PiniaStoreBase } from '@/uni_modules/ux-pinia'

export type XxxState = { /* 私有契约就近定义 */ }

export class XxxStore extends PiniaStoreBase {
  state: XxxState = reactive<XxxState>({ /* ... */ })

  constructor() {
    super()
    this.bindState(this.state)   // $-API 与持久化的前提
  }

  // 派生值用 class getter（禁 computed 字段：插件内 effectScope 跨页面失效）
  // action 为普通 method，内部调 api 函数
}

export const useXxxStore = defineStore<XxxStore>('xxx', (): XxxStore => new XxxStore())
```

- state 字段直读写（**无 `.value`**），消费方访问 `store.state.字段`；
- 跨 store 依赖在 method 内调用对方 `useXxxStore`（不放字段初始化器）；
- token 持久化走 `utils/auth.uts`（职责分离），不用内置持久化插件承载。

## UI、导航与持久化

- 页面跳转一律 ux-router：`useRouter()` 的 `push` / `replace` / `relaunch` / `back`；**禁止** `uni.navigateTo` 系（InterceptorPlugin 兜底存在但不得依赖）；
- 持久化：token 一律经 `utils/auth.uts`；其它业务数据用 ux-storage 顶层 `set` / `get` / `remove`（key 加业务前缀，如 `order:draft`）；**禁用** `uni.setStorageSync` 系；
- toast / modal 一律用 ux-utils；**禁用** `uni.showToast` / `uni.showModal`；
- 组件走 easycom：项目自有组件 `components/<Name>/<Name>.uvue`，第三方 UI 优先复用 m-ui-x 现成组件；
- 样式：仅 class 选择器 + flex 布局；文字样式只设在 text/button 上；不用 scoped、不用 rpx（除非随屏宽变化场景）。

## 装配点

见[架构设计 · 装配点](./architecture#装配点-main-uts-唯一装配点)。绝大多数功能**不需要**动装配层。
