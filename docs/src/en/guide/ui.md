# UI Components (m-ui-x)

The template ships with [m-ui-x](https://github.com/MengXi-Studio/unix-ui) — a UI component library built by MengXi Studio for uni-app x (written in UTS + uvue, one set of components covering all platforms), distributed with the template as a uni_modules plugin.

## Usage

**Zero-registration easycom**: write the tags directly in templates, no imports or manual registration needed.

```html
<template>
	<m-button type="primary" block @click="onClick">Primary Button</m-button>
</template>
```

## Component List

| Component | Description |
| --- | --- |
| m-button | Semantic type colors, plain / disabled / loading, four sizes, block, hairline borders, press feedback |
| m-cell / m-cell-group | Cells and groups: title / value / label, icons, four-way arrows, inset rounded card groups |
| m-row / m-col | Grid layout: gutter spacing, alignment, wrapping |
| m-icon | Icons: 250+ common icons (ttf bundled), color and size, custom icon slot |
| m-image | Images: pass-through mode, loading / failure placeholders, fade-in transition, circular, lazy loading |
| m-text | Text: semantic color / raw color dual mode, three font sizes, single-line ellipsis, multi-line clamp, selectable |
| m-space | Spacing: direction / wrap / alignment, size as a single value or pair (row / column) |
| m-loading | Loading: circular / spinner variants, custom color and size, with label |
| m-badge | Badges: number / dot, max truncation, semantic colors and raw colors, position offset, standalone form |

## Consumption Example

The login page's submit button (loading state bound to the `useLoading` composable — clicks are blocked and the label switches automatically while loading):

```html
<view class="login-btn-box">
	<m-button type="primary" block :loading="loading" loading-text="Signing in…" @click="handleLogin">Sign In</m-button>
</view>
```

## Theming (Compile-Time, Zero Runtime Cost)

All visual parameters are consolidated into `$m-*` SCSS variables (all `!default`). Define a variable with the same name in the project-root `uni.scss` to **directly override** the default:

```scss
/* Normal button height 44px → 48px */
$m-button-normal-height: 48px;
```

⚠️ **Never `@import` the plugin's `vars.scss` from `uni.scss`** — `uni.scss` is injected into every component's styles, and importing the same file that components import triggers a sass circular import. Available variables: `uni_modules/m-ui-x/theme/vars.scss`.

## Rules

- **Prefer reusing existing m-ui-x components** for new UI; do not redraw duplicate wheels (see the component list above);
- Components only manage their own styles; page spacing is controlled by outer views (avoiding style isolation constraints on component root nodes);
- Full documentation and live demos: [mengxi-studio.github.io/unix-ui](https://mengxi-studio.github.io/unix-ui/).
