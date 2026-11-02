import { defineConfig } from 'vitepress'

/** 网站部署基础路径（CI 可经 DOCS_BASE 注入，本地默认 /unix-architecture/） */
const base = process.env.DOCS_BASE || '/unix-architecture/'

/** 将根路径资源拼接到当前 base 下，避免 favicon 等资源 404 */
const asset = (p: string) => base + p.replace(/^\//, '')

export const sharedConfig = defineConfig({
	/** 网站标题 */
	title: 'Unix Architecture',

	lastUpdated: true,

	markdown: {
		/** 代码块高亮主题 */
		theme: {
			dark: 'one-dark-pro',
			light: 'github-light'
		},
		/** UTS 是 TypeScript 的超集，按 TypeScript 高亮 */
		languageAlias: { uts: 'typescript' }
	},

	/** 网站头标签 */
	head: [
		['link', { rel: 'icon', type: 'image/png', href: asset('logo.png') }],
		['link', { rel: 'icon', href: asset('favicon.ico') }],

		['meta', { property: 'og:type', content: 'website' }],
		['meta', { property: 'og:title', content: 'Unix Architecture' }],

		['meta', { property: 'twitter:title', content: 'Unix Architecture' }],
		['meta', { property: 'twitter:card', content: 'summary_large_image' }],
		['meta', { property: 'twitter:description', content: 'uni-app x 工程架构模板：全分层落地 + AI 协作工程化' }]
	],

	/** 网站主题配置 */
	themeConfig: {
		/** 主题 logo（VitePress 自动拼 base） */
		logo: { src: '/logo.png', alt: 'Unix Architecture' },

		/** 本地搜索 */
		search: {
			provider: 'local',
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

		/** 社交链接 */
		socialLinks: [{ icon: 'github', link: 'https://github.com/MengXi-Studio/unix-architecture' }],

		/** 页脚 */
		footer: {
			copyright: 'Copyright © 2026-present 梦曦工作室',
			message: 'Released under the MIT License.'
		}
	}
})
