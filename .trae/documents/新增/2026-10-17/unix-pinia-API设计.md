# unix-pinia API 设计文档（M2 定稿）

| 项目 | 内容 |
| --- | --- |
| 文档版本 | v1.0（设计原则：**一比一复刻 Pinia API 面，裁掉平台不可实现项**，对标 unix-router → vue-router 先例） |
| 日期 | 2026-10-17 |
| 依据 | [功能设计文档](./unix-pinia-功能设计文档.md)（方案 B 定稿）+ [PoC 验证报告 v2.0](./unix-pinia-PoC验证报告.md) |
| 关闭的决策 | ~~Q11 实例 API 形态~~ → 按"全量对齐"原则裁决（见第 2 章矩阵） |
| 下游 | M3 实现（分层执行：已验证直做 / PoC 后做 / 明确裁掉） |

---

## 1. 设计原则

1. **一比一复刻**：Pinia 的每个公开 API 都要给出明确归属——*直接实现*、*PoC 后实现*、*裁掉（附理由）*三者之一，不允许"没想到"。
2. **语义一比一，形态随平台**：UTS 无 Proxy、对象不可动态注入属性（PoC 实证），store 实例上挂不了 `$xxx()` 方法。因此 **`$` 方法形态统一映射为模块级顶层函数**（如 `store.$patch(fn)` → `patch(store, fn)`）。这与 unix-router 复刻 vue-router 时对 RouterLink 等做的形态适配同理：**平台差异改变形态，不改变语义**。
3. **裁掉项必须写进差异对照表**，让迁移开发者一眼知道"什么没有、为什么、用什么替代"。

## 2. Pinia API 全集 × 实现可行性矩阵

### 2.1 直接实现（PoC 已验证或零风险）

| Pinia API | unix-pinia 对应（签名） | 说明 |
| --- | --- | --- |
| `defineStore(id, setup)` | `defineStore<T>(id: string, setup: () => T): () => T` | setup 式；id 必填（Pinia 的 id 推断依赖 Symbol/SSR 上下文，UTS 无 → 裁进差异表）；同 id 幂等 + 警告 |
| `storeToRefs(store)` | `storeToRefs<T>(store: T): T` | 透传实现（方案 B 定稿） |
| `createPinia()` | `createPinia(): Pinia` | 返回 Pinia 实例；对齐挂载心智，见 install |
| `app.use(pinia)` | `Pinia.install(app)`（由 `app.use` 自动调用） | 真正的单例在模块注册表；install 负责将实例登记为 activePinia（**P8 验证项**：vdom 原生端 app.use 第三方对象插件的可用性，x-pinia-s 已实证可行） |
| `setActivePinia` / `getActivePinia` | 同名顶层函数 | 多实例支持，成本极低 |
| `store.$patch(fn)` | `patch<T>(store: T, fn: (s: T) => void): void` | **仅 mutator 形态**。Pinia 的对象形态 `patch(partialState)` 依赖 `Partial<T>`（UTS 无此 utility type）与字段反射枚举（UTS 无）→ 双重不可实现，裁进差异表 |
| `store.$dispose()` | `dispose<T>(store: T): void` | 注册表移除（store→id 反查 Map），下次 useStore 重建 |
| `store.$id` | `getStoreId<T>(store: T): string` | 同一反查 Map，成本 5 行，保留对齐 |
| `store.$reset()` | **不提供，与 Pinia 行为一比一** | Pinia 对 setup store 的 `$reset` 同样不内置（调用即抛错，官方要求自定义）。unix-pinia 直接不提供，用户写 `reset` action——这正是"对齐 Pinia setup store 真实行为" |
| `pinia.use(plugin)` | `Pinia.use(plugin: PiniaPlugin): Pinia`（链式） | 插件函数签名 `PiniaPlugin = (ctx: PiniaPluginContext): void`——UTS 禁止向既有对象动态注入属性，故**裁掉"插件返回对象合并进 store"能力**（x-pinia-s 同款约束），插件通过 ctx 完成 hook 逻辑 |
| `PiniaPluginContext` | `{ pinia: Pinia, store: any, storeId: string }` | 对齐 Pinia 字段 |
| `store.$subscribe(cb)` | `subscribe<T>(store: T, cb: SubscribeCallback): Unsubscribe` | **P9 验证项**：实现取 `watch(reactive包装(store), cb, deep)`——PoC-P3c 已证 Android 端 reactive 包装普通字段响应正常，但 deep watch 对 RefImpl 字段的触发行为未验证；P9 失败则裁为差异表项（字段级 `watch(store.count, cb)` 替代） |

### 2.2 PoC 裁决结果（M3 实测，2026-10-17）

| 项 | 裁决 | 证据 |
| --- | --- | --- |
| **P8**（app.use/install 原生可用性） | **原生端不可用**——`app.use(Pinia实例)` 不触发 install（activePinia=null）；Web 端可用但双端不一致 → **统一免挂载模式**：纯状态管理零挂载代码；需插件时顶层 `setActivePinia(createPinia().use(plugin))`（实测生效）。install 方法保留（Web 可用） | Android 日志无 install 行 + P8 断言 false；改顶层登记后 true |
| **P9**（deep watch 实现 $subscribe） | **裁掉**——Android 端 `watch(reactive(store), cb, {deep:true})` 对 RefImpl 字段不触发（subCount=0），Web 端正常（fired=1）→ 双端不一致，违背 G1。替代：字段级 `watch(store.count, cb)`（P4 双端验证） | 双端 T9 用例对比 |

### 2.3 裁掉清单（不支持项，写死在差异表）

| Pinia API | 裁掉理由 | 替代模式 |
| --- | --- | --- |
| `defineStore` Options 式（state/getters/actions + this） | UTS 中 this 仅限 class 方法，type 对象属性函数无 this 语义（UTS110111139） | setup 式（Pinia 官方同样首推 setup 式） |
| `$patch` 对象形态 `patch(partialState)` | 无 `Partial<T>`（UTS110111125）+ 无字段反射枚举（UTS110111129/144） | `patch(store, mutator)` mutator 形态 |
| `store.$state`（快照 get/set） | 快照构建需枚举全部 state 字段，UTS 无法反射枚举 | `patch` mutator 内逐字段操作 / 自定义 serialize action |
| `store.$onAction(cb)` | 自动追踪需包装全部 action，依赖字段枚举，不可实现 | action 内显式打点（日志/埋点需求） |
| `acceptHMRUpdate` | HMR 为非目标（原生端无此机制） | — |
| `mapState/mapActions/mapStores/mapWritableState` | 依赖展开运算符注入 Options 组件，uvue 选项式下支持未验证；uni-app x 主流为组合式 | 组合式 `const { count } = storeToRefs(store)`（后置试验项） |
| devtools / SSR | 原生端无 devtools；uni-app x 无 SSR 场景 | — |
| `defineStore` id 推断 / `pinia.state.value` 全局 state 树 | id 推断依赖调用上下文注入；state 树聚合需字段枚举 | id 必填；按 store 粒度访问 |

## 3. v1 导出清单（定稿）

```uts
// —— 创建与实例 ——
export function createPinia(): Pinia                       // P8 验证 install
export class Pinia {
  use(plugin: PiniaPlugin): Pinia                          // 链式注册插件
  install(app: any): void                                  // app.use(pinia) 入口
}
export function setActivePinia(pinia: Pinia | null): void
export function getActivePinia(): Pinia | null

// —— 定义与使用 ——
export function defineStore<T>(id: string, setup: () => T): () => T
export function storeToRefs<T>(store: T): T

// —— 实例 API（$-methods 的顶层函数映射）——
export function patch<T>(store: T, fn: (s: T) => void): void
export function dispose<T>(store: T): void
export function getStoreId<T>(store: T): string
// subscribe 已裁掉（P9 裁决见 2.2）；Unsubscribe/SubscribeCallback 类型保留给字段级 watch 生态
export type Unsubscribe = () => void
export type PiniaPlugin = (ctx: PiniaPluginContext) => void   // UTS 函数类型必须箭头语法
export type PiniaPluginContext = { pinia: Pinia, store: any, storeId: string }
```

> 签名细节说明：泛型约束不加（UTS 泛型约束不可靠，x-pinia-s 同款结论）；`Map` 收纳用 `as any` 边界转换（error17 实证）。

## 4. 用户侧示例（一比一心智）

```uts
// main.uts —— 与标准 Pinia 几乎一致（P8 通过后）
import { createSSRApp } from 'vue'
import App from './App.uvue'
import { createPinia } from '@/uni_modules/ux-pinia'

export function createApp() {
  const app = createSSRApp(App)
  app.use(createPinia())       // 形态一比一；未挂载时模块单例兜底（免挂载可用）
  return { app }
}
```

```uts
// stores/counter.uts
import type { Ref, ComputedRef } from 'vue'
import { defineStore } from '@/uni_modules/ux-pinia'

export type CounterStore = {
  count: Ref<number>,
  doubleCount: ComputedRef<number>,
  increment: () => void,
  reset: () => void
}

export const useCounterStore = defineStore<CounterStore>('counter', (): CounterStore => {
  const count: Ref<number> = ref(0)
  const doubleCount: ComputedRef<number> = computed((): number => count.value * 2)
  const increment = (): void => { count.value++ }
  const reset = (): void => { count.value = 0 }
  return { count, doubleCount, increment, reset } as CounterStore
})
```

```uts
// 页面 / 其他 store 中的实例 API（$-methods → 顶层函数）
import { patch, dispose, getStoreId, subscribe } from '@/uni_modules/ux-pinia'

patch(useCounterStore(), (s: CounterStore): void => { s.count.value = 10 })   // ≙ store.$patch(fn)
const id: string = getStoreId(useCounterStore())                              // ≙ store.$id → 'counter'
const stop = subscribe(useCounterStore(), (): void => { /* state 变化 */ })   // ≙ store.$subscribe（P9）
stop()
dispose(useCounterStore())                                                    // ≙ store.$dispose
```

## 5. 与标准 Pinia 差异对照表（定稿）

| 能力 | 标准 Pinia | unix-pinia v1 | 归属 |
| --- | --- | --- | --- |
| createPinia / app.use | ✅ | 免挂载为唯一可靠形态（P8 实测：原生端 install 不触发）；`setActivePinia(createPinia())` 顶层登记实测生效，插件场景用此方式 | 实现（形态落定） |
| defineStore setup 式 | ✅ | ✅ id 必填 + 显式 type 标注 | 实现 |
| defineStore Options 式 | ✅ | ❌ this 语义受限 → setup 式 | 裁掉 |
| storeToRefs | ✅ | ✅ 透传 | 实现 |
| 脚本访问 state | `store.count` | `store.count.value`（无 Proxy 硬约束） | 形态差异 |
| `$patch(fn)` | ✅ | `patch(store, fn)` | 实现 |
| `$patch(对象)` | ✅ | ❌ 无 Partial/反射 | 裁掉 |
| `$subscribe` | ✅ | ❌ 裁掉（P9 实测：deep watch Android 端不触发，双端不一致） | 字段级 `watch(store.count, cb)` |
| `$onAction` | ✅ | ❌ action 枚举不可实现 | 裁掉 |
| `$id` | ✅ | `getStoreId(store)` | 实现 |
| `$reset` | setup 式不内置（抛错） | 不内置（文档引导自定义 reset action） | 行为一比一 |
| `$state` 快照 | ✅ | ❌ 字段枚举不可实现 | 裁掉 |
| `$dispose` | ✅ | `dispose(store)` | 实现 |
| pinia.use 插件 | 插件可返回对象合并进 store | 插件返回 void（UTS 不可注入属性），仅 hook 逻辑 | 约束差异 |
| mapState 等辅助 | ✅ | ❌ 后置试验 | 裁掉 |
| devtools / HMR / SSR | ✅ | ❌ 非目标 | 裁掉 |
| 持久化 | 独立包 pinia-plugin-persistedstate | v2 独立插件（Q9 已确认，结构一比一） | 后置 |

## 6. M3 执行蓝图

**前置 PoC（P8/P9，半天量级）**
- [ ] P8：vdom 原生端 `app.use(pinia对象插件)` 可用性（install 被调用验证）
- [ ] P9：`watch(reactive(store), cb, { deep: true })` 在 Android 端对 RefImpl 字段的触发行为

**L1 直接实现（P8/P9 无论结果都做）**
- [ ] utssdk 五文件：index / interface（公开类型）/ registry（含 store→id 反查 Map）/ defineStore / storeToRefs
- [ ] createPinia / Pinia / setActivePinia / getActivePinia
- [ ] patch / dispose / getStoreId
- [ ] README 按第 4/5 章重写
- [ ] playground 迁移定稿示例（counter + user 双 store、跨 store 调用、实例 API 用例页）
- [ ] 双端 T1–T8 + DoD 验收

**L2 按 PoC 结果**
- [ ] P8 通过 → install/挂载链路；失败 → 免挂载模式为唯一形态（差异表标注）
- [ ] P9 通过 → subscribe；失败 → 差异表标注 + 字段级 watch 引导

**L3 明确不做**
- 裁掉清单（第 2.3 节）全部落入 README 差异表
