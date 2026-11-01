# ux-storage 打包 uts-proxy 失败修复 实施方案

## 需求

用户报告：HBuilderX 5.34 发行打包（16:29）失败——`uni_modules/ux-storage?uts-proxy (13:44): Expected a semicolon`。dev 运行编译正常，仅打包流水线失败。

## 需求分析

- 报错为 esbuild 的 JS 解析错误，且 `(13:44)` 精确对应生成代理的第 13 行第 44 列。
- 排除法：入口内联泛型导出非 ux-storage 独有（mx-request / ux-pinia 同样有，均通过）；`export type {} from` 各插件均有。
- 诊断手法：Node 直调 HBuilderX 同款编译器（`uniapp-uts-v1` 的 `compiler.compile()`）dump 出 ux-storage 的 proxy 代码，第 13 行实况为：
  `export const DEFAULT_KEY_PREFIX = mx_storage:`——**字符串字面量被去掉引号原样输出**，`mx_storage` 被解析为标识符、尾随冒号恰好落在 13:44。
- 根因：`@dcloudio/uni-uts-v1/dist/code.js` 的 `genInitCode` 对 `StringLiteral` 返回 `expr.value`（未加引号，应 `JSON.stringify`），属 HBuilderX 5.34 发行流水线缺陷；dev 模式不触发。数字 / 布尔字面量 unquoted 后仍合法，不受影响。
- 雷区普查：共 9 个入口导出字符串常量——ux-storage 2（`DEFAULT_KEY_PREFIX` / `STORAGE_ERR_SUBJECT`）、ux-utils 5（根入口 + web 平台入口各一份：`DEFAULT_ICON` / `DEFAULT_CONFIRM_TEXT` / `DEFAULT_CANCEL_TEXT` / `DEFAULT_CONFIRM_COLOR` / `DEFAULT_CANCEL_COLOR`）、mx-request 2（`DEFAULT_METHOD` / `REQUEST_ERR_SUBJECT`）。全工程（业务代码 + 插件互引）对这些常量**零消费**（各插件内部使用 BUILTIN_ 前缀孪生常量）。

## 疑问清单

（无——根因与修复方式均为实证结论，无设计分叉）

## 实施记录

- **方案落地形态**：对 4 个入口文件（ux-storage 根入口、ux-utils 根入口 + web 平台入口、mx-request 根入口）的 9 个字符串常量**去导出**（保留常量本体与注释，首个常量处注释原因与上游恢复条件）。数字 / 布尔常量不改动。
- **变更文件清单**：`uni_modules/ux-storage/utssdk/index.uts`、`uni_modules/ux-utils/utssdk/index.uts`、`uni_modules/ux-utils/utssdk/web/index.uts`、`uni_modules/mx-request/utssdk/index.uts`。
- **验证方式与结果**：Node 直调编译器 dump 全部 5 个插件（ux-storage / mx-request / ux-utils / ux-pinia / ux-router）的 proxy 代码，逐一以 esbuild（js loader，与发行流水线同款解析器）`transformSync` 验证——**全部通过**；原失败点 13:44 消失。
- **阶段 2（app-android 发行树，16:50 复打包新暴露）**：esbuild 修复后推进到 app-android 分析阶段，新失败：`failed to resolve ./types/api.uts from ...\.uvue\app-android\api\types.uts (index not found)`。对比发行树定位：发行拷贝**不追踪 `export type ... from` 转发链**——`api/types/api.uts` 与 `composables/types/useLoading.uts` 仅被类型转发引用、不进发行树，而聚合文件内的转发语句仍被分析器强制解析；uni_modules 不受影响（走全量同步）；stores 域已提前因 class 迁移改为指向运行时可达的 modules 文件而幸免。修复：DTO 与 LoadingState 收敛进 `api/types.uts` / `composables/types.uts` 单文件（删除两个子目录文件，与 stores 域模式对齐）；架构类型约定同步更新（README 第 4 节 / architecture.md 第 3 节 / SKILL.md 第 1 步：禁 types/ 子目录转发链，转发仅允许指向运行时可达文件）。验证：全工程剩余转发链唯一（stores/types.uts → modules/user.uts，发行树已含目标）。
- **阶段 3（Android 云打包 Kotlin 编译）**：esbuild 与发行树两关通过后，`:app:compileReleaseKotlin` 报 10 错。Node 无法直接复现（Gradle 云端链路），以本地留存的 Kotlin 产物（`unpackage/dist/build/app-android/.uniappx/android/src/`）逐行映射回 UTS 源修复：
  - `index.kt 2613`：`utils/auth.uts` 的 `get(TOKEN_KEY)` 未显式标注泛型，Kotlin 端 T 推断失败 → `get<string>(TOKEN_KEY)`；
  - `index.kt 2875`：`router.guardRoute()` 无参调用，5.34 Kotlin 生成器丢弃可选参数默认值 → 显式 `guardRoute(null, null)`；
  - `m-loading.kt 36/173`：`Animation` 运行时类型在 5.34 插件组件 Kotlin 生成中 Unresolved（与 ux-pinia 记载的 vue 符号同类缺陷）→ 移除动画句柄存储与 `cancel()`，保留 `animate` 裸调用；type 动态切换改由使用方 `:key` 重建组件触发；
  - `m-loading.kt 46`：`slots.default != null` 在插件组件 Kotlin 生成中 Unresolved → `#ifdef APP-ANDROID` 恒渲染文案节点（空文案零宽，视觉误差可忽略），其余平台保留 slots 检查；
  - `m-loading.kt 197`：`watch(() => props.type, ...)`（带 `flush: 'post'`）重载解析异常（source 返回值被要求 Unit）→ 移除 watch，同上走 `:key` 重建。
- **遗留 TODO（更新）**：① 上游仓库同步阶段 1 规避；② m-badge 存在同款 `slots.default` 检查（当前未被使用未触发），被使用前需同款修复；③ m-icon / m-col / m-image 的 watch（是否带 flush 选项待核）在首次被使用打包时需复验。
