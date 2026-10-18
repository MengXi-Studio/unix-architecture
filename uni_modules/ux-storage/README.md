**中文** | [English](./README-en.md)

<div align="center">
  <a href="https://github.com/MengXi-Studio/unix-storage">
    <img alt="梦曦工作室 Logo" width="215" src="https://github.com/MengXi-Studio/unix-storage/blob/master/packages/docs/src/public/logo.png">
  </a>
  <a href="https://github.com/MengXi-Studio/unix-storage">
    <img alt="微信公众号 二维码" width="215" src="https://github.com/MengXi-Studio/unix-storage/blob/master/packages/docs/src/public/QR_code.jpg">
  </a>
  <br>
  <h1>@meng-xi/unix-storage</h1>
  <p>为 uni-app x 提供功能完善的本地缓存库（UTS 编写，一套 API 多端覆盖）</p>

[![license](https://img.shields.io/github/license/MengXi-Studio/unix-storage.svg)](./license.md) [![npm](https://img.shields.io/npm/v/@meng-xi/unix-storage?color=blue)](https://www.npmjs.com/package/@meng-xi/unix-storage)
![npm](https://img.shields.io/npm/dt/@meng-xi/unix-storage?color=green)

</div>

## 为什么是 unix-storage

直接用 `uni.setStorage` 写业务，回调包装、过期轮转、key 命名防冲突、`clear` 误伤其他业务数据……每一项都要自己封装，换个项目再封装一遍。unix-storage 把这些重复劳动收敛成一套库：

- **写过 axios？** 多实例（`createStorage` 对标 `axios.create`）、统一错误结构、三级配置合并心智完全对齐，看一眼 API 就能上手；
- **多端发布？** `uni.setStorage` 系列全端统一，库为纯编排层（无平台目录端），原生 `getStorage` 未命中 fail 形态等剩余差异由库内确定性实现抹平；
- **在意数据安全？** key 前缀命名空间隔离，`clear` / 清理只作用于本命名空间，默认前缀规避 `uni-` / `dcloud_` 平台保留前缀。

底层唯一依赖 `uni.setStorage` 系列原生 API，不重造存储栈；UTS 源码分发（Web / 小程序 → JS，Android → Kotlin，iOS → Swift），由 uni-app x 编译链现场编译。

## 特性

- **axios 心智，开箱即用** - `set` / `get` / `remove` / `clear` / `info` / `keys` / `clearExpired` 七个顶层函数默认实例即用；`createStorage` 多实例隔离，`configureStorage` 配置全局默认
- **TTL 过期管理** - `set(key, data, ttl)` 毫秒级过期；读取惰性判断（过期即移除）；`clearExpired()` 全量扫描返回清理条数；三级回退（调用级 `ttl` → 实例 `defaultTTL` → 内置永不过期）
- **key 前缀命名空间** - 默认前缀 `mx_storage:`；`keys()` 剥前缀返回原始 key；`clear()` 仅清理本命名空间；非法保留前缀操作期 `ERR_PARAM` 拦截
- **未命中不是错误** - 原生 `data not found` fail 在 adapter 层统一转译为 `resolve(null)`，业务侧只判空，调用点不再逐个兜 fail
- **统一可预测的错误结构** - `StorageError`（`ERR_PARAM` / `ERR_NATIVE`），原生 `errCode` 经 `nativeErrCode` 原值透传，`errSubject` 多库混用可过滤来源，`key` 挂载关联业务 key
- **兼容存量数据** - 读到非本库格式的数据按「无过期」原样返回，不报错不误删，渐进迁移无负担
- **泛型与类型还原** - `get<T>` 泛型静态标注；type 对象读回 `UTSJSONObject`，统一 `JSON.parse<T>(JSON.stringify(raw))` 官方路径还原
- **强类型 UTS** - 配置字段 `| null` 空安全兜底，错误码字面量联合类型；全端同构无平台目录端，一套源码走遍 uni-app x

## 安装

**npm**——安装后将包内容同步到工程 `uni_modules/ux-storage/`（编译器不扫描 node_modules）：

```bash
pnpm add @meng-xi/unix-storage
mkdir -p uni_modules && cp -R node_modules/@meng-xi/unix-storage uni_modules/ux-storage
```

> `packages/core` 为标准 **uni_modules UTS 插件**（`utssdk/` 官方目录结构 + `interface.uts` 对外声明），业务侧从 `@/uni_modules/ux-storage` 导入。

## 快速开始

### 1. 默认实例开箱即用

```uts
import { set, get, configureStorage } from '@/uni_modules/ux-storage'
import type { StorageDefaults } from '@/uni_modules/ux-storage'

// 项目启动时配置一次全局默认（如 App.uvue onLaunch；null 表示沿用内置默认）
configureStorage({
	keyPrefix: null, // null 沿用内置默认 'mx_storage:'
	defaultTTL: null // null 永不过期
} as StorageDefaults)

// TTL 1 小时；null = 永不过期（或沿用实例 defaultTTL）
await set('token', { value: 'xxx' } as TokenInfo, 3600_000)

// 未命中 / 已过期返回 null，不 reject
const token = await get('token')

// 类型还原（UTSJSONObject 读回，官方路径）
const restored = JSON.parse<TokenInfo>(JSON.stringify(token))
```

### 2. TTL 与清理

```uts
import { set, get, remove, clearExpired } from '@/uni_modules/ux-storage'

await set('session', data, 60_000) // 60 秒过期
await get('session') // 过期：惰性移除并返回 null

const count = await clearExpired() // 全量扫描，返回清理条数
await remove('session') // 移除指定 key
```

### 3. 命名空间与多实例

```uts
import { keys, clear, createStorage } from '@/uni_modules/ux-storage'
import type { StorageDefaults } from '@/uni_modules/ux-storage'

await keys() // 本命名空间 key（剥前缀后返回原始 key）
await clear() // 仅清理本命名空间，不触碰其他数据

// 多实例隔离（前缀 / defaultTTL 独立）
const cacheStore = createStorage({ keyPrefix: 'api_cache:', defaultTTL: 300_000 } as StorageDefaults)
await cacheStore.set('user:1', user, null)
```

### 4. 统一错误处理

```uts
import { set } from '@/uni_modules/ux-storage'
import type { StorageError } from '@/uni_modules/ux-storage'

set('', data, null).catch((err) => {
	const e = err as StorageError
	// e.code: 'ERR_PARAM'（key 为空 / keyPrefix 保留前缀）| 'ERR_NATIVE'（原生失败）
	// e.errSubject 固定 'unix-storage'；e.nativeErrCode 原生 errCode 原值透传；e.key 关联业务原始 key
})
```

### 运行效果

仓库自带示例工程 [packages/playground](https://github.com/MengXi-Studio/unix-storage/tree/master/packages/playground)，首页按功能分组导航至六个验证页（基础存取 / TTL / 前缀命名空间与多实例 / 全局配置 / clearExpired / 错误路径），各页进入后自动运行并以 `[verify]` 前缀输出日志，Web 端 22 项全部通过。示例工程为纯 HBuilderX 工程，用 HBuilderX 打开 `packages/playground` 即可发行 Web / 微信小程序 / Android（云打包），复验同一组用例。

**Android 真机体验**：[下载体验 App（APK）](https://mp-b8b8347a-48e9-434d-8302-3e9d99c2cb01.cdn.bspapp.com/cloudstorage/app-build-pkg/1792204322368-__UNI__948428E_1792204316091.apk)——上述示例工程的云打包产物，安装后即可在真机运行全部用例。

## 交流与支持

想了解设计思路与实现原理（record 包裹与惰性过期、命名空间实现、UTS 跨语言编译红线等）？公众号「**梦曦工作室**」有系列解析，扫码关注：

<p align="center">
  <img alt="微信公众号 二维码" width="180" src="https://github.com/MengXi-Studio/unix-storage/blob/master/packages/docs/src/public/QR_code.jpg">
</p>

- 📖 [完整文档](https://mengxi-studio.github.io/unix-storage/)（指南 + API 参考 + 更新日志，中英双语）
- 🐛 [Issues](https://github.com/MengXi-Studio/unix-storage/issues) / 💬 [Discussions](https://github.com/MengXi-Studio/unix-storage/discussions)

## 导出

- API：`set` / `get` / `remove` / `clear` / `info` / `keys` / `clearExpired` / `configureStorage` / `createStorage`
- 常量：`DEFAULT_KEY_PREFIX` / `STORAGE_ERR_SUBJECT`
- 类型：`StorageErrorCode` / `StorageError` / `StorageDefaults` / `StorageInfo` / `StorageInstance` / `ConfigureStorage` / `CreateStorage`

## 文档

📖 从入门到精通的完整文档（指南 + API 参考 + 更新日志）：

**[https://mengxi-studio.github.io/unix-storage/](https://mengxi-studio.github.io/unix-storage/)**

阅读建议：先看[介绍](https://mengxi-studio.github.io/unix-storage/guide/introduction.html)与[快速开始](https://mengxi-studio.github.io/unix-storage/guide/getting-started.html)，再按
[基础用法](https://mengxi-studio.github.io/unix-storage/guide/basic-usage.html) → [TTL 过期管理](https://mengxi-studio.github.io/unix-storage/guide/ttl.html) → [命名空间与多实例](https://mengxi-studio.github.io/unix-storage/guide/namespace.html) →
[错误处理](https://mengxi-studio.github.io/unix-storage/guide/error-handling.html) 深入核心链路，API 细节查 [API 参考](https://mengxi-studio.github.io/unix-storage/api/functions.html)。

## 更新日志

📝 **[https://github.com/MengXi-Studio/unix-storage/blob/master/packages/docs/src/changelog.md](https://github.com/MengXi-Studio/unix-storage/blob/master/packages/docs/src/changelog.md)**

## License

[MIT](./license.md)
