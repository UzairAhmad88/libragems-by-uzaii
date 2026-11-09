# Local Development & Engineering Workflow Guide
**Project:** LibraGems Website Platform  
**Entity:** Libra Gems & Trading Co., Ltd. (Bangkok, Thailand)  
**Document ID:** LDG-002  
**Version:** 1.0  
**Phase:** Phase 02 – Production-Grade Project Foundation & Next.js Architecture  
**Role:** Senior DevOps Engineer & Lead Software Architect  
**Date:** November 10, 2026  
**Status:** Approved Master Guide

---

## 1. Prerequisites & Environment Setup

To run the LibraGems platform locally, ensure your workstation meets the following minimum toolchain:
- **Node.js:** v20.x or v22.x LTS (Verified on v24.18.0)
- **npm:** v10.x or v11.x (Verified on v11.16.0)
- **Git:** 2.40+
- **Terminal:** bash, zsh, or PowerShell

---

## 2. Quickstart Instructions

Clone the repository and switch to the foundation branch:

```bash
# 1. Clone repository
git clone https://github.com/UzairAhmad88/libragems-by-uzaii.git
cd libragems-by-uzaii

# 2. Check out working branch
git checkout phase-02/project-foundation

# 3. Navigate to web application directory
cd apps/web

# 4. Install deterministic dependencies from lockfile
npm ci

# 5. Create local environment configuration
cp .env.example .env.local

# 6. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The application will start immediately with full design tokens, fonts, and responsive layout primitives.

> [!NOTE]
> The foundation shell is engineered to run **completely offline without Supabase or Resend credentials**. You do not need to configure API keys for local UI development.

---

## 3. Package Scripts & Verification Commands

All standard engineering workflows are managed through npm scripts in `apps/web/package.json`:

| Command | Action Performed | Expected Exit Code |
|---|---|---|
| `npm run dev` | Starts local Next.js development server with hot-module replacement (HMR) at port 3000. | Active process |
| `npm run build` | Compiles production assets, generates static pages, checks TypeScript types, and creates `.next` production bundle. | `0` (Success) |
| `npm run start` | Boots the compiled production server at port 3000. | Active process |
| `npm run lint` | Runs Next.js ESLint (Flat Config) checking for Core Web Vitals and accessibility violations. | `0` (Success) |
| `npm run typecheck`| Runs TypeScript compiler (`tsc --noEmit`) verifying all types under strict mode. | `0` (Success) |
| `npm run test` | Runs the Vitest test suite executing all unit tests in headless JSDOM environment. | `0` (Success) |
| `npm run test:watch`| Runs Vitest in interactive watch mode for test-driven development. | Active process |

---

## 4. Code Standards & Git Safety

1. **Branch Isolation:** All Phase 02 work is committed to `phase-02/project-foundation`. Direct pushes to `main` are strictly prohibited.
2. **Secrets Prevention:** Never commit `.env.local`, API keys, or private customer data. `.gitignore` is configured at the root and inside `apps/web` to automatically ignore `.env*` files.
3. **Coding Standards:**
   - 2-space indentation enforced via `.editorconfig`.
   - All components must be typed with explicit TypeScript interfaces.
   - Use Next.js `<Link>` for all internal navigation (do not use raw `<a>` tags except for in-page anchors like the skip link).
   - Use the `cn()` helper (`@/lib/utils`) when composing conditional Tailwind classes.

---
*Document produced as part of LibraGems Phase 02 Deliverables.*
