# unix-pinia 功能设计文档

| 项目 | 内容 |
| --- | --- |
| 文档版本 | v0.1（草案） |
| 状态 | **待确认**（开放问题见第 11 章，作答确认后进入执行） |
| 日期 | 2026-10-17 |
| 目标读者 | 项目维护者、贡献者 |
| 关联文档 | `.trae/rules/project_rules.md`（UTS 编码规范）、`.trae/rules/core-protocol.md`（DoD 标准） |

---

## 1. 背景与动机

### 1.1 uni-app x 的编译模式与 Pinia 支持矩阵

uni-app x 存在两套编译管线，官方文档（[vue 生态](https://doc.dcloud.net.cn/uni-app-x/vue/others.html)，2026/09 更新）给出的 Pinia 支持情况如下：

| 编译模式 | App-Android / iOS | App-HarmonyOS | Web | 小程序 |
| --- | --- | --- | --- | --- |
| **蒸汽模式**（Vapor，无 VDOM 新管线） | 标准 Pinia 直接可用 | HX 5.25 起可用 | 可用 | 可用 |
| **vdom 模式**（传统管线） | **标准库不可用** | 同左 | 可用 | 可用 |

关键结论：

1. **蒸汽模式**下，UTS 运行时在原生端实现了标准 Pinia 依赖的完整 Vue API 面（`app.use`、inject、effectScope、reactive 等），官方直接适配了 Pinia 3.0.4（HX 5.25 起）的编译，全平台可用。
2. **vdom 模式**下，App 原生端受 UTS 强类型编译约束 + 运行时 API 缺口限制，npm 版 Pinia（源码大量使用 `Symbol`、`undefined`、动态属性访问、utility types 等 UTS 禁止的特性）无法编译；只有 JS 环境的 Web/小程序端可用。
3. 官方对 vdom 模式 App 端的推荐替代是三方插件 [Pinia by uts（x-pinia-s）](https://ext.dcloud.net.cn/plugin?name=x-pinia-s)——即官方背书了"用 UTS 重写 Pinia 填补该空缺"的路线。

### 1.2 问题陈述

在 vdom 模式的 uni-app x App 项目中，开发者缺少一个具备 Pinia 使用习惯（`defineStore` / setup 式 / `storeToRefs` / `$patch`）的响应式状态管理库。官方仅推荐"导出模块级全局 reactive 变量"的轻量方案（[全局变量与状态管理](https://doc.dcloud.net.cn/uni-app-x/tutorial/store.html)），该方案在 store 组织、命名空间、批量更新、订阅等方面无统一范式。

### 1.3 先例与竞品

| 方案 | 适用场景 | 与本项目关系 |
| --- | --- | --- |
| 标准 Pinia（蒸汽模式） | 全平台（鸿蒙 5.25+） | 无竞争：蒸汽模式项目直接用标准库 |
| 标准 Pinia（vdom 模式 Web/小程序） | 仅 JS 端 | 无竞争 |
| [x-pinia-s](https://ext.dcloud.net.cn/plugin?name=x-pinia-s)（三方 UTS 插件） | vdom 模式 App 端 | **直接先例**，需调研对标（Q5） |
| 全局 reactive 变量（官方轻量方案） | 简单场景 | 下限方案，unix-pinia 的价值须高于它 |

---

## 2. 产品定位与目标

### 2.1 一句话定位

> **unix-pinia** 是一个使用标准 UTS 语法实现的、Pinia 风格的响应式状态管理库，核心目标是填补 uni-app x **vdom 模式 App 端**无法使用标准 Pinia 的空缺。

### 2.2 目标（v1）

- **G1**：纯 UTS 实现，同一套源码编译到 Kotlin / Swift（视 Q1）/ JS，无原生插件（UTSPlugin）以外的原生代码。
- **G2**：API 对齐标准 Pinia 的 setup store 风格：`defineStore(id, setup)` + `storeToRefs`，迁移成本低。
- **G3**：全局状态应用级单例，跨页面（uvue）共享且视图自动响应。
- **G4**：提供 `$patch` 等实例级 API（取舍见 5.4）。
- **G5**：以 npm 包（UTS 源码分发）形式发布，沿用仓库既有 CI（Trusted Publisher + Provenance）。

### 2.3 非目标（v1 明确不做）

| 非目标 | 理由 |
| --- | --- |
| devtools 集成 | uni-app x 原生端无 Vue devtools |
| HMR 热更新支持 | 原生端无此机制 |
| SSR | 非 uni-app x 场景 |
| options 式 store API（state/getters/actions 对象） | UTS 下 `this` 语义受限（UTS110111139），setup 式已覆盖核心诉求 |
| `pinia.use` 插件钩子体系 | v1 聚焦核心，插件机制后置（Q9 关联持久化） |
| `$onAction` | 依赖插件/订阅体系，后置 |
| 兼容 uni-app（非 x）项目 | 专注 uni-app x，避免 vue2/vue3 双轨 |

---

## 3. 技术约束与设计影响

以下 UTS 约束（详见 `project_rules.md`）直接影响库的设计：

| UTS 约束（错误码） | 对 unix-pinia 设计的影响 |
| --- | --- |
| 不支持 `undefined`（UTS110111119） | 一切"可选"语义用 `null` 显式表达 |
| 不支持 `Symbol()`（UTS110111154） | store id 使用 `string` |
| 不支持 index signature / 动态属性访问（UTS110111129/110111144） | **无法反射枚举 store 对象字段** → store 内部状态清单必须在定义期显式登记（见 5.4 `$subscribe` 说明） |
| 对象字面量仅支持赋值给 `type` 类型（UTS110111163） | 用户 store 返回值必须显式定义 `type XxxStore = {...}` 并标注 |
| function 声明不能作值传递（UTS110111152） | actions 一律使用箭头函数表达式 |
| 不支持 utility types（UTS110111125） | 无 `Partial<T>` → `$patch` 仅提供 mutator 函数形态 |
| 不支持 `effectScope` 等 Vue 高级 API（~~已修正~~：vdom 模式实际可用，x-pinia-s 已实证；v1 仍不依赖） | 全局单例 store 与应用同生命周期，天然不需要 scope 管理；$dispose 场景后续可引入 scope.stop() |
| 不支持命名空间 / globalThis（UTS110111140/110111147） | 注册表使用 UTS 模块顶层静态成员（编译为 Kotlin `object` / Swift 静态） |

---

## 4. 总体架构

### 4.1 架构图

```
┌───────────────────────────── uvue 页面 / 组件 ─────────────────────────────┐
│  script setup                                                             │
│    const store = useCounterStore()      ← useStore 闭包                    │
│    const { count } = storeToRefs(store) ← 模板绑定                          │
│    store.increment()                    ← action 调用                       │
└──────────────────────────────────┬────────────────────────────────────────┘
                                   │ import（uts 插件）
┌──────────────────────────────────▼────────────────────────────────────────┐
│                          unix-pinia（纯 UTS 源码）                         │
│                                                                           │
│  ┌──────────────┐   ┌───────────────────┐   ┌───────────────────────────┐ │
│  │  defineStore │──▶│  StoreRegistry    │◀──│  storeToRefs / $patch ... │ │
│  │  (id, setup) │   │  Map<id, StoreBox>│   │  （实例 API 层）            │ │
│  └──────┬───────┘   └───────────────────┘   └───────────────────────────┘ │
│         │ 首次调用执行 setup()                                             │
│         ▼                                                                 │
│  ┌──────────────────────────────────────────────────────────────────────┐ │
│  │        uni-app x 内建响应式原语：ref / computed / reactive / watch     │ │
│  └──────────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────────┘
```

### 4.2 模块划分

| 模块 | 职责 |
| --- | --- |
| `types.uts` | 对外类型：`StoreBox` 内部包装、`DefineStore` 函数类型、实例 API 类型 |
| `registry.uts` | 应用级注册表：id → store 实例的映射、幂等创建、销毁 |
| `defineStore.uts` | 核心入口：执行 setup、登记注册表、返回 `useStore` 闭包 |
| `storeToRefs.uts` | 从 store 实例取回原始 ref 集合，供模板解构绑定 |
| `index.uts` | 统一导出 |

**刻意不引入**的东西：`app.use()` / `inject` 依赖链（vdom 模式 App 端插件机制可用性存疑，且模块单例已足够）；`effectScope`（不存在）；任何运行时反射。

---

## 5. 核心 API 设计

### 5.1 defineStore（setup 式）

**签名（示意）：**

```uts
function defineStore<T>(id: string, setup: () => T): () => T
```

- `T`：用户显式定义的 store 类型（`type`），**必须显式标注**，不依赖推断（G2 / 约束表）。
- **类型导入规范（PoC 实证）**：`Ref<T>` 由编译器全局注入可直接使用；`ComputedRef<T>` **不会**全局注入（编译 warning），必须 `import type { ComputedRef } from 'vue'`。为一致性，建议 store 类型标注统一显式导入两者。
- 返回值：`useStore` 函数。**多次调用 `useStore` 返回同一实例**（注册表保证）。
- **重复调用 `defineStore` 传入相同 id**：与标准 Pinia 行为对齐——返回已存在的实例，忽略新 setup（开发期输出警告，见 6.5）。

**用户侧完整用法（示意，最终以 API 定稿为准）：**

```uts
// store/counter.uts
import { defineStore } from '@/uni_modules/ux-pinia'   // uni_modules id = ux-pinia（npm 包名 @meng-xi/unix-pinia）

// ① 显式定义 store 类型：state 用 Ref，getter 用 ComputedRef，action 用箭头函数类型
export type CounterStore = {
  count: Ref<number>,
  doubleCount: ComputedRef<number>,
  increment: () => void,
  reset: () => void
}

// ② setup 式定义
export const useCounterStore = defineStore<CounterStore>('counter', (): CounterStore => {
  // state
  const count: Ref<number> = ref(0)
  // getter
  const doubleCount: ComputedRef<number> = computed((): number => {
    return count.value * 2
  })
  // action（必须箭头函数，UTS 函数声明不能作值传递）
  const increment = (): void => {
    count.value++
  }
  const reset = (): void => {
    count.value = 0
  }
  return { count, doubleCount, increment, reset }
})
```

```vue
<!-- pages/index/index.uvue -->
<template>
  <scroll-view style="flex: 1">
    <text>count: {{ count }}</text>
    <text>double: {{ doubleCount }}</text>
    <button @click="onInc">+1</button>
  </scroll-view>
</template>

<script setup lang="uts">
import { storeToRefs } from 'unix-pinia'
import { useCounterStore } from '@/store/counter.uts'

const counterStore = useCounterStore()
counterStore.increment()

// 模板绑定：经 storeToRefs 解构后自动解包（Ref 在 uvue 模板顶层自动解包）
const { count, doubleCount } = storeToRefs(counterStore)

const onInc = (): void => {
  counterStore.increment()
}
</script>
```

### 5.2 Store 访问模型（关键设计，PoC 门控）

useStore 返回的对象如何暴露 state，存在两个候选方案：

| 维度 | 方案 A：reactive 解包（对齐 Pinia） | 方案 B：Ref 直读（UTS 原生形态） |
| --- | --- | --- |
| 脚本中读写 | `store.count++`（无 `.value`） | `store.count.value++` |
| 模板绑定 | 解构后自动解包 | 解构后自动解包 |
| 技术依赖 | 需要 `reactive()` 对含 `Ref` 属性对象的**自动解包**在 vdom 原生端可用（**未验证**） | 仅依赖 `ref` / `computed`，最稳 |
| 与标准 Pinia 的 DX 差异 | 无 | 脚本访问 state 多一个 `.value` |
| 失败兜底 | 回退方案 B | — |

**决策规则**：M1 阶段以 PoC-P3（见 8.1）验证方案 A 的可行性；可行则采用 A（迁移体验最优），不可用则采用 B。两方案的 `defineStore` 用户侧代码完全一致，仅类型语义和访问方式有差异，不影响 API 形状。若你有明确倾向，请直接在 Q3 作答。

> **PoC 定稿（2026-10-17，详见 [PoC验证报告](./unix-pinia-PoC验证报告.md)）**：**方案 B（Ref 直读）最终定稿**。实证结论：`reactive()` 对 Ref/ComputedRef 字段的解包行为**双端不一致**——Web 端（JS Proxy）自动解包且真转发；Android 端（Kotlin 无 Proxy）**不解包**，字段保持 `io.dcloud.uniapp.vue.RefImpl`/`ComputedRef` 对象原样（isRef=true）。方案 A 将导致同一份代码两端 DX 不一致，违背 G1（一套 API 多端覆盖），故出局。方案 B（setup 对象直接透传 + 脚本 `.value` + 模板经 storeToRefs 解构自动解包）已双端验证全 pass，行为完全一致。

### 5.3 storeToRefs

- **职责**：接受 store 实例，返回"原始 ref 集合"对象，供 uvue 模板解构自动解包。
- **实现要点**：注册表在 `defineStore` 时已持有 setup 返回的原始对象（含全部 `Ref` / `ComputedRef`），`storeToRefs` 通过 id 或对象标识取回，**无需运行时反射**（规避 UTS 动态枚举限制）。
- 幂等：对已是"ref 集合"的对象重复调用直接返回（与 Pinia 行为一致）。

### 5.4 Store 实例 API 取舍

| API | v1 取舍 | 说明 |
| --- | --- | --- |
| `$patch` | **提供**（仅 mutator 形态） | `$patch((s: CounterStore) => { ... })`。v1 阶段等价于直接调用 mutator，语义上为"一次批量修改"，为后续订阅合并通知预留。不支持对象形态（无 `Partial<T>`） |
| `$subscribe` | **v1 不做整体订阅** | UTS 无法反射枚举 store 字段，无法自动收集全部 state ref；**替代方案**：字段级订阅直接使用内建 `watch(store.count, cb)`（Ref 天然可 watch）。若方案 A 成立，M3 再评估基于 deep watch 的整体订阅 |
| `$reset` | **v1 不内置**（Q8） | 与标准 Pinia 对 setup store 的行为一致（其 setup 式 `$reset` 也需自定义）；用户在 setup 中自定义 `reset` action 即可 |
| `$dispose` | **提供** | 从注册表移除该 id；下次 `useStore` 重新执行 setup 重建。v1 无 effectScope，无需停止副作用 |
| `$state` / `$onAction` | 不做 | 见 2.3 非目标 |

### 5.5 跨 store 依赖

store A 的 setup 内直接调用 `useBStore()` 即可（注册表保证单例），无需额外机制：

```uts
export const useCartStore = defineStore<CartStore>('cart', (): CartStore => {
  const userStore = useUserStore()   // 跨 store 依赖
  // ...
})
```

注意文档约定：跨 store 引用建议放在 action 内或 setup 顶部，**避免 getter 内产生 store 间循环依赖**（与标准 Pinia 相同的注意事项）。

### 5.6 与标准 Pinia 的差异对照表（迁移指引的雏形）

| 能力 | 标准 Pinia | unix-pinia v1 |
| --- | --- | --- |
| 安装 | `npm i pinia` + `app.use(createPinia())` | 引入 uts 插件，无需 app 挂载（模块单例） |
| defineStore | id 可推断、类型自动推断 | id 必填 `string`；**返回类型必须显式 `type` 标注** |
| setup 式 store | state=ref / getter=computed / action=函数 | 相同（action 必须箭头函数） |
| store 访问 state | `store.count` | `store.count.value`（方案 B 定稿，脚本侧）；模板经 storeToRefs 解构后自动解包 |
| storeToRefs | 支持 | 支持 |
| $patch | 对象 + mutator 双形态 | 仅 mutator 形态 |
| $subscribe | 整体订阅 | v1 用字段级 `watch` 替代 |
| $reset | options 式内置 / setup 式需自定义 | v1 不内置，建议自定义 reset action |
| 插件体系 / devtools / HMR / SSR | 支持 | 不支持（非目标） |
| Symbol 注入 key | 是 | string id |

---

## 6. 实现设计

### 6.1 注册表（StoreRegistry）

```uts
// 示意
export class StoreRegistry {
  private static stores: Map<string, any> = new Map<string, any>()

  static get(id: string): any | null {
    // Map 取不到返回 null（UTS 无 undefined）
  }

  static set(id: string, storeBox: any): void { /* ... */ }

  static remove(id: string): boolean { /* ... */ }

  static has(id: string): boolean { /* ... */ }
}
```

- **生命周期**：UTS 顶层静态成员随应用进程存活 → 应用级单例，天然跨页面。
- **存储内容**：`StoreBox`（内部包装：原始 setup 对象 + 对外暴露的 store 实例 + 元信息），`any` 存储 + 使用处 `as` 收窄（UTS 规范允许，需中文注释说明）。
- **幂等语义**：`defineStore` 同 id 重复注册 → 返回既有实例并警告；`$dispose` 后重新注册 → 正常重建。

### 6.2 响应式实现策略

- **不自研响应式系统**，直接复用 uni-app x 内建 `ref` / `computed` / `reactive` / `watch`（官方状态管理文档已示范全局 reactive 单例跨端可用）。
- **PoC 实证**：Android 端 `reactive()` 不解包 Ref/ComputedRef 字段（原生端 UTS 无 Proxy，返回 `RefImpl` 强类型对象）；因此 setup 返回对象**直接透传**，不做 reactive 包装（Web 端的解包优势放弃，换取双端行为一致）。
- store 内部的 watch（如未来 $subscribe）均挂在全局上下文，不随组件卸载销毁（应用级语义）。

### 6.3 工程结构（沿用仓库既有 CI 约定）

现有 CI（`publish-npm.yml` / `deploy-docs.yml` / `publish-release.yml`）已按 pnpm monorepo 配置，据此规划：

```
unix-pinia/
├── packages/
│   ├── core/                      # UTS 源码包（npm 发布主体，无 Node 侧构建）
│   │   ├── package.json           # @meng-xi/unix-pinia（Q6：CI 中现为 unix-utils，疑模板残留）
│   │   └── utssdk/                # uts 插件源码（目录约定待 M1 验证，Q7）
│   │       ├── index.uts          # 统一导出
│   │       ├── types.uts
│   │       ├── registry.uts
│   │       ├── defineStore.uts
│   │       └── storeToRefs.uts
│   └── docs/                      # VitePress 文档站（deploy-docs.yml 已配置）
│       └── src/
│           └── changelog.md       # publish-release.yml 的版本来源
├── test-app/                      # uni-app x 测试工程（Q4：位置待定）
├── .github/workflows/             # 已有 CI，需适配：包名、Pages base path（现为 /unix-storage/）、Environment 名
├── .trae/
│   └── documents/                 # 本设计文档所在
└── ...
```

**待 M1 验证的工程点**：npm 分发的 UTS 包在 uni-app x 项目中的消费方式（npm 安装 uts 插件的目录结构约定 / 是否需同时提供 `uni_modules` 目录形态），届时以官方文档为准，不臆造结构。

### 6.4 平台差异与条件编译策略

- 核心逻辑（注册表、类型、API 层）为跨端纯 UTS，**预期不需要平台分支**。
- 若 PoC 发现平台差异（如 iOS Swift 编译约束差异），按规范使用 `#ifdef APP-ANDROID / APP-IOS` 条件编译收敛在单个文件内，或拆分 `utssdk/app-android/index.uts` 等平台目录。
- 涉及持久化等端能力（v2 规划）时才引入 `uni.setStorage` 条件编译。

### 6.5 错误处理与开发期警告

| 场景 | 行为 |
| --- | --- |
| 同 id 重复 `defineStore` | 返回既有实例 + `console.warn`（中文提示） |
| `useStore` 传入未注册 id（理论上不可发生，防御性） | `throw new Error`（UTS 仅允许抛 Error 及其子类，UTS110111158） |
| setup 返回 null / 非 `type` 对象 | M1 PoC 后决定是否做运行时校验（倾向信任编译期类型约束，不做运行时检查——避免过度设计） |

---

## 7. 兼容性矩阵（v1 预期）

| 编译模式 | 平台 | v1 支持 | 说明 |
| --- | --- | --- | --- |
| vdom | App-Android | **主战场**，M1 即验证 | Kotlin 编译 |
| vdom | App-iOS | PoC 后确认（Q1） | Swift 编译约束与 Kotlin 同源，预期可支持 |
| vdom | App-HarmonyOS | 待定（Q1） | ArkTS 约束更严，M1 评估 |
| vdom | Web | 支持 | UTS 编译为 JS（宽松模式），成本最低 |
| vdom | 小程序 | 待定 | 非 v1 重点 |
| 蒸汽模式 | 全平台 | 技术上可运行，但无必要 | 该场景直接用标准 Pinia |

HBuilderX 版本基线：待 Q2 确认（初步建议 ≥ 4.75，与 `project_rules.md` 中约束表适用版本一致）。

---

## 8. 测试与验收

### 8.1 PoC 技术验证清单（M1，先跑通再实现）

| 编号 | 验证项 | 门控的设计决策 |
| --- | --- | --- |
| P1 | uts 插件源码内调用 `ref/computed/reactive/watch` 的正确姿势（编译器注入 or `import from 'vue'`），及 `Ref<T>`/`ComputedRef<T>` 类型标注可用性 | 5.1 类型标注规范是否成立（**若不成立则为致命风险 R3**） |
| P2 | uts 插件内模块级 `Map` 单例跨页面共享 | 6.1 注册表方案 |
| P3 | `reactive()` 对含 `Ref` 属性对象的自动解包（vdom + App） | 5.2 方案 A / B |
| P4 | `watch` 对 `Ref` / `reactive` 的订阅能力及 `deep` 选项 | 5.4 `$subscribe` 替代方案 |
| P5 | 泛型函数 `defineStore<T>` + 显式 `type` 标注 + 含函数属性的对象字面量编译 | 5.1 签名 |
| P6 | `isRef` / 类型判断 API 可用性 | 5.3 `storeToRefs` 实现路径 |
| P7 | （若 Q1 纳入）iOS 端同套代码编译 | 兼容矩阵 |

每项验证**通过/失败均记录**到 PoC 报告（`.trae/documents/`）；单项失败不硬刚，输出替代方案后继续（熔断原则见 core-protocol）。

### 8.2 功能测试用例（M3/M4，基于 test-app）

| 编号 | 用例 | 预期 |
| --- | --- | --- |
| T1 | 页面 A 修改 state → 返回页面 B 读取 | 同一实例，状态一致，视图响应 |
| T2 | state 变化 → getter 自动更新 → 视图更新 | computed 联动正确 |
| T3 | action 内连续多次修改 | 全部生效 |
| T4 | `$patch` 批量修改 | 等价逐项修改 |
| T5 | store A 的 action 调用 store B | 正常工作 |
| T6 | 同 id 重复 defineStore | 幂等返回既有实例 + 警告 |
| T7 | `$dispose` 后再次 `useStore` | 重新执行 setup，全新实例 |
| T8 | Web 端运行同一测试工程 | 行为与 Android 一致 |

### 8.3 DoD（引用 core-protocol，硬性标准）

- [ ] 代码保存且编译通过（无语法错误）
- [ ] 已实际运行（Android 基座 + Web），HBuilderX CLI 捕获运行日志
- [ ] 日志验证：状态变化、getter 求值、跨页面共享的输出符合预期
- [ ] 无运行时错误
- [ ] 调试临时 `console.log` 已清理，仅保留必要业务日志

---

## 9. 里程碑规划

| 里程碑 | 内容 | 前置 |
| --- | --- | --- |
| **M0** | 本设计文档确认（Q1–Q10 作答） | — |
| **M1** | 调研（Q5 决定是否拆解 x-pinia-s）+ PoC（P1–P7）+ PoC 报告 | M0 |
| **M2** | API 设计定稿（差异对照表评审、类型规范） | M1 |
| **M3** | v1 核心实现（packages/core 五个模块）+ test-app 用例开发 | M2 |
| **M4** | DoD 验收 + 文档站 + CI 适配（包名 / base path / Environment）+ 发布 | M3 |

---

## 10. 风险与应对

| 编号 | 风险 | 影响 | 应对 |
| --- | --- | --- | --- |
| R1 | reactive 自动解包在 vdom 原生端不可用 | DX 降级 | 方案 B 内建兜底，API 形状不变 |
| R2 | UTS 泛型推断能力不足 | 使用体验 | 强制显式 `type` 标注（文档约定 + 示例），不追求自动推断 |
| R3 | uts 插件源码内无法使用 Vue 组合式 API（P1 失败） | **致命** | 立即调研 x-pinia-s 的实现路径（其存在本身证明可行）；仍不可行则输出卡点分析报告 |
| R4 | iOS / 鸿蒙编译约束差异 | 范围 | Q1 控制范围；条件编译收敛差异 |
| R5 | HBuilderX 版本行为漂移 | 稳定性 | 明确版本基线（Q2），文档声明，测试工程锁定 HX 版本 |

---

## 11. 开放问题清单（待作答）

> 请逐条作答（可直接回复编号 + 答案），确认后进入 M1。

| 编号 | 问题 | 选项 / 默认建议 |
| --- | --- | --- |
| **Q1** | v1 平台范围？ | A. App-Android + Web 起步，iOS/鸿蒙跟进（推荐，控制 M1 成本）　B. 一步到位含 iOS/鸿蒙 |
| **Q2** | HBuilderX 最低版本基线？你的目标项目所用 HX 版本？ | 建议 ≥ 4.75（需与你的实际环境核对） |
| **Q3** | Store 访问模型倾向？ | A. reactive 解包对齐 Pinia（PoC 门控，失败回退 B）　B. 直接定 Ref 直读 `.value`（最稳）　默认：PoC 后定 |
| **Q4** | 测试工程位置？ | A. 仓库内 `test-app/`（推荐，CI 与代码同仓）　B. 独立仓库 |
| **Q5** | 是否先拆解 x-pinia-s？ | A. 必做（学其实现与取舍，推荐）　B. 跳过，完全自研 |
| **Q6** | npm 包名与 CI 适配？现 CI 中为 `@meng-xi/unix-utils`、Pages base 为 `/unix-storage/`、Environment 为 `unix-utils`，疑为姊妹项目模板残留 | 建议统一改为 `@meng-xi/unix-pinia` / `/unix-pinia/` / `unix-pinia`，请确认 |
| **Q7** | 分发形态？ | A. 仅 npm 包　B. npm + DCloud 插件市场（uni_modules 形态）双渠道（推荐 B，覆盖 HBuilderX 生态用户） |
| **Q8** | `$reset` 是否 v1 提供？ | 建议不提供（与标准 Pinia setup store 行为一致），用户自定义 reset action |
| **Q9** | 持久化（对应 pinia-plugin-persistedstate）是否列入 v2 规划？ | 建议 v2 独立插件，v1 不做 |
| **Q10** | 文档站是否沿用 VitePress（`packages/docs`，CI 已配置）？ | 建议沿用 |

Q1：A。
Q2：HBuilderX最低版本基线。
Q3：A。
Q4：参考 https://github.com/MengXi-Studio/unix-storage 项目，使用pnpm作为包管理器。
Q5：A。
Q6：此项目采用 npm包名为 `@meng-xi/unix-pinia`。插件市场id为 `unix-pinia`。
> **修订（2026-10-17）**：插件市场 id 调整为 **`ux-pinia`**（对齐 unix-storage 的 `unix-storage → ux-storage` 命名模式），npm 包名不变。工程内 uni_modules 目录名相应为 `uni_modules/ux-pinia/`。
Q7：B。
Q8：不提供。
Q9：建议 v2 独立插件，v1 不做。
Q10：建议沿用。

---

## 12. 参考资料

- [vue 生态 | uni-app x](https://doc.dcloud.net.cn/uni-app-x/vue/others.html) —— 蒸汽/vdom 模式下 Pinia 支持矩阵
- [全局变量与状态管理 | uni-app x](https://doc.dcloud.net.cn/uni-app-x/tutorial/store.html) —— 官方 Pinia 示例与全局 reactive 方案
- [Pinia by uts (x-pinia-s)](https://ext.dcloud.net.cn/plugin?name=x-pinia-s) —— 官方文档引用的三方 UTS 实现
- [uni-app x release notes](https://doc.dcloud.net.cn/uni-app-x/release.html) —— HX 5.25 起 Pinia 3.0.4
- `.trae/rules/project_rules.md` —— UTS 语言约束全集（错误码索引）
- `.trae/rules/core-protocol.md` —— DoD 与无人值守熔断机制
