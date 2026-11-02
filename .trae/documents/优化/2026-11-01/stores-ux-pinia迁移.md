# stores 迁移 ux-pinia 0.2.0 class 式 实施方案

## 需求

用户：`uni_modules/ux-router` 与 `uni_modules/ux-pinia` 两个插件功能更新了，请合理优化此架构功能。

插件更新事实（以各自 changelog 为准）：

- **ux-pinia 0.1.0 → 0.2.0（2026-11-01，破坏性）**：setup 式 store API **移除**（`storeToRefs`、setup 式 `defineStore`、顶层 `patch`），改为 `class XxxStore extends PiniaStoreBase`（state 用 `reactive<T>` 包裹、派生值用 class getter、action 为普通 method、constructor 中 `bindState`）；新增完整实例 API（`$patch` / `$reset` / `$save` / `$subscribe` 等）与内置持久化插件（`createPersistPlugin`，opt-in）。**现状代码无法编译，属强制迁移。**
- **ux-router 0.7.0 → 0.8.2（增量，无破坏）**：0.8.2 新增 `RouterOptions.backFallback`（back() 页面栈不足时兜底 relaunch，走完整守卫链）；0.8.1 修复 H5 刷新/冷启动直连后返回无效、back() 栈不足兜底（本工程路由表无 isTab 路由，原行为维持 CANCELLED）。

## 需求分析

### A. 强制迁移（ux-pinia 破坏性变更，不迁移即编译失败）

| 文件 | 现状断点 | 迁移动作 |
| --- | --- | --- |
| `stores/modules/user.uts` | setup 式 `defineStore<UserStore>(id, setup)` + Ref state + `as UserStore` 收尾 | 改写为 `class UserStore extends PiniaStoreBase`（reactive state / method action / `bindState`），`UserState` 就近定义 |
| `stores/types/user.uts` | `type UserStore = { token: Ref<string>, ... }` 出口形状 | **删除**——class 式 store 的出口形状由 class 声明本身固化，独立 type 会成为重复事实源；`UserState` 按判据「单文件模块私有契约就近定义」 |
| `stores/types.uts` | `export type { UserStore } from './types/user.uts'` | 改为从 `./modules/user.uts` 转发 class 类型（聚合出口约定保留） |
| `pages/index/index.uvue` | `const { name } = storeToRefs(userStore)` + 模板 `{{ name }}` | 移除 `storeToRefs` 导入；模板改 `userStore.state.name`（reactive 直接访问，无 `.value`） |
| `router/permission.uts` | `userStore.name.value.length > 0` | 改 `userStore.state.name.length > 0` |

不受影响：`stores/index.uts`（仅转发 useUserStore）、`pages/login/login.uvue`（仅 method 调用，无 state/Refs 访问）。

### B. 增强项（ux-router 0.8.2）

| 文件 | 动作 |
| --- | --- |
| `router/index.uts` | `createRouter` 增加 `backFallback: '/pages/index/index'`——本工程路由表无 `meta.isTab` 路由，0.8.1 之前 back() 栈不足维持 CANCELLED；显式配置后深链/刷新直连场景 back() 自动 relaunch 回首页且走完整守卫链 |

### C. 文档同步（README ↔ architecture.md ↔ SKILL.md 同源联动）

- `README.md`：第 2 节目录树 `stores/types/` 注释、第 5 节 stores/ 细则（setup 式 → class 式改写 + 持久化插件不启用的理由存档）、第 3 节装配范式说明核对（免挂载结论不变）。
- `.trae/rules/architecture.md`：第 1.1 节插件清单 ux-pinia 行 API 列（`storeToRefs` 已移除 → `defineStore` / `PiniaStoreBase`）。
- `.trae/skills/arch-feature/SKILL.md`：第 3 步 store 模块指引整体改写为 class 式。
- `CHANGELOG.md`：登记 `[1.2.0]`（依赖破坏性升级的强制适配 + 路由增强）。

## 伪代码设计

```uts
// stores/modules/user.uts（迁移后骨架）
import { reactive } from 'vue'
import { defineStore, PiniaStoreBase } from '@/uni_modules/ux-pinia'

/** 用户模块 state（单文件模块私有契约，就近定义） */
export type UserState = { token: string; name: string; avatar: string }

export class UserStore extends PiniaStoreBase {
  state: UserState = reactive<UserState>({ token: '', name: '', avatar: '' })

  constructor() {
    super()
    this.bindState(this.state)   // $-API 与持久化的前提
  }

  async loginAction(username: string, password: string): Promise<void> {
    const dto = await login(username, password)
    this.state.token = dto.token          // Ref.value → reactive 字段直写
    persistToken(dto.token)               // token 持久化仍委托 utils/auth.uts
  }
  // getInfoAction / logoutAction / resetToken 同构改写（method 化，this.state.* 直写）
}

export const useUserStore = defineStore<UserStore>('user', (): UserStore => new UserStore())
```

```uts
// stores/types.uts（聚合出口保留，转发对象从独立 type 改为 class 类型）
export type { UserStore } from './modules/user.uts'
```

消费方改写要点：state 访问 `store.state.字段`（无 `.value`）；模板事件绑定 method 带括号；派生值用 class getter（本模块暂无）。

## 疑问清单

### Q1 token 持久化是否迁移到 ux-pinia 0.2.0 内置持久化插件（createPersistPlugin）？（影响：utils/auth.uts 存废、main.uts 装配、鉴权数据流）

回答（2026-11-01 用户确认「好的，按这个方案实施迁移」，采纳推荐项）：**不迁移**。理由：① `utils/auth.uts` 承担「对标 js-cookie」的职责分离设计，`ensureAuthReady()` 冷启动竞态消除已 Web 端全链路验证；② 内置持久化默认后端为 uni storage，与现行 ux-storage 双轨并存会造成持久化语义分裂；③ 迁移需重写鉴权层与 main.uts 装配，风险大于收益。内置持久化保留给未来「业务状态持久化」场景（如草稿箱），token 鉴权链路维持现状。

## 实施记录

- **方案落地形态**：与伪代码设计一致，无偏差。user store 迁移为 `class UserStore extends PiniaStoreBase`（`UserState` 就近 export）；`stores/types.uts` 转发 class 类型；`stores/types/user.uts` 删除；`index.uvue` / `permission.uts` 的 store 访问改 `store.state.*` 直读；`router/index.uts` 增加 `backFallback: '/pages/index/index'`。
- **变更文件清单**：`stores/modules/user.uts`（重写）、`stores/types.uts`（重写）、`stores/types/user.uts`（删除）、`pages/index/index.uvue`、`router/permission.uts`、`router/index.uts`；文档联动：`README.md`（目录树 + 第 5 节 stores 细则）、`.trae/rules/architecture.md`（插件清单 API 列）、`.trae/skills/arch-feature/SKILL.md`（第 3 步整体改写）、`CHANGELOG.md`（[1.1.0]，与 m-ui-x 集成合并为同一未发布版本）、`implementation-log.md`、本文件。
- **验证方式与结果**：HBuilderX 5.34 编译成功（route-gen 无变化）；本地 mock（127.0.0.1:3210，临时脚本在系统 Temp，不入仓库）+ 浏览器 E2E 全链路——冷启动守卫重定向 → 登录 → `store 'user' 已创建`（class 实例化）→ GET /user/info 200（Bearer 注入正常）→ 首页「欢迎，梦曦用户」reactive 渲染 → 退出确认 modal → 清理登录态回登录页；控制台无错误。测试期间两次「点击无效」为自动化合成点击未触发 uni-app x H5 委托事件系统的假象，坐标级真实点击全部正常（非应用缺陷，经验已沉淀至项目记忆）。
- **遗留 TODO**：无。
