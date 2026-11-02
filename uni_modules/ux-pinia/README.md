<img alt="梦曦工作室 Logo" width="180" src="https://raw.githubusercontent.com/MengXi-Studio/unix-pinia/master/packages/docs/src/public/logo.png">

# ux-pinia

为 uni-app x 提供 Pinia 风格的状态管理与内置持久化（UTS 编写，class 式 store，一套 API 多端覆盖）。

**ux-pinia** 是开源项目 [unix-pinia](https://github.com/MengXi-Studio/unix-pinia) 的 uni_modules 插件发行版（npm 包名
[`@meng-xi/unix-pinia`](https://www.npmjs.com/package/@meng-xi/unix-pinia)），把标准 Pinia 的使用习惯完整搬到 UTS：class 式 `defineStore`（`class extends PiniaStoreBase`，state 用 `reactive<T>` 包裹、派生值用 getter、action 为普通 method）、完整实例 API（`$patch` / `$reset` / `$subscribe` / `$onAction` / `$dispose` / `$id` / `$state` / `$save`）与插件体系，填补 **vdom 模式 App 原生端无法使用标准 Pinia** 的空缺；内置持久化插件（`createPersistPlugin`：store 创建自动恢复、`$patch` / `$reset` / `$save` 自动落盘），装一个插件即得状态管理 + 持久化完整能力。

## 特性

- **class 式 defineStore**：`class XxxStore extends PiniaStoreBase`——state 用 `reactive<T>` 强类型包裹、派生值用 class getter、action 为普通 method，结构对齐 Pinia 官方 `state / getters / actions` 心智；`defineStore<T>(id, factory)` 返回 useStore，返回类型显式标注，编辑器全程提示
- **完整实例 API**：`$patch(partial)` / `$reset()` / `$subscribe(cb)` / `$onAction(cb)` / `$dispose()` / `$id` / `$state` / `$save()` 全部内置（class + reactive 架构）
- **内置持久化插件**：`createPersistPlugin`（store 创建自动恢复，`$patch` / `$reset` / `$save` 自动落盘快照）+ `clearPersistedState`；只需按需重写 `_serialize` / `_hydrate` 两个钩子
- **免挂载单例**：模块级注册表保证应用级单例，跨页面共享状态；纯状态管理零挂载代码
- **插件体系**：`pinia.use(plugin)` 链式注册，`PiniaPluginContext`（`pinia` / `store` / `storeId`）对齐标准 Pinia 三字段
- **跨 store 依赖**：method 内直接调用对方 `useStore`，注册表保证单例（不要放在字段初始化器中）
- **可替换存储后端**：`setStorageAdapter({ get, set, remove })`——默认 uni storage，可换 unix-storage / 原生 preferences
- **强类型 UTS**：全量显式类型标注；Kotlin 泛型擦除与可空性边界已在库内收敛，业务侧零感知

## 平台兼容性

| App-Android | App-iOS | App-HarmonyOS | Web（Chrome / Safari） | 微信小程序 |
| :---------: | :-----: | :-----------: | :--------------------: | :--------: |
|      √      |    √    |       √       |           √            |     √      |

> 环境要求：HBuilderX 4.75+，uni-app x 项目。蒸汽模式（vapor）云打包验证通过（Android Kotlin 编译链），真机用例复验中；iOS / 鸿蒙代码与 Android 全端同构，待实测。

## 使用说明

### 1. 导入插件

在 HBuilderX 中通过插件市场「导入插件」安装，插件位于工程 `uni_modules/ux-pinia/`；也可从 npm 安装 `@meng-xi/unix-pinia` 后将包内容复制到 `uni_modules/ux-pinia/`。

### 2. 定义 store（stores/counter.uts）

```uts
import { reactive } from 'vue'
import { defineStore, PiniaStoreBase } from '@/uni_modules/ux-pinia'

export type CounterState = {
	count: number
	name: string
}

export class CounterStore extends PiniaStoreBase {
	// state：reactive<T> 强类型包裹（字段为原始值，模板 / 脚本直接访问）
	state: CounterState = reactive<CounterState>({ count: 0, name: 'pinia' })

	// 派生值：class getter（模板经 reactive 属性依赖收集自动更新）
	get doubleCount(): number {
		return this.state.count * 2
	}

	// constructor：super() 后必须 bindState(this.state)（$-API 与持久化的前提）
	constructor() {
		super()
		this.bindState(this.state)
	}

	// actions = 普通 class method，直接修改 state
	increment(): void {
		this.state.count++
	}
}

export const useCounterStore = defineStore<CounterStore>('counter', (): CounterStore => new CounterStore())
```

> 派生值用 **class getter** 而非 computed 字段：插件内 `effectScope` 不可用，computed 会绑定首次创建页面的作用域、跨页面后失效；getter 每次求值无此问题。

### 3. 页面使用

```uts
import { useCounterStore } from '@/stores/counter.uts'

const counter = useCounterStore()   // 多次调用返回同一实例（跨页面共享）
```

```html
<template>
	<view>
		<text>count: {{ counter.state.count }}</text>
		<text>double: {{ counter.doubleCount }}</text>
		<button @click="counter.increment()">+1</button>
		<button @click="counter.$reset()">重置</button>
	</view>
</template>
```

> - 脚本访问：`counter.state.count`（reactive 字段直接读写，无 `.value`）
> - **模板事件绑定 class method 必须带括号**：`@click="counter.increment()"`（Kotlin 端 method 不是值）
> - 纯状态管理无需任何挂载代码；需要插件（含内置持久化）时在 main.uts 顶层 `setActivePinia(createPinia().use(plugin))`（实测：原生端 `app.use` 不触发 install）

### 4. 持久化（内置插件，零胶水）

main.uts 顶层登记持久化插件（一次配置，全部 store 生效）：

```uts
// main.uts
import { createPinia, setActivePinia, createPersistPlugin } from '@/uni_modules/ux-pinia'

setActivePinia(createPinia().use(createPersistPlugin({
	keyPrefix: 'ux-pinia:',
	includeStores: null,               // null = 全部 store
	excludeStores: new Array<string>(),
	serializer: null                   // null = JSON 序列化
})))
```

需要持久化的 store 重写两个钩子（Template Method 契约）：

```uts
export class UserStore extends PiniaStoreBase {
	state: UserState = reactive<UserState>({ token: '' })

	constructor() {
		super()
		this.bindState(this.state)
	}

	// 落盘快照：只含需持久化的字段（$patch / $reset / $save 触发）
	override _serialize(): UTSJSONObject {
		return { token: this.state.token } as UTSJSONObject
	}

	// 恢复回填：字段级判空（存储损坏 / 字段缺失 → 保留初始值）
	override _hydrate(data: UTSJSONObject): void {
		if (data['token'] != null) {
			this.state.token = data['token'] as string
		}
	}
}

export const useUserStore = defineStore<UserStore>('user', (): UserStore => new UserStore())
```

- **恢复**：store 创建时插件读存储并调 `_hydrate`（自动，无需任何代码）
- **落盘**：`$patch` / `$reset` / `$save` 触发 `_serialize` 快照写存储（自动）；direct 修改 state 后需调 `store.$save()`
- **换后端**：`setStorageAdapter({ get, set, remove })` 在创建任何 store 前调用
- **调试**：`clearPersistedState('user', 'ux-pinia:')` 清空指定 store 的持久化数据

> 三个钩子（`_doReset` / `_hydrate` / `_serialize`）均可不重写——state 修改 / actions / `$subscribe`（`$patch` / `$reset` 触发）依然有效；不重写 `_serialize` / `_hydrate` 时该 store 持久化为空操作。

## API 清单

顶层函数：

| API | 说明 |
| --- | --- |
| defineStore | 定义 class 式 store：`defineStore<T>(id, factory)`，同 id 幂等返回既有实例 |
| createPinia / setActivePinia / getActivePinia | 实例管理与登记（插件场景） |
| dispose | ≙ store.$dispose()：注销实例，下次 useStore 重建 |
| getStoreId | ≙ store.$id：反查 store id |
| createPersistPlugin | 创建内置持久化插件（main.uts 顶层登记） |
| clearPersistedState | 清空指定 store 的持久化数据 |
| setStorageAdapter | 替换存储后端（默认 uni storage，可换 unix-storage / 原生 preferences） |

实例 API（`PiniaStoreBase` 内置）：

| API | 说明 |
| --- | --- |
| $patch(partial) | 批量修改（经 `_hydrate` 钩子装载）并通知订阅器 |
| $reset() | 调用 `_doReset` 钩子后通知订阅器 |
| $save() | 显式保存点（direct 修改 state 后的落盘触发） |
| $subscribe(cb) | 订阅状态变更（type = 'patch' / 'reset' / 'save'，state 为 `_serialize()` 快照），返回取消函数 |
| $onAction(cb) | 订阅 action 调用（经 `callAction` 包装的 action 被追踪），返回取消函数 |
| $dispose() | 注销实例，下次 useStore 重建 |
| $id / $state | store id / 当前 state 引用 |

class 与类型：`PiniaStoreBase`（store 基类）/ `Pinia`（实例）/ `PiniaPlugin` / `PiniaPluginContext` / `Unsubscribe` / `StorageAdapter` / `PersistOptions` / `StateChangeCallback` / `ActionInfo`

## 文档与演示

- 📖 完整文档（指南 + API 参考 + 更新日志，中英双语）：[https://mengxi-studio.github.io/unix-pinia/](https://mengxi-studio.github.io/unix-pinia/)
- 💻 示例工程：仓库自带 [packages/playground](https://github.com/MengXi-Studio/unix-pinia/tree/master/packages/playground)，首页自动运行全部验证用例
- 📱 Android 真机体验：[下载演示 App（APK）](https://mp-b8b8347a-48e9-434d-8302-3e9d99c2cb01.cdn.bspapp.com/cloudstorage/app-build-pkg/1793456655694-__UNI__0AA2919_1793456648910.apk)
- 📝 更新日志：[changelog.md](./changelog.md)

## 交流与支持

想了解设计思路与实现原理（UTS reactive 的编译期展开、可空性红线、`$subscribe` 裁决过程等）？公众号「**梦曦工作室**」有系列解析，扫码获取更多信息：

<img alt="微信公众号二维码" width="180" src="https://raw.githubusercontent.com/MengXi-Studio/unix-pinia/master/packages/docs/src/public/QR_code.jpg">

- 🐛 [Issues](https://github.com/MengXi-Studio/unix-pinia/issues) / 💬 [Discussions](https://github.com/MengXi-Studio/unix-pinia/discussions)
- 🌐 官网：[mengxi-studio.github.io](https://mengxi-studio.github.io/.github/)

## 开源协议

[MIT](./license.md) © MengXi-Studio
