import { defineConfig } from 'vite'
import uniDefault from '@dcloudio/vite-plugin-uni'
import { routeGen } from './uni_modules/ux-router/plugins/index.mjs'

// ESM 加载时默认导出是模块命名空间对象，真正的函数在 .default 上
const uni = (uniDefault as unknown as { default ?: typeof uniDefault }).default ?? uniDefault

export default defineConfig({
	plugins: [
		routeGen({
			verbose: true,
			pages: {
				pagesDir: 'pages',
				subPackages: [{ root: 'pages-sub', dir: 'pages-sub' }],
				entryPage: 'pages/index/index',
				dts: 'types/define-uni-page.d.ts'
			},
			router: {
				outputPath: 'router/routes.gen.uts',
				importFrom: '@/uni_modules/ux-router/utssdk/index.uts',
				dts: 'types/route-name.gen.d.ts'
			}
		}),

		uni()
	]
})
