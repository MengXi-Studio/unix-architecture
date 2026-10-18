**中文** | [English](./README-en.md)

<div align="center">
  <a href="https://github.com/MengXi-Studio/unix-pinia">
    <img alt="梦曦工作室 Logo" width="215" src="https://github.com/MengXi-Studio/unix-pinia/blob/master/packages/docs/src/public/logo.png">
  </a>
  <a href="https://github.com/MengXi-Studio/unix-pinia">
    <img alt="微信公众号 二维码" width="215" src="https://github.com/MengXi-Studio/unix-pinia/blob/master/packages/docs/src/public/QR_code.jpg">
  </a>
  <br>
  <h1>@meng-xi/unix-pinia</h1>
  <p>为 uni-app x 提供 Pinia 风格的状态管理库（UTS 编写，setup 式，一套 API 多端覆盖）</p>

[![license](https://img.shields.io/github/license/MengXi-Studio/unix-pinia.svg)](./license.md) [![npm](https://img.shields.io/npm/v/@meng-xi/unix-pinia?color=blue)](https://www.npmjs.com/package/@meng-xi/unix-pinia)
![npm](https://img.shields.io/npm/dt/@meng-xi/unix-pinia?color=green)

</div>

## 为什么是 unix-pinia

uni-app x 的 **vdom 模式 App 原生端**无法使用标准 Pinia（蒸汽模式全平台可用，vdom 模式仅 Web/小程序可用）；官方「导出全局 reactive 变量」的裸方案又缺少统一范式——store 命名、跨页面单例、批量更新、订阅，每项都要自己约定。unix-pinia 把 Pinia 的使用习惯完整搬到 UTS：

- **写过 Pinia？** setup 式 `defineStore` / `storeToRefs` / `createPinia` 心智完全对齐，state 用 `ref`、getter 用 `computed`、action 用箭头函数，看一眼 API 就能上手；
- **多端发布？** 同一份 UTS 源码，Web 编译为 JS、Android 编译为 Kotlin，由 uni-app x 编译链现场编译，无 JS Bridge；
- **在意的坑都有实测答案？** UTS 无 Proxy 的解包差异、Kotlin 泛型擦除、`app.use` 原生不可靠——每项都经双端实测并在文档给足替代方案。

设计原则为一比一复刻 Pinia API 面、**裁掉平台不可实现项**（对标 unix-router 复刻 vue-router）：每个裁掉项都有明确原因与替代方案，详见[差异对照](#与标准-pinia-的差异)。

## 特性

- **setup 式 defineStore** - `defineStore<T>(id, setup)`：state 用 `Ref`、getter 用 `ComputedRef`、action 用箭头函数，与 Pinia 官方推荐写法一致；返回类型显式 `type` 标注，编辑器全程提示
- **免挂载单例** - 模块级注册表保证应用级单例，跨页面共享状态，无需 `app.use`；纯状态管理零挂载代码
- **实例 API 顶层函数映射** - `patch` / `dispose` / `getStoreId` 对应 `$patch` / `$dispose` / `$id`（UTS 无 Proxy，无法在 store 对象上挂方法）
- **跨 store 依赖** - setup 内直接调用对方 `useStore`，注册表保证单例
- **插件体系** - `pinia.use(plugin)` 链式注册，`PiniaPluginContext`（`pinia` / `store` / `storeId`）对齐标准 Pinia 三字段
- **幂等与可预测** - 同 id 重复 `defineStore` 警告并返回既有实例；`dispose` 后 `useStore` 重建全新实例
- **强类型 UTS** - 全量显式类型标注；Kotlin 泛型擦除边界（`as any`）已在库内收敛，业务侧零感知
- **双端实测** - Web（JS 编译链）与 Android（Kotlin 编译链、真机）全用例通过，双端行为一致

## 安装

**npm**——安装后将包内容同步到工程 `uni_modules/ux-pinia/`（编译器不扫描 node_modules）：

```bash
pnpm add @meng-xi/unix-pinia
mkdir -p uni_modules && cp -R node_modules/@meng-xi/unix-pinia uni_modules/ux-pinia
```

**插件市场**：搜索 `ux-pinia` 导入 HBuilderX。

> `packages/core` 为标准 **uni_modules UTS 插件**（`utssdk/` 官方目录结构 + `interface.uts` 对外声明），业务侧从 `@/uni_modules/ux-pinia` 导入。

## 快速开始

### 1. 定义 store（stores/counter.uts）

```uts
import type { Ref, ComputedRef } from 'vue'
import { defineStore } from '@/uni_modules/ux-pinia'

export type CounterStore = {
	count: Ref<number>,                   // state：Ref
	doubleCount: ComputedRef<number>,     // getter：ComputedRef
	increment: () => void,                // action：箭头函数（UTS 函数声明不能作值传递）
	reset: () => void                     // $reset 的替代：自定义 reset action
}

export const useCounterStore = defineStore<CounterStore>('counter', (): CounterStore => {
	const count: Ref<number> = ref(0)
	const doubleCount: ComputedRef<number> = computed((): number => count.value * 2)
	const increment = (): void => { count.value++ }
	const reset = (): void => { count.value = 0 }
	return { count, doubleCount, increment, reset } as CounterStore
})
```

> 类型导入规范：`ComputedRef` 编译器不全局注入，必须 `import type { ComputedRef } from 'vue'`；`Ref` 可注入但建议统一显式导入。

### 2. 页面使用

```uts
import { storeToRefs } from '@/uni_modules/ux-pinia'
import { useCounterStore } from '@/stores/counter.uts'

const store = useCounterStore()                    // 多次调用返回同一实例（跨页面共享）
const { count, doubleCount } = storeToRefs(store)  // 模板解构自动解包

store.count.value++                                // 脚本访问 state：.value（UTS 无 Proxy 不自动解包）
```

### 3. 实例 API（$-methods 的顶层函数映射）

```uts
import { patch, dispose, getStoreId } from '@/uni_modules/ux-pinia'

// ≙ store.$patch(fn)：批量修改（仅 mutator 形态）
patch(store, (s: CounterStore): void => { s.count.value = 10 })

const id: string = getStoreId(store)   // ≙ store.$id → 'counter'

dispose(store)                         // ≙ store.$dispose()：注销后下次 useStore 重建
```

### 4. 跨 store 与插件

```uts
// 跨 store 依赖：setup 内直接调用对方 useStore
export const useUserStore = defineStore<UserStore>('user', (): UserStore => {
	const counterStore = useCounterStore()
	const score: Ref<number> = ref(0)
	const addScoreFromCount = (): void => { score.value += counterStore.count.value }
	return { score, addScoreFromCount } as UserStore
})

// 插件（可选；main.uts 顶层登记，P8 实测：原生端 app.use 不可靠，顶层显式登记为唯一可靠形态）
import { createPinia, setActivePinia } from '@/uni_modules/ux-pinia'
setActivePinia(createPinia().use(myPlugin))
```

### 运行效果

仓库自带示例工程 [packages/playground](https://github.com/MengXi-Studio/unix-pinia/tree/master/packages/playground)，进入首页自动运行全部验证用例（响应式矩阵 / 单例跨页面 / patch / 双 store 互调 / 幂等 / dispose 重建），以 `[verify]` 前缀输出日志并在页面直接显示 pass/fail。示例工程为纯 HBuilderX 工程，用 HBuilderX 打开 `packages/playground` 即可发行 Web / Android，复验同一组用例。

**Android 体验包（云打包产物）**：[下载 APK](https://mp-b8b8347a-48e9-434d-8302-3e9d99c2cb01.cdn.bspapp.com/cloudstorage/app-build-pkg/1792298656822-__UNI__0AA2919_1792298648182.apk)（vdom 模式，安装后进入各功能页查看 `[verify]` 结果）

**双端实测结论**：Web 与 Android 真机（Kotlin 编译链）全部用例通过，双端行为一致；iOS / 鸿蒙代码全端同构，待实测。

## 交流与支持

想了解设计思路与实现原理（UTS 无 Proxy 的解包差异、Kotlin 泛型擦除红线、`$subscribe` 裁决过程等）？公众号「**梦曦工作室**」有系列解析，扫码关注：

<p align="center">
  <img alt="微信公众号 二维码" width="180" src="https://github.com/MengXi-Studio/unix-pinia/blob/master/packages/docs/src/public/QR_code.jpg">
</p>

- 📖 [完整文档](https://mengxi-studio.github.io/unix-pinia/)（指南 + API 参考 + 更新日志）
- 🐛 [Issues](https://github.com/MengXi-Studio/unix-pinia/issues) / 💬 [Discussions](https://github.com/MengXi-Studio/unix-pinia/discussions)

## 导出

- API：`defineStore` / `storeToRefs` / `createPinia` / `setActivePinia` / `getActivePinia` / `patch` / `dispose` / `getStoreId`
- 类型：`Pinia` / `PiniaPlugin` / `PiniaPluginContext` / `Unsubscribe` / `SubscribeCallback`

## 文档

📖 从入门到精通的完整文档（指南 + API 参考 + 更新日志）：

**[https://mengxi-studio.github.io/unix-pinia/](https://mengxi-studio.github.io/unix-pinia/)**

阅读建议：先看[介绍](https://mengxi-studio.github.io/unix-pinia/guide/introduction.html)与[快速开始](https://mengxi-studio.github.io/unix-pinia/guide/getting-started.html)，再按
[基础用法](https://mengxi-studio.github.io/unix-pinia/guide/basic-usage.html) → [与标准 Pinia 的差异](https://mengxi-studio.github.io/unix-pinia/guide/pinia-diff.html) 深入核心链路，API 细节查 [API 参考](https://mengxi-studio.github.io/unix-pinia/api/functions.html)。

## 更新日志

📝 **[https://github.com/MengXi-Studio/unix-pinia/blob/master/packages/docs/src/changelog.md](https://github.com/MengXi-Studio/unix-pinia/blob/master/packages/docs/src/changelog.md)**

## License

[MIT](./license.md)
