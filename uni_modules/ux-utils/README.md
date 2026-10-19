**中文** | [English](./README-en.md)

<div align="center">
  <a href="https://github.com/MengXi-Studio/unix-utils">
    <img alt="梦曦工作室 Logo" width="215" src="https://github.com/MengXi-Studio/unix-utils/blob/master/packages/docs/src/public/logo.png">
  </a>
  <a href="https://github.com/MengXi-Studio/unix-utils">
    <img alt="微信公众号 二维码" width="215" src="https://github.com/MengXi-Studio/unix-utils/blob/master/packages/docs/src/public/QR_code.jpg">
  </a>
  <br>
  <h1>@meng-xi/unix-utils</h1>
  <p>为 uni-app x 提供便利工具的集合（UTS 编写，一套 API 全端覆盖）</p>

[![license](https://img.shields.io/github/license/MengXi-Studio/unix-utils.svg)](LICENSE) [![npm](https://img.shields.io/npm/v/@meng-xi/unix-utils?color=blue)](https://www.npmjs.com/package/@meng-xi/unix-utils)
![npm](https://img.shields.io/npm/dt/@meng-xi/unix-utils?color=green)

</div>

## 为什么是 unix-utils

直接用 `uni.showToast` / `uni.showModal` 写业务，坑都藏在各端差异里：`position` 小程序端不支持、`fail` / `exception` 图标多数端行为未定义、modal 的 `cancel` 字段有的端缺失、按钮文案微信悄悄截断、alpha 色值各端表现不一……每一项都要自己踩一遍再封装，换个项目再踩一遍。unix-utils 把这些重复劳动收敛成一套库：

- **迁移零成本？** 参数与 `uni.showToast` / `uni.showModal` 完全同构，返回值恒定（`confirm` / `cancel` 恒存在且互斥），换库不改业务代码；
- **多端发布？** App / Web 自绘通道全属性生效，微信 / 鸿蒙原生通道自动降级并经 `fail` 回调结构化留痕（`errCode` / `param` / `platform`），差异可感知、可过滤；
- **在意类型？** 除 `title` 外全可选字段 + 字面量联合类型，UTS / TypeScript 提示全量到位。

底层不重造弹窗栈：App 端 UTS 直挂系统窗口（Android `WindowManager` / iOS `UIWindow`），Web 端 DOM 单例自绘，小程序端保持 `uni` 原生 API。UTS 源码分发（Web / 小程序 → JS，Android → Kotlin，iOS → Swift），由 uni-app x 编译链现场编译。

## 特性

### toast 模块（uni.showToast 全端兼容封装）

- **App 端 UTS 直挂系统窗口** - Android `WindowManager` / iOS `UIWindow` 免注册挂窗，position / warning / mask / 精确 duration 全生效，系统窗口级生命周期跨页面存活，挂窗失败自动降级 `uni.showToast`
- **Web 端 DOM 单例自绘** - body 挂载单例，position / warning / 无平台截断全生效
- **参数完全对齐** - 与 `uni.showToast` 同构（`title / icon / image / mask / duration / position / success / fail / complete`），迁移零成本
- **icon 超集** - 原生 6 值 + 扩展 `warning`；`fail` / `exception` 在原生端归一化为 `error`（多数端行为未定义），自绘通道真实渲染
- **position 三值全支持** - `top` / `center` / `bottom` 自绘通道全生效，位置语义三端一致（top 顶边距顶 10%、bottom 底边距底 10%、center 居中）
- **双轨 API** - 回调式 `showToast`（主）+ Promise 式 `showToastAsync`（辅）；语义化快捷 API `showToastSuccess` / `showToastError` / `showToastInfo`
- **可靠隐藏** - `hideToast` 在自绘通道可靠隐藏，含原生不支持隐藏的 position 形态
- **全局默认配置** - `configureToast` 项目级预设 duration / icon / mask
- **结构化降级** - `ToastFail`（`errCode` / `errSubject` / `param` / `platform`），降级经 `fail` 回调留痕，可感知、可过滤
- **强类型 UTS** - `ToastOptions` 除 `title` 外均为可选字段，`icon` / `position` / 错误码为字面量联合类型

### modal 模块（uni.showModal 全端兼容封装）

- **参数完全对齐** - 与 `uni.showModal` 同构（`title / content / showCancel / cancelText / cancelColor / confirmText / confirmColor / editable / placeholderText / success / fail / complete`），迁移零成本
- **返回值恒定** - `ModalResult` 的 `confirm` / `cancel` 恒存在且互斥（消除各端 `cancel` 字段缺失差异），`editable` 场景 `content` 携带用户输入
- **App 端 UTS 直挂系统窗口** - Android `WindowManager` / iOS `UIWindow` 免注册挂窗（v0.2.0 起 App 端不再走 `uni.showModal` 原生通道），弹窗表现跨端一致
- **交互语义跨端对齐** - 蒙层点击不关闭（对齐微信官方语义）、Android 返回键以取消语义关闭（`cancel = true`）、连续调用后调替换前调
- **editable 真实输入框** - 自绘通道真实渲染输入框，`content` 兼作输入框初始值且光标定位末尾；正文超过屏高 60%（内置阈值）自动限高滚动
- **颜色归一化** - 校验 `#RGB` / `#RRGGBB` / `#RRGGBBAA`，非法值降级平台默认色并留痕；alpha 在 App / Web 自绘通道全生效，微信 / 鸿蒙原生通道自动剥离并留痕；库内默认确认色 `#007aff` / 取消色 `#000000`
- **受限端文案截断** - 微信 / 鸿蒙端按钮文案超 4 字符库内自动截断，App / Web 端完整显示
- **Promise 式 + 快捷 API** - `showModalAsync` 点取消不算失败；`showModalAlert` 单确定按钮 alert 语义
- **全局默认配置** - `configureModal` 项目级预设按钮文案与颜色
- **结构化降级** - `ModalFail`（`errCode` 1001 参数非法 / 2001 平台不支持且已降级），`ModalFail` / `ModalResult` 类型对外导出

## 安装

**npm**——安装后将包内容同步到工程 `uni_modules/unix-utils/`（编译器不扫描 node_modules）：

```bash
pnpm add @meng-xi/unix-utils
mkdir -p uni_modules && cp -R node_modules/@meng-xi/unix-utils uni_modules/unix-utils
```

**插件市场**：搜索 `unix-utils` 导入 HBuilderX。

> `packages/core` 为标准 **uni_modules UTS 插件**（`utssdk/` 官方目录结构 + `interface.uts` 对外声明），业务侧从 `@/uni_modules/unix-utils` 导入。

## 快速开始

### 1. 发出第一条 toast

```uts
import { showToast } from '@/uni_modules/unix-utils'

// 与 uni.showToast 同构，迁移零成本
showToast({
  title: '保存成功',
  icon: 'success',
  duration: 2000
})
```

### 2. Promise 式与语义化快捷

```uts
import {
  showToastAsync,
  showToastSuccess,
  showToastError,
  showToastInfo,
  hideToast
} from '@/uni_modules/unix-utils'

// Promise 式：失败 reject ToastFail 结构的 JSON 字符串（全端统一，JSON.parse 还原）
try {
  await showToastAsync({ title: '加载中', icon: 'loading' })
} catch (err) {
  const fail = JSON.parse<ToastFail>(err as string)
  if (fail != null) {
    console.error(fail.errCode, fail.param, fail.platform)
  }
}

// 语义化快捷
showToastSuccess('成功')
showToastError('失败')
showToastInfo('消息')

// 手动隐藏（自绘通道可靠隐藏，含 position 形态）
hideToast()
```

> `icon` / `position` 为字符串字面量联合类型（`'success' | 'error' | 'fail' | 'exception' | 'warning' | 'loading' | 'none'`），直接传字面量即可。

### 3. 全局默认配置

```uts
import { configureToast } from '@/uni_modules/unix-utils'

configureToast({
  duration: 2000,  // 默认展示时长
  icon: 'success', // 默认图标
  mask: false      // 默认是否显示蒙层
})
```

### 4. 弹出第一个模态弹窗（modal 模块）

```uts
import { showModal } from '@/uni_modules/unix-utils'

// 与 uni.showModal 同构，迁移零成本
showModal({
  title: '删除确认',
  content: '删除后不可恢复，是否继续？',
  confirmColor: '#ff0000',
  success: (res) => {
    if (res.confirm) doDelete() // confirm / cancel 恒存在且互斥
  }
})
```

### 5. Promise 式、alert 语义与全局默认

```uts
import {
  showModalAsync,
  showModalAlert,
  configureModal
} from '@/uni_modules/unix-utils'

// Promise 式：点取消不算失败（resolve），失败 reject ModalFail 结构的 JSON 字符串（全端统一，JSON.parse 还原）
const res = await showModalAsync({ title: '保存修改', content: '是否保存当前修改？' })
if (res.confirm) save()

// alert 语义（单确定按钮）
showModalAlert('提示', '操作已完成')

// 全局默认：字段传 null 表示沿用库内置默认 / 平台默认
configureModal({
  confirmText: '知道了',
  confirmColor: '#00aa00',
  cancelText: null,
  cancelColor: null
})
```

### 运行效果

仓库自带示例工程 [packages/playground](https://github.com/MengXi-Studio/unix-utils/tree/master/packages/playground) 是覆盖全部特性的可运行验证矩阵（12 个页面：2 个 toast 专题 + 8 个 modal 专题 + 1 个平台原生探针 + 主页导航），每个用例带页内运行日志，可直接对照各端真实表现。用 HBuilderX 打开 `packages/playground` 即可发行 H5 / 微信小程序 / Android，复验同一组用例。

## 交流与支持

想了解设计思路与实现原理（UTS 直挂系统窗口、分端混合通道的归一化降级设计等）？公众号「**梦曦工作室**」有系列解析，扫码关注：

<p align="center">
  <img alt="微信公众号 二维码" width="180" src="https://github.com/MengXi-Studio/unix-utils/blob/master/packages/docs/src/public/QR_code.jpg">
</p>

- 📖 [完整文档](https://mengxi-studio.github.io/unix-utils/)（指南 + API 参考 + 更新日志，中英双语）
- 🐛 [Issues](https://github.com/MengXi-Studio/unix-utils/issues) / 💬 [Discussions](https://github.com/MengXi-Studio/unix-utils/discussions)

## 导出

### toast 模块

- API：`showToast` / `showToastAsync` / `hideToast` / `configureToast` / `showToastSuccess` / `showToastError` / `showToastInfo`
- 常量：`DEFAULT_DURATION` / `DEFAULT_ICON` / `DEFAULT_MASK` / `TOAST_ERR_PARAM_INVALID(1001)` / `TOAST_ERR_PLATFORM_UNSUPPORTED(2001)`
- 字面量联合类型：`ToastIcon` / `ToastPosition` / `ToastErrorCode`

### modal 模块

- API：`showModal` / `showModalAsync` / `showModalAlert` / `configureModal`
- 常量：`DEFAULT_CONFIRM_TEXT` / `DEFAULT_CANCEL_TEXT` / `DEFAULT_CONFIRM_COLOR` / `DEFAULT_CANCEL_COLOR`
- 对外类型：`ModalResult` / `ModalFail`（`import type` 引入，用于 Promise 回调标注与字段访问）

## 文档

📖 从入门到精通的完整文档（指南 + API 参考 + 更新日志）：

**[https://mengxi-studio.github.io/unix-utils/](https://mengxi-studio.github.io/unix-utils/)**

阅读建议：先看[介绍](https://mengxi-studio.github.io/unix-utils/guide/introduction.html)与[快速开始](https://mengxi-studio.github.io/unix-utils/guide/getting-started.html)，再按 [Toast 提示](https://mengxi-studio.github.io/unix-utils/guide/toast.html) → [Modal 弹窗](https://mengxi-studio.github.io/unix-utils/guide/modal.html) → [通道架构与降级](https://mengxi-studio.github.io/unix-utils/guide/channels.html) 深入各端行为，API 细节查 [showToast](https://mengxi-studio.github.io/unix-utils/api/show-toast.html)与 [showModal](https://mengxi-studio.github.io/unix-utils/api/show-modal.html)。

## 更新日志

📝 **[https://mengxi-studio.github.io/unix-utils/changelog.html](https://mengxi-studio.github.io/unix-utils/changelog.html)**

## License

[MIT](LICENSE)
