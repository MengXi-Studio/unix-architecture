**中文** | [English](./README-en.md)

<div align="center">
  <a href="https://github.com/MengXi-Studio/unix-request">
    <img alt="梦曦工作室 Logo" width="215" src="https://github.com/MengXi-Studio/unix-request/blob/master/packages/docs/src/public/logo.png">
  </a>
  <a href="https://github.com/MengXi-Studio/unix-request">
    <img alt="微信公众号 二维码" width="215" src="https://github.com/MengXi-Studio/unix-request/blob/master/packages/docs/src/public/QR_code.jpg">
  </a>
  <br>
  <h1>@meng-xi/unix-request</h1>
  <p>为 uni-app x 提供功能完善的网络请求库（UTS 编写，一套 API 多端覆盖）</p>

[![license](https://img.shields.io/github/license/MengXi-Studio/unix-request.svg)](LICENSE) [![npm](https://img.shields.io/npm/v/@meng-xi/unix-request?color=blue)](https://www.npmjs.com/package/@meng-xi/unix-request)
![npm](https://img.shields.io/npm/dt/@meng-xi/unix-request?color=green)

</div>

## 为什么是 unix-request

直接用 `uni.request` 写业务，URL 拼接、header 合并、超时与取消、五花八门的失败形态……每一项都要自己封装，换个项目再封装一遍。unix-request 把这些重复劳动收敛成一套库：

- **写过 axios？** 拦截器、transform、取消、错误码心智完全对齐，看一眼 API 就能上手；
- **多端发布？** Web / 微信小程序 / Android 一套代码，URL 编码与错误分类由库内确定性实现，不用逐端排查差异；
- **在意类型？** `request<T>` 泛型响应、字面量联合错误码，UTS / TypeScript 提示全量到位。

底层唯一依赖 `uni.request`，不重造网络栈；UTS 源码分发（Web / 小程序 → JS，Android → Kotlin，iOS → Swift），由 uni-app x 编译链现场编译。

## 特性

- **axios 心智，开箱即用** - `request` 主入口 + `get` / `post` / `put` / `patch` / `del` / `head` / `options` 七种快捷方法（method 由方法名固定注入），默认实例即用，`createRequest` 多实例隔离
- **统一可预测的错误体系** - `RequestError` 收敛 8 类错误码（参数 / 配置 / 取消 / 超时 / 网络 / 4xx / 5xx / 原生失败），原生 `errCode` 原值透传，`config` 与 `response` 原文挂载
- **泛型静态标注** - `request<T>` 返回 `Promise<ResponseResult<T>>`，`res.data` 类型直达，UTS / TS 双端友好
- **确定性 URL 与参数处理** - `baseURL` 自动拼接、`params` 与 url 既有 query 合并统一编码、GET/HEAD 请求体自动并入 query、header 三级浅合并（内置默认 → 实例默认 → 请求级）
- **请求拦截器与响应拦截器** - 多枚有序注册、可 eject；响应错误链支持恢复 / 换错 / 放行三条路径
- **请求取消** - `createCancelSource()` 创建取消源，确定性 abort 关联的全部进行中请求，以 `ERR_CANCELED` 可辨识地 reject
- **强类型 UTS** - 除 `url` 外全部可选字段 + 空安全兜底，`method` / 错误码为字面量联合类型；`onTask` 逃生舱透出原生 `RequestTask`，原生能力参数全量透传不抹平

## 安装

**npm**——安装后将包内容同步到工程 `uni_modules/mx-request/`（编译器不扫描 node_modules）：

```bash
pnpm add @meng-xi/unix-request
mkdir -p uni_modules && cp -R node_modules/@meng-xi/unix-request uni_modules/mx-request
```

> `packages/core` 为标准 **uni_modules UTS 插件**（`utssdk/` 官方目录结构 + `interface.uts` 对外声明），业务侧从 `@/uni_modules/mx-request` 导入。

## 快速开始

### 1. 发出第一个请求

```uts
import { request, configureRequest } from '@/uni_modules/mx-request'
import type { RequestError } from '@/uni_modules/mx-request'

// 项目启动时配置一次全局默认（如 App.uvue onLaunch；null 表示沿用内置默认）
configureRequest({
	baseURL: 'https://your.api',
	timeout: 10000,
	header: null,
	validateStatus: null
})

// 发请求：泛型标注 res.data 类型
request<UTSJSONObject>({
	url: '/api/http/method/get', // 相对路径自动拼接 baseURL
	method: 'GET',
	params: { page: 1 } as UTSJSONObject // 库内确定性编码拼入 query
}).then((res) => {
	console.log('statusCode=' + res.statusCode.toString()) // 200
	console.log(res.data)
}).catch((err) => {
	const e = err as RequestError
	console.log(e.code, e.errMsg)
})
```

### 2. 七种快捷方法

```uts
import { get, post } from '@/uni_modules/mx-request'

// GET：method 由方法名固定注入，快捷配置不含 url 字段
get<UTSJSONObject>('/api/http/method/get', {
	params: { page: 1 } as UTSJSONObject
}).then((res) => {
	console.log(res.statusCode)
})

// POST：data 支持对象自动序列化
post<UTSJSONObject>('/login', { user: 'demo' } as UTSJSONObject, null).then((res) => {
	console.log(res.data)
})
```

### 3. 统一错误处理

```uts
import { request } from '@/uni_modules/mx-request'
import type { RequestError } from '@/uni_modules/mx-request'

request<UTSJSONObject>({ url: '/may-fail' }).catch((err) => {
	const e = err as RequestError
	if (e.code == 'ERR_CANCELED') {
		// 主动取消（createCancelSource 的 reason 在 e.errMsg 中）
	} else if (e.code == 'ERR_TIMEOUT') {
		// 超时（原生 errCode 5 经 e.nativeErrCode 原值透传）
	} else if (e.code == 'ERR_BAD_REQUEST') {
		// HTTP 4xx：e.statusCode + e.response 携带响应原文
	} else {
		// 其余：ERR_PARAM / ERR_CONFIG / ERR_NETWORK / ERR_BAD_RESPONSE / ERR_NATIVE
	}
})
```

### 运行效果

截图来自仓库自带的示例工程 [packages/playground](https://github.com/MengXi-Studio/unix-request/tree/master/packages/playground)（11 个功能页覆盖全部特性的可运行验证矩阵，H5 / 小程序 / Android 三端可跑）：

<p align="center">
  <img alt="七种 method 真实请求全部 statusCode=200" width="720" src="https://github.com/MengXi-Studio/unix-request/blob/master/packages/docs/src/public/screenshot-methods.png">
</p>

**Android 真机体验**：[下载体验 App（APK）](https://mp-b8b8347a-48e9-434d-8302-3e9d99c2cb01.cdn.bspapp.com/cloudstorage/app-build-pkg/1791810317449-__UNI__1927897_1791810302753.apk)——上述示例工程的云打包产物，安装后即可在真机运行全部用例。

## 交流与支持

想了解设计思路与实现原理（UTS 泛型跨端、错误体系收敛、取消的确定性 abort 等）？公众号「**梦曦工作室**」有系列解析，扫码关注：

<p align="center">
  <img alt="微信公众号 二维码" width="180" src="https://github.com/MengXi-Studio/unix-request/blob/master/packages/docs/src/public/QR_code.jpg">
</p>

- 📖 [完整文档](https://mengxi-studio.github.io/unix-request/)（指南 + API 参考 + 更新日志，中英双语）
- 🐛 [Issues](https://github.com/MengXi-Studio/unix-request/issues) / 💬 [Discussions](https://github.com/MengXi-Studio/unix-request/discussions)

## 导出

- API：`request` / `get` / `post` / `put` / `patch` / `del` / `head` / `options` / `getUri` / `useRequestInterceptor` / `useResponseInterceptor` / `ejectInterceptor` / `configureRequest` / `createRequest` /
  `createCancelSource`
- 常量：`DEFAULT_TIMEOUT` / `DEFAULT_METHOD` / `REQUEST_ERR_SUBJECT`
- 类型：`RequestConfig` / `RequestQuickConfig` / `RequestDefaults` / `ResponseResult` / `ResponseAny` / `RequestError` / `RequestErrorCode` / `RequestInstance` / `RequestMethod` / `CancelToken` / `CancelSource`

## 文档

📖 从入门到精通的完整文档（指南 + API 参考 + 更新日志）：

**[https://mengxi-studio.github.io/unix-request/](https://mengxi-studio.github.io/unix-request/)**

阅读建议：先看[介绍](https://mengxi-studio.github.io/unix-request/guide/introduction.html)与[快速开始](https://mengxi-studio.github.io/unix-request/guide/getting-started.html)，再按
[发起请求](https://mengxi-studio.github.io/unix-request/guide/requests.html) → [拦截器](https://mengxi-studio.github.io/unix-request/guide/interceptors.html) →
[错误处理](https://mengxi-studio.github.io/unix-request/guide/error-handling.html) 深入核心链路，API 细节查 [API 参考](https://mengxi-studio.github.io/unix-request/api/request.html)。

## 更新日志

📝 **[https://github.com/MengXi-Studio/unix-request/blob/master/packages/docs/src/changelog.md](https://github.com/MengXi-Studio/unix-request/blob/master/packages/docs/src/changelog.md)**

## License

[MIT](LICENSE)
