import { defineConfig } from 'vitepress'

/**
 * 文档站配置（中文先行）
 * 双语扩展时对齐 unix-pinia docs 模式拆分为 config/{index, shared, zh, en}.ts。
 * base 与 GitHub Pages 路径一致：https://mengxi-studio.github.io/unix-architecture/
 */
export default defineConfig({
	lang: 'zh-CN',
	title: 'Unix Architecture',
	description: 'uni-app x 工程架构模板：api / store / router / 类型体系全分层落地',
	base: '/unix-architecture/',
	srcDir: 'src',
	lastUpdated: true,

	markdown: {
		theme: {
			dark: 'one-dark-pro',
			light: 'github-light'
		},
		// UTS 按 TypeScript 高亮
		languageAlias: { uts: 'typescript' }
	},

	head: [['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }]],

	themeConfig: {
		logo: { src: '/logo.png', alt: 'Unix Architecture' },

		localSearch: {
			options: {
				translations: {
					button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
					modal: {
						noResultsText: '未找到相关结果',
						resetButtonTitle: '清除查询条件',
						footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
					}
				}
			}
		},

		socialLinks: [{ icon: 'github', link: 'https://github.com/MengXi-Studio/unix-architecture' }],

		footer: {
			copyright: 'Copyright © 2026-present 梦曦工作室',
			message: 'Released under the MIT License.'
		},

		sidebar: [
			{
				text: '指南',
				items: [
					{ text: '介绍', link: '/guide/introduction' },
					{ text: '快速开始', link: '/guide/getting-started' },
					{ text: '架构设计', link: '/guide/architecture' },
					{ text: '工程约定', link: '/guide/conventions' },
					{ text: '鉴权与守卫', link: '/guide/auth' },
					{ text: 'UI 组件库', link: '/guide/ui' },
					{ text: 'AI 辅助开发', link: '/guide/ai-collab' },
					{ text: '常见问题', link: '/guide/faq' }
				]
			},
			{ text: '更新日志', link: '/changelog' }
		],

		outline: { level: [2, 3], label: '本页目录' },
		docFooter: { prev: '上一篇', next: '下一篇' },
		returnToTopLabel: '回到顶部',
		darkModeSwitchLabel: '外观',
		lightModeSwitchTitle: '切换到浅色模式',
		darkModeSwitchTitle: '切换到深色模式'
	}
})
