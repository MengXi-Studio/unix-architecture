import * as unplugin from 'unplugin';

/** tabBar 外观配置（pages.json tabBar 中除 list 外的字段） */
type TabBarChrome = {
    /** tabBar 文字颜色 */
    color?: string;
    /** tabBar 选中文字颜色 */
    selectedColor?: string;
    /** tabBar 背景颜色 */
    backgroundColor?: string;
    /** tabBar 边框样式 */
    borderStyle?: string;
};
/** 分包配置：root 为 pages.json 中的页面路径前缀，dir 为源码目录（相对项目根） */
type SubPackageOptions = {
    /** 分包 root 路径（分包 pages.json 中的页面路径前缀），如 'pages-sub' */
    root: string;
    /** 分包页面源码目录（相对项目根），如 'pages-sub' */
    dir: string;
};
/** 阶段一（页面生成）选项：routeGen.pages 与 pagesGen.pages 共用 */
type RouteGenPagesOptions = {
    /** 主包页面源码目录（相对项目根），默认 'pages' */
    pagesDir?: string;
    /** 分包配置列表 */
    subPackages?: SubPackageOptions[];
    /** 启动页（移到 pages 数组首位），如 'pages/index/index' */
    entryPage?: string;
    /** 宏/块未声明 title 时的兜底标题 */
    titleFallback?: string;
    /** tabBar 外观配置 */
    tabBar?: TabBarChrome;
    /** 参与扫描的页面扩展名，默认 ['.uvue'] */
    includeExtensions?: string[];
    /** 排除规则（字符串为路径包含匹配，或正则） */
    excludePatterns?: Array<string | RegExp>;
    /** defineUniPage 宏全局类型声明输出路径（便于 IDE 提示），false 关闭 */
    dts?: string | false;
};
/** 阶段二（路由生成）选项：routeGen.router 与 routesGen.router 共用基底 */
type RouteGenRouterOptions = {
    /** 生成路由表文件路径（相对项目根），默认 'routes.gen.uts' */
    outputPath?: string;
    /** 路由数组导出变量名，默认 'routes' */
    exportName?: string;
    /** 命名策略：末段 camelCase（默认）或全路径 camelCase */
    nameStrategy?: 'camelCase' | 'fullPath';
    /**
     * RouteConfig 类型导入来源，默认 '@meng-xi/unix-router'。
     * uni_modules 用法可指向 utssdk 入口（如 '@/uni_modules/ux-router/utssdk/index.uts'）
     */
    importFrom?: string;
    /** RouteNameMap 字面量类型声明文件（WEB 端编辑器提示），false 关闭 */
    dts?: string | boolean | false;
    /** 重新生成时保留用户对路由文件的修改，默认 true */
    preserveRouteChanges?: boolean;
};
/** routesGen 专属：扩展声明选项 */
type RoutesGenRouterOptions = RouteGenRouterOptions & {
    /** 扩展声明文件路径（相对项目根），默认 'routes.ext.uts'；设为 false 关闭扩展合并 */
    extensions?: string | false;
};
/** routeGen 插件选项（页面 → pages.json + 路由数组，全量流水线） */
type RouteGenOptions = {
    /** pages.json 路径（相对项目根），默认 'pages.json' */
    pagesJsonPath?: string;
    /** 监听页面目录变更自动重跑流水线，默认 true */
    watch?: boolean;
    /** 是否启用生成（false 时插件完全旁路） */
    enabled?: boolean;
    /** 输出详细日志（扫描 / 写盘明细） */
    verbose?: boolean;
    /** 解析冲突策略：strict 抛错终止构建；warn 告警跳过 */
    errorStrategy?: 'strict' | 'warn';
    /** 页面生成选项 */
    pages?: RouteGenPagesOptions;
    /** 路由生成选项 */
    router?: RouteGenRouterOptions;
};
/** pagesGen 插件选项（页面 → 仅 pages.json） */
type PagesGenOptions = {
    /** pages.json 路径（相对项目根），默认 'pages.json' */
    pagesJsonPath?: string;
    /** 监听页面目录变更自动重跑，默认 true */
    watch?: boolean;
    /** 是否启用生成（false 时插件完全旁路） */
    enabled?: boolean;
    /** 输出详细日志（扫描 / 写盘明细） */
    verbose?: boolean;
    /** 解析冲突策略：strict 抛错终止构建；warn 告警跳过 */
    errorStrategy?: 'strict' | 'warn';
    /** 页面生成选项 */
    pages?: RouteGenPagesOptions;
};
/** routesGen 插件选项（pages.json → 仅路由数组） */
type RoutesGenOptions = {
    /** pages.json 路径（相对项目根），默认 'pages.json' */
    pagesJsonPath?: string;
    /** 监听 pages.json / 扩展声明文件变更自动重跑，默认 true */
    watch?: boolean;
    /** 是否启用生成（false 时插件完全旁路） */
    enabled?: boolean;
    /** 输出详细日志（解析 / 写盘明细） */
    verbose?: boolean;
    /** 解析冲突策略：strict 抛错终止构建；warn 告警跳过 */
    errorStrategy?: 'strict' | 'warn';
    /** 路由生成选项 */
    router?: RoutesGenRouterOptions;
};

/** 路由生成插件 */
declare const routeGenUnplugin: unplugin.UnpluginInstance<RouteGenOptions | undefined, boolean>;
/** vite 适配器：vite.config.ts 中 routeGen(options) 直调 */
declare const routeGen: (options?: RouteGenOptions | undefined) => unplugin.VitePlugin<any> | unplugin.VitePlugin<any>[];

/** 页面生成插件 */
declare const pagesGenUnplugin: unplugin.UnpluginInstance<PagesGenOptions | undefined, boolean>;
/** vite 适配器：vite.config.ts 中 pagesGen(options) 直调 */
declare const pagesGen: (options?: PagesGenOptions | undefined) => unplugin.VitePlugin<any> | unplugin.VitePlugin<any>[];

/** 路由生成插件 */
declare const routesGenUnplugin: unplugin.UnpluginInstance<RoutesGenOptions | undefined, boolean>;
/** vite 适配器：vite.config.ts 中 routesGen(options) 直调 */
declare const routesGen: (options?: RoutesGenOptions | undefined) => unplugin.VitePlugin<any> | unplugin.VitePlugin<any>[];

export { type PagesGenOptions, type RouteGenOptions, type RouteGenPagesOptions, type RouteGenRouterOptions, type RoutesGenOptions, type RoutesGenRouterOptions, type SubPackageOptions, type TabBarChrome, routeGenUnplugin as default, pagesGen, pagesGenUnplugin, routeGen, routeGenUnplugin, routesGen, routesGenUnplugin };
