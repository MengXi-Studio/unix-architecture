import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const META_URL = 'https://mengxi-studio.github.io/unix-architecture/'
export const META_TITLE = 'Unix Architecture'
export const META_DESCRIPTION = 'uni-app x 工程架构模板：api / store / router / 类型体系全分层落地'

export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
	/** 网站配置 描述 */
	description: META_DESCRIPTION,

	/** 网站配置 头信息 */
	head: [
		['meta', { property: 'og:url', content: META_URL }],
		['meta', { property: 'og:description', content: META_DESCRIPTION }],
		['meta', { property: 'twitter:url', content: META_URL }],
		['meta', { property: 'twitter:title', content: META_TITLE }],
		['meta', { property: 'twitter:description', content: META_DESCRIPTION }]
	],

	/** 网站主题配置 */
	themeConfig: {
		/** 编辑链接 */
		editLink: {
			pattern: 'https://github.com/MengXi-Studio/unix-architecture/edit/master/docs/:path',
			text: '对本页提出修改建议'
		},

		/** 大纲标题 */
		outlineTitle: '本页内容',

		/** 本页大纲层级 */
		outline: { level: [2, 3], label: '本页目录' },

		/** 文档页脚文案 */
		docFooter: { prev: '上一篇', next: '下一篇' },
		returnToTopLabel: '回到顶部',
		darkModeSwitchLabel: '外观',
		lightModeSwitchTitle: '切换到浅色模式',
		darkModeSwitchTitle: '切换到深色模式',

		/** 导航栏 */
		nav: [
			{ text: '指南', link: '/guide/introduction' },
			{ text: '更新日志', link: '/changelog' },
			{
				text: '相关链接',
				items: [
					{ text: 'GitHub 仓库', link: 'https://github.com/MengXi-Studio/unix-architecture' },
					{ text: 'm-ui-x 文档', link: 'https://mengxi-studio.github.io/unix-ui/' },
					{ text: 'unix-pinia 文档', link: 'https://mengxi-studio.github.io/unix-pinia/' }
				]
			}
		],

		/** 侧边栏（按学习路径分组） */
		sidebar: {
			'/guide/': [
				{
					text: '入门',
					items: [
						{ text: '介绍', link: '/guide/introduction' },
						{ text: '快速开始', link: '/guide/getting-started' }
					]
				},
				{
					text: '架构',
					items: [
						{ text: '架构设计', link: '/guide/architecture' },
						{ text: '工程约定', link: '/guide/conventions' }
					]
				},
				{
					text: '进阶',
					items: [
						{ text: '鉴权与守卫', link: '/guide/auth' },
						{ text: 'UI 组件库', link: '/guide/ui' }
					]
				},
				{
					text: '精通',
					items: [
						{ text: 'AI 辅助开发', link: '/guide/ai-collab' },
						{ text: '常见问题', link: '/guide/faq' },
						{ text: '参与贡献', link: '/guide/contributing' }
					]
				}
			]
		}
	}
}
