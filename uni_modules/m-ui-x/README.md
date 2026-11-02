<img alt="梦曦工作室 Logo" width="180" src="https://raw.githubusercontent.com/MengXi-Studio/unix-ui/master/packages/docs/src/public/logo.png">

# m-ui-x

为 uni-app x 提供功能完善的 UI 组件库（UTS + uvue 编写，一套组件多端覆盖）。

**m-ui-x** 是开源项目 [unix-ui](https://github.com/MengXi-Studio/unix-ui) 的 uni_modules 插件发行版（npm 包名
[`@meng-xi/unix-ui`](https://www.npmjs.com/package/@meng-xi/unix-ui)），内置按钮、徽标、图标、加载、单元格、栅格、图片、文本、间距等 11 个基础组件，把原生开发的交互细节（按压反馈、0.5px 细边框、文本省略、徽标截断……）与多端差异一次收敛。

## 特性

- **easycom 零注册**：`<m-button>` 标签直接使用，无需 import 与手动注册
- **多端覆盖，vapor 兼容**：一套组件源码覆盖 App（Android / iOS / HarmonyOS）、Web、微信小程序，支持蒸汽模式
- **编译期主题定制**：全部视觉参数以 `$m-*` SCSS 变量（全 `!default`）收敛，在根 `uni.scss` 定义同名变量即覆盖，零运行时开销
- **跨端一致的小屏细节**：0.5px hairline 细边框（transform 缩放方案）、按压反馈等平台差异由库内统一处理
- **组合式 API + 强类型 UTS**：props / events 全量类型标注，UTS / TS 提示到位；动画走 `UniElement.animate`，无 `@keyframes` 依赖
- **无全局副作用**：组件样式自包含，无全局样式注入，随用随取

## 平台兼容性

| App-Android | App-iOS | App-HarmonyOS | Web（Chrome / Safari） | 微信小程序 |
| :---------: | :-----: | :-----------: | :--------------------: | :--------: |
|      √      |    √    |       √       |           √            |     √      |

> 环境要求：HBuilderX 5.08+，uni-app x 项目。

## 使用说明

### 1. 导入插件

在 HBuilderX 中通过插件市场「导入插件」安装，插件位于工程 `uni_modules/m-ui-x/`；也可从 npm 安装 `@meng-xi/unix-ui` 后将包内容复制到 `uni_modules/m-ui-x/`。

### 2. 使用组件

easycom 自动导入，模板中直接书写标签：

```html
<template>
	<m-button type="primary" @click="onClick">主要按钮</m-button>
</template>

<script setup lang="uts">
	const onClick = () => {
		uni.showToast({ title: '点击了按钮' })
	}
</script>
```

### 3. 主题定制（可选）

在工程根 `uni.scss` 中**直接定义**同名变量即可覆盖默认值（编译期 `!default` 叠加，无需引入任何文件）：

```scss
/* 常规按钮高度 44px → 48px */
$m-button-normal-height: 48px;
```

> 请勿在 `uni.scss` 中 `@import` 插件内 `vars.scss`——`uni.scss` 会注入每个组件样式，与组件内引用同一文件会触发 sass 循环导入。

## 组件清单

| 组件                  | 说明                                                                                      |
| --------------------- | ----------------------------------------------------------------------------------------- |
| m-button              | 按钮：语义色 type、plain / disabled / loading、四档尺寸、block、hairline 细边框、按压反馈 |
| m-cell / m-cell-group | 单元格与分组：title / value / label、图标、四向箭头、inset 圆角卡片分组                   |
| m-row / m-col         | 栅格布局：gutter 间距、对齐、换行                                                         |
| m-icon                | 图标：250+ 常用图标（ttf 随包内置）、颜色尺寸、自定义图标插槽                             |
| m-image               | 图片：mode 直通、加载 / 失败占位、淡入过渡、圆形、懒加载                                  |
| m-text                | 文本：语义色 / 色值双模式、三档字号、单行省略、多行截断、可选中                           |
| m-space               | 间距：方向 / 换行 / 对齐，size 单值或双值（行 / 列）分写                                  |
| m-loading             | 加载：circular / spinner 双形态、自定义色与尺寸、带文案                                   |
| m-badge               | 徽标：数字 / 点、max 截断、语义色与色值、位置偏移、独立形态                               |

## 文档与演示

- 📖 完整文档（指南 + 组件参考 + 更新日志，中英双语）：[https://mengxi-studio.github.io/unix-ui/](https://mengxi-studio.github.io/unix-ui/)
- 💻 在线演示（浏览器直接体验）：[Playground](https://mengxi-studio.github.io/unix-ui/playground/)
- 📱 Android 真机体验：[下载演示 App（APK）](https://mp-b8b8347a-48e9-434d-8302-3e9d99c2cb01.cdn.bspapp.com/cloudstorage/app-build-pkg/1793059625238-__UNI__F1AA560_1793059613497.apk)

## 更新记录

### 0.1.0（2026-10-27）

- 首个版本发布：面向 uni-app x 的 UI 组件库，内置 11 个基础组件
- 主题机制：默认主题零配置内置，根 `uni.scss` 直接定义 `$m-*` 变量即可编译期全局覆盖
- easycom 自动导入：遵循 uni_modules 组件插件规范，免 import 免注册

完整更新记录见 [changelog.md](./changelog.md)。

## 交流与支持

想了解设计思路与实现原理（编译期主题变量注入、hairline 跨端方案、UTS 组件开发等）？公众号「**梦曦工作室**」有系列解析，扫码获取更多信息：

<img alt="微信公众号二维码" width="180" src="https://raw.githubusercontent.com/MengXi-Studio/unix-ui/master/packages/docs/src/public/QR_code.jpg">

- 🐛 [Issues](https://github.com/MengXi-Studio/unix-ui/issues) / 💬 [Discussions](https://github.com/MengXi-Studio/unix-ui/discussions)
- 🌐 官网：[mengxi-studio.github.io](https://mengxi-studio.github.io/.github/)

## 开源协议

[MIT](./LICENSE) © MengXi-Studio
