# 实施记录索引（Implementation Log）

> 由 `.trae/rules/workflow.md` 第四步维护：实施记录的**主体**在各任务文档（`.trae/documents/<域名>-<功能名>.md` 的「实施记录」章节），本文件只做汇总索引——每次任务完成后追加一行。
> 只追加不改写；最新在最上。

<!-- 行格式
- [YYYY-MM-DD] [任务文档](相对链接) — <一句话结果；遗留 TODO 数>
-->

- [2026-11-01] [docs-文档站](新增/2026-11-01/docs-文档站.md) — VitePress 双语文档站上线并参照 unix-storage docs 重构（config 拆分 zh/en、自定义主题徽章、en 全量十页、public 资产 404 修复），部署走 ci-core deploy-docs dispatch；遗留 TODO：feature/UI 合并后需无 ref 重触发同步正式站
- [2026-11-01] [uts插件-发行打包proxy修复](修复/2026-11-01/uts插件-发行打包proxy修复.md) — 5.34 打包流水线对入口导出字符串常量生成非法 JS，9 个无消费方常量去导出，5 插件 proxy esbuild 验证通过；遗留 TODO 无（上游仓库需同步）
- [2026-11-01] [stores-ux-pinia迁移](优化/2026-11-01/stores-ux-pinia迁移.md) — ux-pinia 0.2.0 破坏性迁移（store class 化）+ ux-router 0.8.2 backFallback 接入，E2E 登录闭环验证通过；遗留 TODO 无
