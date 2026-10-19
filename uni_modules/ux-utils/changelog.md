## 0.2.0（2026-10-19）
第二个版本：modal 模块（`uni.showModal` 全端兼容封装）。

### 新增

- **modal 模块**：对 `uni.showModal` 的全端兼容封装（Android / iOS / Web / 微信 / 鸿蒙五端），业务侧统一 `import { showModal } from '@/uni_modules/unix-utils'`
- **参数完全对齐**：`title / content / showCancel / cancelText / cancelColor / confirmText / confirmColor / editable / placeholderText / success / fail / complete` 与 `uni.showModal`
  同构，迁移零成本；除回调外均为可选字段
- **分端混合通道**（自动分发，业务零配置）：
  - App-Android / App-iOS：UTS 直挂系统窗口自绘（Android `WindowManager` / iOS `UIWindow`），v0.2.0 起 App 端不再走 `uni.showModal` 原生通道
  - Web：DOM 单例自绘（蒙层点击不关闭、editable 真实渲染 `<input>`）
  - 微信 / 鸿蒙：`uni.showModal` 原生通道 + 库内归一化
- **返回值恒定**：`ModalResult` 的 `confirm` / `cancel` 恒存在且互斥（消除各端 cancel 字段缺失差异），`editable` 场景 `content` 携带用户输入
- **颜色归一化**：校验 `#RGB` / `#RRGGBB` / `#RRGGBBAA`，非法值降级平台默认色并经 fail 回调留痕；alpha 在 App / Web 自绘通道全生效，微信 / 鸿蒙原生通道自动剥离并留痕；未配置时库内默认确认色 `#007aff` / 取消色 `#000000`（微信端不干预、随平台默认）
- **交互语义跨端对齐**：蒙层点击不关闭（对齐微信官方语义）、Android 返回键以取消语义关闭（`cancel = true`）、连续调用后调替换前调
- **editable 真实输入框**：自绘通道真实渲染输入框，`content` 兼作输入框初始值且光标定位末尾；正文超过屏高 60%（内置阈值）自动限高滚动
- **受限端文案截断**：微信 / 鸿蒙端按钮文案超 4 字符库内自动截断（消除平台静默行为差异），App / Web 端完整显示
- **Promise 式 `showModalAsync`**：resolve `ModalResult`，点取消不算失败（与 uni 语义一致）；失败 reject `ModalFail` 结构的 JSON 字符串（全端统一，业务侧 `JSON.parse<ModalFail>(err as string)` 还原）
- **快捷 API `showModalAlert`**：单确定按钮 alert 语义（`title` + 可选 `content`）
- **全局默认配置 `configureModal`**：项目级预设按钮文案与颜色，字段传 `null` 表示沿用库内置默认 / 平台默认
- **结构化失败信息 `ModalFail`**：`errCode`（1001 参数非法 / 2001 平台不支持且已降级）、`errSubject`（固定 `'unix-utils:modal'`）、`param`（触发问题的参数名）、`platform`（端标识），降级可感知、可过滤；`ModalFail` /
  `ModalResult` 类型已对外导出

### 变更（破坏性）

- **`showToastAsync` 失败 reject 值改为 JSON 字符串**：0.1.0 中 reject `ToastFail` 对象；实测 App 端运行时 async 代理仅将 reject 值按字符串透传（对象字段全部丢失），为全端契约一致，0.2.0 起统一 reject `ToastFail`
  结构的 JSON 字符串，业务侧 `JSON.parse<ToastFail>(err as string)` 还原。回调式 `showToast` 的 fail 回调仍收到结构化对象，不受影响；`ToastFail` 类型 0.2.0 起对外导出
## 0.1.0（2026-10-09）

首个版本：toast 模块（`uni.showToast` 全端兼容封装）。

### 新增

- **toast 模块**：对 `uni.showToast` 的全端兼容封装（Android / iOS / Web / 微信 / 鸿蒙五端），标准 uni_modules UTS 插件形态（`utssdk/` 官方目录结构 + `interface.uts` 对外声明），插件市场 + npm 双轨分发，业务侧统一
  `import { showToast } from '@/uni_modules/unix-utils'`
- **参数完全对齐**：`title / icon / image / mask / duration / position / success / fail / complete` 与 `uni.showToast` 同构，迁移零成本；`ToastOptions` 除 `title` 外均为可选字段，`icon` / `position`
  / 错误码为字符串/数字字面量联合类型
- **分端混合通道**（自动分发，业务零配置）：
  - App-Android / App-iOS：UTS 直挂系统窗口（Android `WindowManager` / iOS `UIWindow` 免注册挂窗），position / warning / mask / 精确 duration 全生效，系统窗口级生命周期跨页面存活，挂窗失败自动降级 `uni.showToast`
    原生通道
  - Web：DOM 单例自绘（position / warning / 无平台截断全生效）
  - 微信 / 鸿蒙：`uni.showToast` 原生通道，不支持的参数自动降级并留痕
- **icon 超集**：原生 6 值 + 扩展 `warning`；`fail` / `exception` 在原生端归一化为 `error`（多数端行为未定义），自绘通道真实渲染；`warning` 在原生端降级 `none` 并经 fail 回调留痕
- **position 三值全支持**：`top` / `center` / `bottom` 在自绘通道全生效，位置语义三端一致（top 顶边距显示区顶 10%、bottom 底边距显示区底 10%、center 居中）；原生通道端降级居中并留痕
- **双轨 API**：回调式 `showToast`（主）+ Promise 式 `showToastAsync`（辅）；语义化快捷 API `showToastSuccess` / `showToastError` / `showToastInfo`
- **`hideToast` 统一语义**：自绘通道可靠隐藏（含原生不支持隐藏的 position 形态）
- **全局默认配置 `configureToast`**：项目级预设 duration / icon / mask，字段传 `null` 表示沿用库内置默认（1500ms / `'success'` / `false`）
- **结构化失败信息 `ToastFail`**：`errCode`（1001 参数非法 / 2001 平台不支持）、`errSubject`（固定 `'unix-utils:toast'`）、`param`（触发降级的参数名）、`platform`（端标识），降级可感知、可过滤
