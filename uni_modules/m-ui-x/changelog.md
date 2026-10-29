## 0.1.0（2026-10-27）
- 首个版本发布：面向 uni-app x 的 UI 组件库（UTS + uvue 一套源码多端覆盖），内置 11 个基础组件
- 新增 `m-button` 按钮组件：支持类型（default / primary / success / warning / danger）、尺寸（large / normal / small /
  mini）、朴素、圆角、方形、细边框（0.5px）、块级、禁用、加载状态（加载图标由 m-loading 驱动，loading-type 支持 circular / spinner）、按压反馈（hover-class 实现）与自定义颜色（含渐变）
- 新增 `m-badge`
  徽标组件：右上角徽标数字 / 文案 / 红点，支持 max 截断（`{max}+`）、语义色名与 CSS 色值、四角 position、offset-x/offset-y 偏移、show-zero 与 content 自定义内容插槽；无子元素时独立展示，可与 m-icon 组合使用
- 新增 `m-icon` 图标组件：内置 257 个字体图标（`name` 为 `IconName` 联合类型），支持 `color` / `size` 自定义、`custom-class` / `custom-style` 标签样式直达、`icon` 插槽与 `click` 事件；字体文件随包内置（`@font-face`
  声明式加载），零配置、离线可用
- 新增 `m-loading` 加载组件：circular（弧段圆环）/ spinner（花瓣）双形态，支持 `color` / `size` 自定义（size 支持 `100%` 撑满外部定尺寸容器）、`vertical` 垂直排列、`text-size` / `text-color`
  文案样式、默认文案插槽与 icon 自定义图标插槽；动画基于 `UniElement.animate`（ucss 无 `@keyframes`）
- 新增 `m-cell` / `m-cell-group` 单元格组件：title / value / label、图标、四向箭头、inset 圆角卡片分组
- 新增 `m-row` / `m-col` 栅格布局组件：gutter 间距、对齐、换行
- 新增 `m-image` 图片组件：mode 直通、加载 / 失败占位、淡入过渡、圆形、懒加载
- 新增 `m-text` 文本组件：语义色 / 色值双模式、三档字号、单行省略、多行截断、可选中
- 新增 `m-space` 间距组件：方向 / 换行 / 对齐，size 单值或双值（行 / 列）分写
- 主题机制：默认主题零配置内置（组件内顶层引入 `theme/vars.scss`，全 `!default`），在工程根 uni.scss 直接定义 `$m-*` 变量即可编译期全局覆盖
- easycom 自动导入：遵循 uni_modules 组件插件规范（插件 id：`m-ui-x`），免 import 免注册
