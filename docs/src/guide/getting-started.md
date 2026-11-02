# 快速开始

## 环境要求

- HBuilderX **5.34+**（uni-app x 编译器随 HBuilderX 分发）
- Git

## 1. 获取模板

```bash
git clone https://github.com/MengXi-Studio/unix-architecture.git
```

## 2. 配置后端地址

全局唯一配置源在 `config/index.uts`，接真实后端只需替换 `baseURL` 一处：

```uts
export const settings: AppSettings = {
  appName: 'unix-architecture',
  baseURL: 'https://your-api.example.com',  // ← 改这里
  timeout: 15000
}
```

## 3. 本地联调（可选）

后端未就绪时可用任意 mock 服务，协议约定：

| 接口 | 方法 | 响应 |
| --- | --- | --- |
| `/user/login` | POST | `{ token }` |
| `/user/info` | GET | `{ name, avatar }`（需 `Authorization: Bearer token` 头，否则 401） |
| `/user/logout` | POST | 任意 |

注意 CORS 需放行 `Authorization` 头。

## 4. 运行

在 HBuilderX 中将项目**运行到浏览器**即可；也可用 HBuilderX CLI：

```powershell
D:\HBuilderX\cli.exe launch web --project <项目绝对路径>
# 运行日志
D:\HBuilderX\cli.exe logcat web --project <项目绝对路径> --mode lastBuild
```

## 5. 自测登录闭环

- 冷启动访问任意页面 → 无 token 时自动重定向登录页；
- 登录页已预填 `admin / 123456`，点击「登录」→ 跳转首页，显示「欢迎，<用户名>」；
- 首页点击「退出登录」→ 确认弹窗 → 回到登录页。

走通即代表网络层（token 注入）、状态层（class store）、路由层（守卫链）全链路正常。

## 6. 新增一个业务页面

三个动作缺一不可：

1. 建页面文件 `pages/<name>/<name>.uvue`（组合式 API）；
2. 页内声明编译宏 `defineUniPage({ name: '<name>', title: '页面标题' })`——路由表与 pages.json 由 vite 插件自动生成，**人手不碰**；
3. 页面数据按调用链取用：页面 → composable（横切 UI 状态）→ store（业务状态）→ api（DTO）→ utils/request。

守卫语义：新页面**默认要求登录**（白名单制）；免登录页面必须在 `router/permission.uts` 的 `whiteList` 登记。

## 下一步

- [架构设计](./architecture)：理解分层与调用链；
- [工程约定](./conventions)：类型组织与 UTS 红线，写代码前必读。
