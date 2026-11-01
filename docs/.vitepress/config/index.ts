import { defineConfig } from 'vitepress'
import { sharedConfig } from './shared'
import { zhConfig } from './zh'
import { enConfig } from './en'

export default defineConfig({
	...sharedConfig,

	/** 网站部署基础路径（CI 经 DOCS_BASE 环境变量注入，本地默认 /unix-architecture/） */
	base: process.env.DOCS_BASE || '/unix-architecture/',

	/** 文档源目录 */
	srcDir: './src',

	/** 网站支持的语言：中文为默认（root），英语为 /en/ */
	locales: {
		root: { label: '简体中文', lang: 'zh-CN', link: '/', ...zhConfig },
		en: { label: 'English', lang: 'en-US', link: '/en/', ...enConfig }
	}
})
