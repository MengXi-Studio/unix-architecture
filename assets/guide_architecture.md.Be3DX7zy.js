import{_ as n,o as a,c as e,ag as p}from"./chunks/framework.DC2anBTf.js";const h=JSON.parse('{"title":"架构设计","description":"","frontmatter":{},"headers":[],"relativePath":"guide/architecture.md","filePath":"guide/architecture.md","lastUpdated":1793536832000}'),t={name:"guide/architecture.md"};function i(l,s,o,r,c,u){return a(),e("div",null,[...s[0]||(s[0]=[p(`<h1 id="架构设计" tabindex="-1">架构设计 <a class="header-anchor" href="#架构设计" aria-label="Permalink to &quot;架构设计&quot;">​</a></h1><h2 id="目录结构" tabindex="-1">目录结构 <a class="header-anchor" href="#目录结构" aria-label="Permalink to &quot;目录结构&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes one-dark-pro github-light vp-code" tabindex="0"><code><span class="line"><span>├── main.uts                  # 唯一装配点：app.use(router) + initRequest() + setupPermission()</span></span>
<span class="line"><span>├── App.uvue                  # 应用生命周期（App 端返回键拦截等）</span></span>
<span class="line"><span>├── pages.json / manifest.json</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── api/                      # 接口层：薄封装（请求转发 + 路径收敛 + DTO 还原），不写业务逻辑</span></span>
<span class="line"><span>│   ├── user.uts</span></span>
<span class="line"><span>│   └── types.uts             # DTO 唯一事实源（LoginResult / UserInfo，单文件即聚合出口）</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── stores/                   # 状态层：ux-pinia class 式 store，免挂载（模块级注册表即全局单例）</span></span>
<span class="line"><span>│   ├── index.uts             # useXxxStore 出口</span></span>
<span class="line"><span>│   ├── types.uts             # 域类型聚合出口（转发 store class 类型）</span></span>
<span class="line"><span>│   └── modules/</span></span>
<span class="line"><span>│       └── user.uts          # UserStore class：state(reactive) + login/getInfo/logout/resetToken</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── composables/              # 组合式函数：函数无出口（按需直接导入），类型走聚合出口</span></span>
<span class="line"><span>│   ├── useLoading.uts</span></span>
<span class="line"><span>│   └── types.uts             # LoadingState 定义（域类型单文件收敛）</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── components/               # easycom 约定目录（components/&lt;Name&gt;/&lt;Name&gt;.uvue，免注册使用）</span></span>
<span class="line"><span>│   └── AppLogo/AppLogo.uvue</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── router/                   # 路由层</span></span>
<span class="line"><span>│   ├── index.uts             # createRouter（routes 由 vite 插件生成）</span></span>
<span class="line"><span>│   ├── permission.uts        # 全局守卫：白名单 + token 检查 + getInfo + 重定向</span></span>
<span class="line"><span>│   └── routes.gen.uts        # ⚠ 由 @meng-xi/unix-router/vite-plugin 自动生成，勿手改</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── utils/                    # 工具层</span></span>
<span class="line"><span>│   ├── request.uts           # mx-request 封装：configureRequest + 双拦截器</span></span>
<span class="line"><span>│   └── auth.uts              # token 读写：内存缓存（同步读）+ ux-storage 持久化（异步落盘）</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── config/</span></span>
<span class="line"><span>│   └── index.uts             # 全局唯一配置源（appName / baseURL / timeout）</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── pages/                    # 页面（uni-app x 约定，pages.json 静态注册）</span></span>
<span class="line"><span>│   ├── index/index.uvue</span></span>
<span class="line"><span>│   └── login/login.uvue</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── types/                    # 插件生成的 d.ts（defineUniPage / RouteNameMap），业务类型不放这里</span></span>
<span class="line"><span>├── .trae/                    # AI 辅助开发体系（rules / skills / documents / mcp.json）</span></span>
<span class="line"><span>├── docs/                     # 本文档站（VitePress）</span></span>
<span class="line"><span>├── static/  uni.scss</span></span>
<span class="line"><span>└── uni_modules/              # 插件系 + m-ui-x 组件库（easycom 零注册）</span></span></code></pre></div><h2 id="核心调用链" tabindex="-1">核心调用链 <a class="header-anchor" href="#核心调用链" aria-label="Permalink to &quot;核心调用链&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes one-dark-pro github-light vp-code" tabindex="0"><code><span class="line"><span>页面(.uvue)</span></span>
<span class="line"><span>  → composables/useXxx（横切 UI 状态）</span></span>
<span class="line"><span>  → stores/modules/*（业务状态与动作）</span></span>
<span class="line"><span>  → api/&lt;domain&gt;（DTO 还原）</span></span>
<span class="line"><span>  → utils/request（拦截器：token 注入 + 统一错误 toast）</span></span>
<span class="line"><span>  → mx-request → uni.request</span></span></code></pre></div><p>三条硬规则贯穿全程：</p><ul><li><strong>页面不直连网络层</strong>，不接触裸 JSON；store 不反向引用组件；</li><li><strong>api 层只做薄封装</strong>：请求转发 + 路径收敛 + DTO 还原，禁止写业务逻辑；</li><li><strong>装配点唯一</strong>：全局初始化只发生在 <code>main.uts</code>，禁止在模块顶层做副作用。</li></ul><h2 id="启动装配-main-uts-唯一装配点" tabindex="-1">启动装配（main.uts，唯一装配点） <a class="header-anchor" href="#启动装配-main-uts-唯一装配点" aria-label="Permalink to &quot;启动装配（main.uts，唯一装配点）&quot;">​</a></h2><div class="language-uts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">uts</span><pre class="shiki shiki-themes one-dark-pro github-light vp-code" tabindex="0"><code><span class="line"><span style="--shiki-dark:#E5C07B;--shiki-light:#24292E;">app</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#24292E;">.</span><span style="--shiki-dark:#61AFEF;--shiki-light:#6F42C1;">use</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#24292E;">(</span><span style="--shiki-dark:#E06C75;--shiki-light:#24292E;">router</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#24292E;">)      </span><span style="--shiki-dark:#7F848E;--shiki-dark-font-style:italic;--shiki-light:#6A737D;--shiki-light-font-style:inherit;">// ux-router：provide + 全局 mixin(onShow syncRoute)</span></span>
<span class="line"><span style="--shiki-dark:#61AFEF;--shiki-light:#6F42C1;">initRequest</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#24292E;">()        </span><span style="--shiki-dark:#7F848E;--shiki-dark-font-style:italic;--shiki-light:#6A737D;--shiki-light-font-style:inherit;">// mx-request：默认实例配置 + 双拦截器（幂等）</span></span>
<span class="line"><span style="--shiki-dark:#61AFEF;--shiki-light:#6F42C1;">setupPermission</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#24292E;">()    </span><span style="--shiki-dark:#7F848E;--shiki-dark-font-style:italic;--shiki-light:#6A737D;--shiki-light-font-style:inherit;">// 注册 beforeEach + 冷启动 guardRoute() 补跑守卫链</span></span></code></pre></div><p>三种装配范式并存<strong>不是不统一，是底座如此</strong>：ux-router 实现 Vue install 协议（Kotlin 端可靠）；ux-pinia 免挂载（原生端 <code>app.use</code> 实测不生效，模块级注册表即全局单例）；mx-request 为纯函数库（显式初始化避免模块顶层副作用的时序问题）。</p><h2 id="鉴权守卫-router-permission-uts" tabindex="-1">鉴权守卫（router/permission.uts） <a class="header-anchor" href="#鉴权守卫-router-permission-uts" aria-label="Permalink to &quot;鉴权守卫（router/permission.uts）&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes one-dark-pro github-light vp-code" tabindex="0"><code><span class="line"><span>await ensureAuthReady()           // 异步守卫（ux-router 守卫链支持 await Promise）</span></span>
<span class="line"><span>├─ 有 token</span></span>
<span class="line"><span>│   ├─ 访问登录页 → 重定向首页</span></span>
<span class="line"><span>│   ├─ 已有用户信息 → 放行</span></span>
<span class="line"><span>│   └─ 无用户信息 → await getInfoAction</span></span>
<span class="line"><span>│       ├─ 成功 → 放行</span></span>
<span class="line"><span>│       └─ 失败 → resetToken + 重定向登录页（带 redirect）</span></span>
<span class="line"><span>└─ 无 token</span></span>
<span class="line"><span>    ├─ 白名单（登录页）→ 放行</span></span>
<span class="line"><span>    └─ 其余 → 重定向登录页（query 带 redirect=path）</span></span></code></pre></div><p>三层防漏设计：</p><ol><li><strong>白名单 + token 检查</strong>：常规守卫语义；</li><li><strong>冷启动补跑</strong>：H5 直达 / deeplink 进入时页面可能已加载而守卫未执行——启动时 <code>router.isReady().then(() =&gt; router.guardRoute(null, null))</code> 显式补跑；</li><li><strong>导航拦截兜底</strong>：运行时启用 <code>InterceptorPlugin</code>（<code>interceptUniApi: true</code>）拦截外部直调的 <code>uni.navigateTo</code> 等原生导航转交守卫链——但规约仍要求统一走 <code>useRouter()</code>，不得依赖兜底。</li></ol><p><code>backFallback</code> 已配置为首页：深链 / 刷新直连后 back() 页面栈不足时，自动 relaunch 回首页（走完整守卫链），而非 CANCELLED 失败。</p><h2 id="装配点-唯一-禁止在别处做全局副作用" tabindex="-1">装配点（唯一，禁止在别处做全局副作用） <a class="header-anchor" href="#装配点-唯一-禁止在别处做全局副作用" aria-label="Permalink to &quot;装配点（唯一，禁止在别处做全局副作用）&quot;">​</a></h2><table tabindex="0"><thead><tr><th>需求</th><th>唯一落点</th></tr></thead><tbody><tr><td>网络初始化 / 拦截器</td><td><code>utils/request.uts</code> → <code>initRequest()</code>（幂等守卫）</td></tr><tr><td>路由守卫</td><td><code>router/permission.uts</code> → <code>setupPermission()</code></td></tr><tr><td>全局配置</td><td><code>config/index.uts</code></td></tr><tr><td>应用生命周期</td><td><code>App.uvue</code>（仅生命周期逻辑）</td></tr></tbody></table><p>main.uts 保持极薄：<code>app.use(router)</code> + <code>initRequest()</code> + <code>setupPermission()</code>，不新增其它装配调用。</p>`,18)])])}const g=n(t,[["render",i]]);export{h as __pageData,g as default};
