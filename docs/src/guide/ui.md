# UI 组件库（m-ui-x）

架构内置 [m-ui-x](https://github.com/MengXi-Studio/unix-ui)——梦曦工作室为 uni-app x 打造的 UI 组件库（UTS + uvue 编写，一套组件多端覆盖），以 uni_modules 插件形式随模板分发。

## 使用方式

**easycom 零注册**：模板中直接书写标签，无需 import 与手动注册。

```html
<template>
	<m-button type="primary" block @click="onClick">主要按钮</m-button>
</template>
```

## 组件清单

| 组件 | 说明 |
| --- | --- |
| m-button | 语义色 type、plain / disabled / loading、四档尺寸、block、hairline 细边框、按压反馈 |
| m-cell / m-cell-group | 单元格与分组：title / value / label、图标、四向箭头、inset 圆角卡片分组 |
| m-row / m-col | 栅格布局：gutter 间距、对齐、换行 |
| m-icon | 图标：250+ 常用图标（ttf 随包内置）、颜色尺寸、自定义图标插槽 |
| m-image | 图片：mode 直通、加载 / 失败占位、淡入过渡、圆形、懒加载 |
| m-text | 文本：语义色 / 色值双模式、三档字号、单行省略、多行截断、可选中 |
| m-space | 间距：方向 / 换行 / 对齐，size 单值或双值（行 / 列）分写 |
| m-loading | 加载：circular / spinner 双形态、自定义色与尺寸、带文案 |
| m-badge | 徽标：数字 / 点、max 截断、语义色与色值、位置偏移、独立形态 |

## 消费示例

登录页提交按钮（loading 态绑定 `useLoading` 组合式函数，加载中自动阻断点击并切换文案）：

```html
<view class="login-btn-box">
	<m-button type="primary" block :loading="loading" loading-text="登录中…" @click="handleLogin">登录</m-button>
</view>
```

## 主题定制（编译期，零运行时开销）

全部视觉参数以 `$m-*` SCSS 变量（全 `!default`）收敛。在工程根 `uni.scss` 中**直接定义**同名变量即可覆盖默认值：

```scss
/* 常规按钮高度 44px → 48px */
$m-button-normal-height: 48px;
```

⚠️ **禁止在 `uni.scss` 中 `@import` 插件内 `vars.scss`**——`uni.scss` 会注入每个组件样式，与组件内引用同一文件会触发 sass 循环导入。可用变量参考：`uni_modules/m-ui-x/theme/vars.scss`。

## 规约

- **新增 UI 优先复用 m-ui-x 现成组件**，不自绘重复轮子（组件清单见上表）；
- 组件内只管自身样式，页面间距经外层 view 控制（规避样式隔离对组件根节点的约束）；
- 完整文档与在线演示：[mengxi-studio.github.io/unix-ui](https://mengxi-studio.github.io/unix-ui/)。
