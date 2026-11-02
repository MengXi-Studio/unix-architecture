import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const META_URL = 'https://mengxi-studio.github.io/unix-architecture/en/'
export const META_TITLE = 'Unix Architecture'
export const META_DESCRIPTION =
	'An engineering architecture template for uni-app x: full-layer api / store / router / type system'

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
	/** 网站配置 描述 */
	description: META_DESCRIPTION,

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
			text: 'Suggest changes to this page'
		},

		/** 大纲标题 */
		outlineTitle: 'Contents of this page',

		/** 本地搜索（英文默认，覆盖 shared 的中文翻译） */
		search: {
			provider: 'local'
		},

		/** 导航栏 */
		nav: [
			{ text: 'Guide', link: '/en/guide/introduction' },
			{ text: 'Changelog', link: '/en/changelog' },
			{
				text: 'Links',
				items: [
					{ text: 'Discussions', link: 'https://github.com/MengXi-Studio/unix-architecture/discussions' },
					{ text: 'Releases', link: 'https://github.com/MengXi-Studio/unix-architecture/releases' },
					{ text: 'ux-router Docs', link: 'https://mengxi-studio.github.io/unix-router/' },
					{ text: 'ux-pinia Docs', link: 'https://mengxi-studio.github.io/unix-pinia/' },
					{ text: 'mx-request Docs', link: 'https://mengxi-studio.github.io/unix-request/' },
					{ text: 'ux-storage Docs', link: 'https://mengxi-studio.github.io/unix-storage/' },
					{ text: 'ux-utils Docs', link: 'https://mengxi-studio.github.io/unix-utils/' },
					{ text: 'm-ui-x Docs', link: 'https://mengxi-studio.github.io/unix-ui/' }
				]
			}
		],

		/** 侧边栏（按学习路径分组） */
		sidebar: {
			'/en/guide/': [
				{
					text: 'Getting Started',
					items: [
						{ text: 'Introduction', link: '/en/guide/introduction' },
						{ text: 'Quick Start', link: '/en/guide/getting-started' }
					]
				},
				{
					text: 'Architecture',
					items: [
						{ text: 'Architecture', link: '/en/guide/architecture' },
						{ text: 'Conventions', link: '/en/guide/conventions' }
					]
				},
				{
					text: 'Advanced',
					items: [
						{ text: 'Auth & Guards', link: '/en/guide/auth' },
						{ text: 'UI Components', link: '/en/guide/ui' }
					]
				},
				{
					text: 'Mastery',
					items: [
						{ text: 'AI-Assisted Development', link: '/en/guide/ai-collab' },
						{ text: 'FAQ', link: '/en/guide/faq' },
						{ text: 'Contributing', link: '/en/guide/contributing' }
					]
				}
			]
		}
	}
}
