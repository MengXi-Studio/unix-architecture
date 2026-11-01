---
layout: home

hero:
  name: Unix Architecture
  text: uni-app x 工程架构模板
  tagline: 以 api / store / router / 类型体系全分层落地，底层由梦曦插件系（ux-router / ux-pinia / mx-request / ux-storage / ux-utils）承载，Web 端全链路验证
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 介绍
      link: /guide/introduction
    - theme: alt
      text: GitHub
      link: https://github.com/MengXi-Studio/unix-architecture

features:
  - icon: 🧱
    title: 分层完备
    details: api / stores / router / utils / pages 各司其职、类型契约清晰、装配点唯一——在 uni-app x 底座约束下构建完整自洽的工程化分层。
  - icon: 🔒
    title: 鉴权开箱即用
    details: token 内存缓存抹平异步存储、ensureAuthReady 消除冷启动竞态、全局守卫三层防漏（白名单 + 补跑 + 导航拦截兜底）。
  - icon: 🧩
    title: 类型契约驱动
    details: 域类型收敛 types.uts 单文件、DTO 逐调用点内联还原规避 Kotlin 泛型擦除、UTS 红线清单沉淀真实踩坑。
  - icon: 📱
    title: 一套代码多端覆盖
    details: UTS 语言编译到 JS（Web / 小程序）与 Kotlin / Swift 原生；Web 端全链路验证，Android 已过云打包编译。
  - icon: 🎨
    title: m-ui-x 组件库
    details: 内置 11 个基础组件 easycom 零注册，编译期主题变量定制（$m-*），跨端一致的 0.5px 细节与按压反馈。
  - icon: 🤖
    title: AI 协作工程化
    details: .trae 规则与技能体系把分层红线写成机器可执行的强制约束，AI 生成代码被约束在架构内，红线不漂移。
---
