# 参与贡献

感谢关注 Unix Architecture！本模板以 MIT 协议开源，欢迎 Issue 反馈与 PR 贡献。

## 环境准备

- HBuilderX **5.34+**（uni-app x 编译器随 HBuilderX 分发）
- Git
- Node.js 20+ 与 pnpm（仅文档站构建需要）

## 开发流程

1. Fork 并克隆仓库，从 `master` 拉出功能分支（命名 `feature/<名称>`）；
2. 按[快速开始](./getting-started)配置并运行（后端未就绪时用 mock 协议联调）；
3. 完成开发后提交 Pull Request 到 `master`。

## 代码贡献约定

模板的全部工程约束见[架构设计](./architecture)与[工程约定](./conventions)，提交前请重点自查：

- **分层调用链**：页面 → composable → store → api → utils/request，页面不直连网络层；
- **UTS 红线**：每一条都对应真实编译错误或运行时崩溃，写码前必读；
- **验证 DoD**：改动 api / stores / composables 后必须编译验证；涉及交互的必须浏览器走通对应链路并核对请求日志；
- **不破坏模板纯净度**：docs/ 与 .trae/ 为可整体删除的独立目录，业务代码不得反向依赖。

## 文档贡献

文档站位于 `docs/`（VitePress），本地开发：

```bash
cd docs
pnpm install
pnpm run dev      # 本地预览
pnpm run build    # 构建验证
```

注意事项：

- **双语同步**：改动中文页面（`src/`）时请同步更新英文侧（`src/en/`）同名页面，两侧侧边栏条目在 `.vitepress/config/{zh,en}.ts` 维护；
- **正文避免裸 ASCII 尖括号**（如 `<token>`）——会被 Vue 模板编译器当 HTML 标签导致构建失败，放入行内代码或改写；
- 站点资产放 `src/public/`（publicDir 相对 srcDir 解析）。

## 提交规范

- Commit message：`<type>: 中文描述`，type 取 `feat` / `fix` / `docs` / `refactor` 等；
- 用户可感知的变更需同步更新根 [CHANGELOG.md](https://github.com/MengXi-Studio/unix-architecture/blob/master/CHANGELOG.md)（Keep a Changelog 风格：Added / Changed / Fixed / Verified）；
- 一次 PR 聚焦一件事，保持最小必要改动。

## AI 协作贡献

本模板内置 AI 辅助开发体系（见 [AI 辅助开发](./ai-collab)）。使用 AI 工具生成的代码**同样受架构红线约束**——规则文件在 `.trae/rules/`，贡献前请确认生成代码未绕过分层、未踩 UTS 红线清单中的坑。

## 问题反馈

- Bug 与功能建议：[Issues](https://github.com/MengXi-Studio/unix-architecture/issues)——请附 HBuilderX 版本、运行端（Web / Android）与最小复现步骤；
- 使用问题优先查阅[常见问题](./faq)与各指南页。
