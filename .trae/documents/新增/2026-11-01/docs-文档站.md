# docs 文档站 实施方案

## 需求

用户：此架构怎么做一个 docs 文档项目，告诉使用者怎么使用。经确认采用方案 A——`docs/` 进模板仓库（纯内容 + VitePress 配置，无 workflow），部署走 ci-core 扩展 dispatch（推 gh-pages 分支），对齐工作室既有 VitePress 文档模式（unix-pinia / unix-ui）。

## 需求分析

- 工具链：VitePress ^1.6.3（与 unix-pinia docs 同版本），中文先行（双语目录结构后续扩展，对齐 unix-pinia 的 en/ 模式）。
- 部署：GitHub Pages（base=/unix-architecture/），源为 gh-pages 分支；触发经 ci-core `repository_dispatch`（type: `deploy-docs`），业务仓库保持零工作流。
- 内容：README 各节迁移为 guide 体系（introduction / getting-started / architecture / conventions / auth / ui / ai-collab / faq）+ changelog 镜像。
- 模板纯净度：docs/ 为可整体删除的独立文件夹（自含 package.json，无根依赖污染）。

## 伪代码设计

```
docs/
├── package.json            # vitepress ^1.6.3 devDep（对齐 unix-pinia）
├── public/logo.png         # 站点 logo
├── .vitepress/config.mts   # base=/unix-architecture/、uts→typescript 高亮、本地搜索
└── src/
    ├── index.md            # hero + 特性
    ├── guide/…（8 篇）
    └── changelog.md        # 与根 CHANGELOG 同步
```

部署链路（ci-core）：`repository_dispatch(deploy-docs)` → checkout → node/pnpm → `npm ci && npm run build`（base 已含）→ push 构建产物到目标仓库 gh-pages 分支。

## 疑问清单

（无——承载与部署方案已由用户确认，内容源为 README 既有结论）

## 实施记录

- **方案落地形态**：与伪代码设计一致。`docs/` VitePress 站点（package.json + config.mts + src 十页 + public/logo.png 复用自 static/），`.gitignore` 补 dist/cache/node_modules 忽略；`srcDir: 'src'` 首次构建缺失已补（否则页面挂 /src/ 路径与侧边栏错位）。
- **部署链路（ci-core 扩展，经用户确认）**：`deploy-docs.yml`（repository_dispatch: deploy-docs，payload: repo / ref / docs_dir）→ checkout 目标仓库 ref → npm install + vitepress build → peaceiris 推 gh-pages 分支（force_orphan）。调试中修复两处：① 首次触发失败因 docs/ 未提交推送（工作流检出的是远端）；② peaceiris 默认取 GITHUB_REPOSITORY 误指 ci-core 自身（403），补 `external_repository` 指向目标仓库。Pages 源配置已就位（legacy / gh-pages / /）。
- **变更文件清单**：`docs/**`（14 个文件）、`.gitignore`；ci-core：`.github/workflows/deploy-docs.yml` + `README.md`（两个提交：d291e56、162176d、61942c4）。
- **验证方式与结果**：本地 `pnpm --dir docs run build` 成功（dist 结构验证：index.html + guide 八页 + changelog）；ci-core run 41307915198 成功（feature/UI 分支部署）；线上 `https://mengxi-studio.github.io/unix-architecture/` HTTP 200 且内容含站点标题。
- **遗留 TODO**：① 当前线上文档部署自 `feature/UI` 分支——feature/UI 合并回 master 后需**无 ref 重新触发一次**使正式站与 master 同步；② 双语（en/ 目录）后续按需扩展（对齐 unix-pinia docs 模式）；③ 文档内容与代码演进需同步维护（约定变更时联动）。

## 第二轮：参照 unix-storage docs 结构重构（2026-11-01）

- **需求**：用户要求参照 `unix-storage/packages/docs` 重构文档站，确认**全量双语**（en/ 十页完整翻译）。
- **结构重构**：`config.mts` 拆分为 `config/{index,shared,zh,en}.ts`（root=zh-CN、/en/=en-US，`DOCS_BASE` 环境变量可注入 base）；新增 `theme/index.ts` + `theme/components/HomeBadges.vue`（hero 下方 GitHub release/stars/license/HBuilderX 徽章）；侧边栏按学习路径分组（入门/架构/进阶/精通）；zh/en 各自 nav、editLink（指向 master 分支 docs/ 路径）、outline 与文档页脚汉化。
- **资产修复**：发现 publicDir 默认相对 srcDir（`src/public`）——v1 资产放在 `docs/public` 从未进 dist，线上 favicon/logo 一直 404。已移至 `docs/src/public/`（logo.png + 补齐工作室通用 logo.svg / favicon.ico，复制自 unix-pinia docs），hero 首页 logo.svg 引用随之生效。
- **双语内容**：`src/en/` 全量翻译十页（index + 8 guide + changelog）；踩坑两处：Vue 模板编译器把 md 表格/正文里的 ASCII 尖括号当 HTML 标签（`<token>`、`<username>` 导致 "Element is missing end tag"，zh 版 `<用户名>` 因非 ASCII 不触发）——已改写去除尖括号。
- **验证**：`pnpm --dir docs run build` 成功，dist 含 zh 10 页 + en 10 页 + 404 + logo.svg/favicon.ico；部署经 ci-core deploy-docs dispatch（ref=feature/UI）后线上核验 / 与 /en/ 均 200。
- **遗留 TODO**：同上轮 ①（合并后无 ref 重触发）与 ③（内容随代码演进同步）。
