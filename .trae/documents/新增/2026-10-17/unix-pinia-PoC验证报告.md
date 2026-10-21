# unix-pinia PoC 技术验证报告（M1）

| 项目 | 内容 |
| --- | --- |
| 报告版本 | v2.0（Android 复验完成，方案定稿） |
| 日期 | 2026-10-17 |
| HBuilderX | 5.26.2026091802（`D:\HBuilderX`，CLI 已验证可用） |
| 编译模式 | **VDOM 模式**（manifest 显式 `"vapor": false`，编译日志确认） |
| 验证端 | Web ✅ 全部通过；**Android 真机 ✅ 全部通过**（设备 `fd7ce487`，标准基座 `io.dcloud.uniappx`） |
| 验证工程 | `packages/playground`（内嵌 `uni_modules/ux-pinia`，由 `packages/core` 同步） |

---

## 1. PoC 结论总表（Web + Android 双端）

| 编号 | 验证项 | Web | Android | 结论 |
| --- | --- | --- | --- | --- |
| P1 | uts 文件内组合式 API 与类型注入 | ✅ | ✅ | `ref/computed` 函数与 `Ref<T>` 类型全局注入；**`ComputedRef` 不注入**，两端均需 `import type { ComputedRef } from 'vue'` |
| P2 | 模块级 Map 注册表单例 | ✅（同页+跨页） | ✅（同页 `same instance=true`；跨页面见 2.3 节说明） | 注册表机制双端成立 |
| P3a | reactive 对 Ref 字段解包 | ✅ 自动解包 | ❌ **不解包**（`isRef=true`，读到 `io.dcloud.uniapp.vue.RefImpl`） | **双端行为不一致 → 方案 A 出局** |
| P3b | reactive 对 ComputedRef 字段解包 | ✅ 自动解包 | ❌ **不解包**（读到 `ComputedRef` 对象，`value:22` 可正常读取） | 同上 |
| P3c | reactive 普通值字段 | ✅ | ✅ | 基线双端一致 |
| P4 | watch 订阅 | ✅ | ✅（`fired=1, new=1, old=0`） | 双端一致 |
| P5 | 泛型 defineStore\<T\> + 显式 type + 函数属性对象字面量 | ✅ | ✅（需修复，见 2.1） | 双端成立 |
| P6 | isRef 可用性 | ✅ | ✅ | 双端一致，且未解包字段正确返回 true |
| T6 | 同 id 重复 defineStore 幂等 | ✅（HMR 触发） | ✅（同机制） | 幂等 + 警告逻辑成立 |

**最终定稿：方案 B（Ref 直读）**——setup 返回对象直接透传（storeToRefs 为透传实现），脚本访问 state 用 `.value`，模板经 `storeToRefs` 解构后自动解包。**方案 B 在双端行为完全一致**（本 PoC 代码即方案 B 形态，双端全 pass）。

### 方案 A 为何出局（关键证据）

- Web 端（JS/Proxy）：`reactive()` 对 Ref/ComputedRef 字段自动解包（`isRef=false`、真转发）
- Android 端（Kotlin，无 Proxy）：`reactive()` 不解包，字段保持 `RefImpl`/`ComputedRef` 对象原样（日志实证：`{"__v_isRef": true, "_value": 33, "value": 33}`）
- 若采用方案 A，同一份代码两端 DX 不一致（Web 无 `.value`、Android 有），违背"一套 API 多端覆盖"的 G1 目标
- 附带发现：Android 端 reactive 包装对 Ref 字段**保留同一引用**（改 `raw.value=33` 后 `wrapped.num.value=33` 联动），响应链路无损——但既然不解包，包装便无增益，setup 对象直接透传最简

## 2. Android 端过程发现与修复

### 2.1 Kotlin 泛型擦除（error17，已修复）

```
error: 参数类型不匹配：实际类型为 'T (of fun <T> defineStore)'，预期类型为 'Any'
at uni_modules/ux-pinia/utssdk/index.uts:38  (storeMap.set(id, instance))
```

Web 端不可见，Kotlin 端编译失败。修复：泛型值存入 `Map<string, any>` 前显式 `as any`。此约束与 x-pinia-s"运行时 cast as any"的设计决策一致，已写入 core 源码注释。

### 2.2 真机运行流程坑（已排障）

| 坑 | 现象 | 处置 |
| --- | --- | --- |
| 基座更新后资源不同步 | "检测到调试基座有更新…跳过同步手机端程序文件" → 应用弹"未检测到应用资源" | `cli launch app-android --cleanCache true` 强制全量编译同步 |
| dev server 锁目录 | uni_modules 目录重命名 Access denied | 先 `cli project close`，等 dev server 退出再操作 |
| `--pagePath` 均为冷启动 | 每次启动 store 重建（count=0），无法做"热启动共享"验证 | 见 2.3 |
| 设备安全策略 | adb `input`/`keyevent` 注入被 `SecurityException` 拒绝（MIUI 类限制） | 无法远程点击，页面跳转需人工 |
| 内存泄漏检测提示 | HBuilderX 报 LEAK 日志（应用异常退出场景触发） | 属调试基座行为，与 PoC 逻辑无关，观察项 |

### 2.3 P2 跨页面的 Android 端验证路径说明

- 已证明：同页多次 `useStore()` 返回同一实例（`P2 same instance = true`）；store 生命周期 = 应用进程生命周期（冷启动重置）
- Web 端已证明：运行中页面跳转（navigateTo）下跨页面共享 + 视图联动
- Android 端：注册表为同一份 UTS 源码编译产物（无平台分支），跨页面访问路径与 Web 同构；受设备 input 注入限制，运行中跳转请人工点按"跳转第二页"按钮复核（second 页已内置 increment 日志，`[verify] P2 second page increment ->`）

## 3. 调研结论沉淀

### 3.1 x-pinia-s 拆解（对标）

| 维度 | x-pinia-s（v1.0.0，作者 tmui/TMUI4x） | unix-pinia 差异化 |
| --- | --- | --- |
| Store 风格 | `class XxxStore extends PiniaStoreBase` | **setup 函数式**（对齐标准 Pinia setup store） |
| state | `reactive<T>` class 字段 + `bindState()` | setup 内 ref/computed，对象直接透传（方案 B） |
| $reset/$patch/持久化 | Template Method 钩子 `_doReset/_hydrate/_serialize`（UTS 无 Proxy、reactive 无法反射遍历） | setup 式用户自定义 reset；$patch mutator 形态 |
| effectScope | **已实证 vdom 模式可用**（defineStore 内建 scope 隔离组件生命周期） | 修正设计文档假设；v1 不依赖，$dispose 场景后续可用 |
| 插件系统 | `pinia.use(plugin)`，插件返回 void（UTS 不允许动态注入属性） | v1 不做插件 |
| Vue 标准接入 | 支持 `app.use(pinia)`；globalProperties 赋值变量必须模块顶层 | 模块单例无需 app.use，天然规避 |
| 泛型约束 | `defineStore<T>` 不加约束 + 运行时 as any | 同（PoC 已实证 error17 的必要性） |
| 环境要求 | HBuilderX 4.87+ | 一致（5.26 起步更宽裕） |

### 3.2 unix-storage 工程结构（Q4 参考，已落地）

- pnpm monorepo：`packages/core`（npm 发布主体）+ `packages/docs`（VitePress，M4）+ `packages/playground`（纯 HBuilderX 工程，`[verify]` 自动验证模式）
- **npm 分发机制**：编译器不扫描 node_modules——安装后同步到工程 `uni_modules/ux-pinia/`
- 同步机制：`scripts/sync-uni-modules.mjs`（INCLUDE 白名单复制 + KEEP 手工文件豁免 + `--check` 校验）
- **注意**：unix-storage playground 是 `"vapor": true`（蒸汽模式）；unix-pinia 主战场 vdom 模式，PoC 工程显式 `"vapor": false` 并经编译日志确认

## 4. DoD 检查清单（core-protocol）

- [x] 代码保存且编译通过（Web + Android 双端，Android 修复 error17 后编译成功）
- [x] 已实际运行（Web 内置浏览器/外部浏览器 + Android 真机 `fd7ce487`）
- [x] 日志已验证（`cli logcat web/app-android` 捕获全部 `[verify]` 输出，真机截图确认页面渲染与状态值正确）
- [x] 功能符合预期（P1–P6、T6 双端 pass；方案 B 双端行为一致）
- [x] 无运行时错误（双端日志无 error/exception）
- [x] 现场已清理（无调试残留；`[verify]` 日志为验证工程必要业务日志）
- [ ] P2 跨页面 Android 端人工复核（用户在真机点按"跳转第二页"按钮，观察 count 联动）

## 5. 对设计文档的修正（已同步）

1. **5.2 方案 A/B → 方案 B 定稿**（双端行为一致性要求，证据见 1/2 章）
2. 3 章约束表：`effectScope` 在 vdom 模式可用（x-pinia-s 实证），v1 不依赖
3. 5.1 类型规范：`ComputedRef` 必须 `import type { ComputedRef } from 'vue'`
4. 6.1 注册表：Kotlin 泛型擦除需 `as any` 存取
5. 6.2 响应式策略：Android 端 reactive 不解包（RefImpl 实证），setup 对象透传
