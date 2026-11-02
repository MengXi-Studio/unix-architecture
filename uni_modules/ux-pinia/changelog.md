## 0.2.0 (2026-11-01)
### 变更（破坏性）

- **架构升级：class + reactive**：store 定义改为 `class XxxStore extends PiniaStoreBase`——state 用 `reactive<T>` 强类型包裹、派生值用 class getter、action 为普通 method；`defineStore<T>(id, factory)` 返回 useStore
- 0.1.0 setup 式 API 移除：`storeToRefs`（reactive 模板直接响应，无需解构）、顶层 `patch(mutator)`（`$patch(partial)` 等价且类型安全）、`loadPersisted` / `savePersisted` / `getStorageKey`（被内置持久化插件内化）

### 新增

- **完整实例 API**：`$patch(partial)` / `$reset()` / `$subscribe(cb)` / `$onAction(cb)` / `$dispose()` / `$id` / `$state` / `$save()` 全部可用（由按需重写的三个 Template Method 钩子 `_doReset` / `_hydrate` / `_serialize` 驱动）
- **内置持久化插件**：`createPersistPlugin`（store 创建自动恢复，`$patch` / `$reset` / `$save` 自动落盘 `_serialize` 快照）+ `clearPersistedState`（清空指定 store 持久化数据）
- **持久化并入主包**：原独立插件 ux-pinia-persist 取消发布，存储后端可替换（`setStorageAdapter` + `StorageAdapter` 类型，默认 uni storage，可换 unix-storage / 原生 preferences）
- **验证**：Web 全用例通过；Android 云打包（Kotlin 编译链，蒸汽模式）通过，真机用例复验中
## 0.1.0（2026-10-18）

首个公开版本。

### 新增

- **setup 式 defineStore**：`defineStore<T>(id, setup): () => T`，state 用 `Ref`、getter 用 `ComputedRef`、action 用箭头函数；同 id 重复定义幂等并警告
- **模块级单例注册表**：应用级生命周期，跨页面共享状态（Web + Android 双端实测）
- **storeToRefs**：模板解构自动解包
- **实例 API 顶层函数映射**：`patch`（≙ `$patch` mutator 形态）/ `dispose`（≙ `$dispose`）/ `getStoreId`（≙ `$id`）
- **Pinia 实例与插件体系**：`createPinia` / `setActivePinia` / `getActivePinia` / `pinia.use(plugin)`（插件返回 void，UTS 约束）
- **免挂载设计**：纯状态管理无需任何挂载代码；插件场景顶层 `setActivePinia(createPinia().use(plugin))`
- **平台验证**：vdom 模式 Web 与 App-Android（Kotlin 编译链）全用例通过

### 已知差异

- 脚本访问 state 需 `.value`（UTS 无 Proxy）；模板经 `storeToRefs` 解构后自动解包
- `$subscribe` / `$onAction` / `$state` / `$patch` 对象形态 / Options 式 defineStore 不支持，详见文档「与标准 Pinia 的差异」
