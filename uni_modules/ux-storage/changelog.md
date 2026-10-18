## 0.1.0（2026-10-17）
首个可用版本。

### 新增

- **Promise 化 API**：`set` / `get` / `remove` / `clear` / `info` / `keys` / `clearExpired` 全量 async/await，统一 `StorageError` reject（`errSubject` 固定 `unix-storage`，原生 `errCode` 经 `nativeErrCode` 原值透传）
- **TTL 过期管理**：`set(key, data, ttl)` 毫秒级过期；读取惰性判断（过期即移除并返回 `null`，不 reject）；`clearExpired()` 全量扫描返回清理条数；TTL 三级回退（调用级 `ttl` → 实例 `defaultTTL` → 内置永不过期）
- **key 前缀命名空间**：默认前缀 `mx_storage:`（规避 `uni-` / `dcloud_` 平台保留前缀）；`keys()` 剥前缀返回原始 key；`clear()` 仅清理本命名空间，不触碰其他数据；非法保留前缀在操作期以 `ERR_PARAM` 拦截
- **多实例**：`createStorage(defaults)` 创建前缀 / TTL 隔离的实例（心智对标 `axios.create`）；`configureStorage` 配置默认实例全局默认；默认实例开箱即用
- **兼容策略**：读到非本库写入格式的数据按「无过期」原样返回，不报错不误删
- **平台支持**：Web 端全功能验证通过；Android 云打包 release 编译零错误（Kotlin 编译链打通），真机用例验证待进行；iOS / 鸿蒙 / 小程序代码全端同构，受环境限制待实测
