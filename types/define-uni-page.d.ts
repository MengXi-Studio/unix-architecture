/**
 * defineUniPage 页面配置宏类型声明（由 @meng-xi/unix-router/vite-plugin 生成）
 * 宏在编译期被剥离，运行时不占用体积。
 */
declare function defineUniPage(config: {
	/** 页面标题：同步到 pages.json 的 navigationBarTitleText 与路由 meta.title */
	title?: string
	/** 路由名（缺省按 camelCase 规范化生成） */
	name?: string
	/** 是否 tabBar 页面 */
	isTab?: boolean
	/** tabBar 附属信息 */
	tab?: { order?: number; iconPath?: string; selectedIconPath?: string; text?: string }
	/** 路由 meta 扩展字段（需与 RouteMeta 定义匹配） */
	meta?: Record<string, any>
	/** 路由重定向目标（页面路径） */
	redirect?: string
	/** 路由独享前置守卫（须自包含，生成文件内不引用页面作用域） */
	beforeEnter?: (to: any, from: any) => any
}): void

export {}
