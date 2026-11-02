---
layout: home

hero:
  name: Unix Architecture
  text: uni-app x Engineering Architecture Template
  tagline: Full-layer implementation of api / store / router / type system, powered by the MengXi plugin suite (ux-router / ux-pinia / mx-request / ux-storage / ux-utils), fully verified on Web
  image:
    src: /logo.svg
    alt: Unix Architecture
  actions:
    - theme: brand
      text: Quick Start
      link: /en/guide/getting-started
    - theme: alt
      text: Introduction
      link: /en/guide/introduction
    - theme: alt
      text: GitHub
      link: https://github.com/MengXi-Studio/unix-architecture

features:
  - icon: 🧱
    title: Complete Layering
    details: api / stores / router / utils / pages each with a single responsibility, clear type contracts, one assembly point — a complete, self-consistent engineering layering under uni-app x platform constraints.
  - icon: 🔒
    title: Auth Out of the Box
    details: In-memory token cache smoothing over async storage, ensureAuthReady eliminating cold-start races, global guard with three layers of protection (whitelist + re-run + navigation interception fallback).
  - icon: 🧩
    title: Type-Contract Driven
    details: Domain types consolidated in a single types.uts file, DTO restored inline per call site to avoid Kotlin generic erasure, and a UTS red-line checklist distilled from real pitfalls.
  - icon: 📱
    title: One Codebase, Multiple Platforms
    details: UTS compiles to JS (Web / mini-programs) and native Kotlin / Swift; fully verified on Web, Android passed cloud-packaging compilation.
  - icon: 🎨
    title: m-ui-x Component Library
    details: 11 built-in base components with zero-registration easycom, compile-time theme customization ($m-* variables), cross-platform 0.5px details and press feedback.
  - icon: 🤖
    title: Engineering AI Collaboration
    details: The .trae rules and skill system turn layering red lines into machine-enforced constraints — AI-generated code stays inside the architecture and the red lines never drift.
---
