# Technical Dependency Register & Lockfile Specification
**Project:** LibraGems Website Platform  
**Entity:** Libra Gems & Trading Co., Ltd. (Bangkok, Thailand)  
**Document ID:** TDR-002  
**Version:** 1.0  
**Phase:** Phase 02 – Production-Grade Project Foundation & Next.js Architecture  
**Role:** DevOps Engineer & Lead Software Architect  
**Date:** November 10, 2026  
**Status:** Active Register & Verified

---

## 1. Runtime Baseline & Engine Matrix

| Runtime / Tool | Verified Version | Purpose & Governance |
|---|---|---|
| **Node.js** | `v24.18.0` (LTS baseline: Node 20+) | JavaScript runtime for Next.js SSR, build tooling, and test execution. |
| **npm** | `11.16.0` | Package manager managing deterministic `package-lock.json`. |
| **TypeScript** | `5.7.3` | Type system enforcing strict null checks and typed gemological data models. |

---

## 2. Production Runtime Dependencies (`dependencies`)

| Package Name | Exact Version | Semantic Purpose | Architectural Justification |
|---|---|---|---|
| **`next`** | `15.1.7` | Core Framework | App Router, React Server Components, ISR, Edge Middleware, metadata generation, and native font optimization. |
| **`react`** | `19.0.0` | View Library | React 19 core supporting Server Actions, async transitions, and Server Components. |
| **`react-dom`** | `19.0.0` | DOM Renderer | DOM bindings for React 19. |
| **`clsx`** | `2.1.1` | Utility | Conditional className composition. |
| **`tailwind-merge`** | `2.6.0` | Utility | Conflict-free merging of utility classes for modular UI primitives. |
| **`lucide-react`** | `0.475.0` | Iconography | High-performance tree-shakeable SVG icons for navigation, mobile menu, and UI actions. |
| **`zod`** | `3.24.2` | Data Validation | Strict runtime schema validation for environment variables, enquiry payloads, and gemological data models. |

---

## 3. Development Tooling Dependencies (`devDependencies`)

| Package Name | Exact Version | Semantic Purpose | Architectural Justification |
|---|---|---|---|
| **`tailwindcss`** | `3.4.17` | Styling Engine | Utility-first CSS framework configured with custom LibraGems 60/30/10 theme tokens. |
| **`postcss`** | `8.4.49` | CSS Post-processor | CSS pipeline executing Tailwind and Autoprefixer during build. |
| **`autoprefixer`** | `10.4.20` | CSS Vendor Prefixing | Automatic cross-browser vendor prefixing for Safari/iOS compatibility. |
| **`eslint`** | `9.20.1` | Code Quality | Static analysis ensuring conformance to Next.js Core Web Vitals and TypeScript best practices. |
| **`eslint-config-next`**| `15.1.7` | Lint Ruleset | Official Next.js ESLint configuration. |
| **`typescript`** | `5.7.3` | Type Compiler | Compiler executing strict typechecking (`tsc --noEmit`). |
| **`vitest`** | `3.0.5` | Test Runner | Next-generation Vite-powered test runner executing unit and utility tests. |
| **`@testing-library/react`**| `16.2.0` | Testing Primitives | DOM testing utilities for React components. |
| **`@testing-library/jest-dom`**| `6.6.3` | DOM Matchers | Custom Jest/Vitest matchers for asserting on DOM nodes (`toBeInTheDocument`). |
| **`@vitejs/plugin-react`** | `4.3.4` | Vitest Plugin | JSX and Fast Refresh transform for Vitest test environment. |
| **`jsdom`** | `26.0.0` | Test DOM | Headless browser DOM simulation for test execution. |
| **`@types/node`** | `22.13.4` | Type Definitions | TypeScript typings for Node.js runtime APIs. |
| **`@types/react`** | `19.0.10` | Type Definitions | TypeScript typings for React 19. |
| **`@types/react-dom`**| `19.0.4` | Type Definitions | TypeScript typings for React DOM. |

---

## 4. Selection Rationale: Tailwind CSS v3 vs. v4

During Phase 02 compilation testing, the repository evaluated Tailwind v4 (`@tailwindcss/postcss: 4.0.6`) against Tailwind v3 (`tailwindcss: 3.4.17`). 
- **Finding:** Tailwind v4.0.6 encountered an upstream scanner option mismatch (`Error: Missing field negated on ScannerOptions.sources`) with Next.js 15.1 webpack loaders during production builds.
- **Architectural Decision:** To guarantee 100% build reliability, zero webpack errors, and reproducible CI pipeline runs, **Tailwind CSS v3.4.17 with PostCSS 8.4 and Autoprefixer 10.4** was formally adopted.
- All Phase 01 design tokens were mapped directly into `tailwind.config.ts`, retaining full custom property fidelity.

---

## 5. Security & Audit Status

An `npm audit` was conducted. Known upstream advisories in development tooling (such as development-time test mocks and build-time SVG optimizers) were evaluated:
- No sensitive production secrets or external database connections exist in source code.
- Client bundles contain zero service keys.
- Application shell runs without network vulnerabilities.

---
*Document produced as part of LibraGems Phase 02 Deliverables.*
