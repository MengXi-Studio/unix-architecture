## 0.1.0（2026-10-13）
首个可用版本。

### 新增

- **请求主入口 + 七种快捷方法**：`request` 主入口 + `get` / `post` / `put` / `patch` / `del` / `head` / `options` 快捷方法（method 由方法名固定注入，`delete` 为 UTS 保留字故命名 `del`）；泛型 `request<T>` 静态标注
  `res.data` 类型，UTS / TypeScript 提示全量到位
- **默认实例 + 多实例**：默认实例开箱即用，`configureRequest` 配置全局默认；`createRequest(defaults)` 创建隔离实例（defaults 与拦截器注册表互不影响），心智对标 `axios.create`
- **请求 / 响应拦截器**：多枚有序注册、可 `ejectInterceptor(id)` 移除；响应错误链支持恢复（返回响应）/ 换错（返回新错误）/ 放行（返回 `null`）三条路径，语义对标 axios
- **统一可预测的错误结构**：`RequestError` 收敛 8 类错误码（`ERR_PARAM` / `ERR_CONFIG` / `ERR_CANCELED` / `ERR_TIMEOUT` / `ERR_NETWORK` / `ERR_BAD_REQUEST` / `ERR_BAD_RESPONSE` / `ERR_NATIVE`），原生 `errCode` 经
  `nativeErrCode` 原值透传不翻译，`config` 与 `response` 原文挂载——4xx/5xx 响应体不丢失
- **确定性 URL 与参数处理**：`baseURL` 自动拼接（http(s) 开头原样使用）、`params` 与 url 既有 query 合并后由库内统一编码（`encodeURIComponent` + JSON 序列化兜底）、GET/HEAD 的 `UTSJSONObject`
  请求体自动并入 query、header 三级浅合并（内置默认 → 实例默认 → 请求级）
- **transform / validateStatus / timeout**：`transformRequest` / `transformResponse` 请求与响应数据变换（GET/HEAD 场景 transformRequest 收到 `null`，需判空）、`validateStatus` 自定义状态码校验（默认 2xx，传 `null`
  沿用内置默认）、`timeout` 超时控制
- **请求取消**：`createCancelSource()` 创建取消源，离开页面等场景确定性 abort 关联的全部进行中请求，以 `ERR_CANCELED` 可辨识地 reject（reason 在 `errMsg` 中）
- **逃生舱**：`onTask` 透出原生 `RequestTask`（chunked 分块监听等高级场景）；`enableQuic` / `sslVerify` / `withCredentials` / `enableChunked` 等原生能力参数全量透传不抹平
- **平台支持**：Web / 微信小程序 / Android 三端编译验证通过，Web 端 15 项真实网络测试矩阵全部通过（iOS / 鸿蒙代码已适配，受环境限制暂未实测）
