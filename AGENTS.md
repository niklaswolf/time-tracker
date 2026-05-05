# Repository Guidelines

## Project Structure & Module Organization

This is a Nuxt 4 desktop time tracker packaged with Tauri 2. Frontend code lives under `app/`: Vue UI in `app/components/`, the root entry in `app/app.vue`, reusable behavior in `app/composables/`, shared helpers in `app/utils/`, Nuxt plugins in `app/plugins/`, service integrations in `app/service/`, and global styles in `app/assets/css/global.css`. Static public files belong in `public/`. The Tauri shell, Rust commands, capabilities, icons, and desktop configuration live under `src-tauri/`.

## Build, Test, and Development Commands

Install dependencies with `npm install`. Use `npm run dev` for the Nuxt browser dev server, and prefer `npm run tauri dev` when validating desktop behavior such as the system tray, global shortcut, idle detection, or native windows. Build the web app with `npm run build`; create the static output consumed by Tauri with `npm run generate`; preview a production Nuxt build with `npm run preview`. Build the desktop application with `npm run tauri build`; use `npm run tauri build -- --bundles app` to verify the macOS app bundle without creating a DMG.

## Coding Style & Naming Conventions

Write Vue single-file components with `<script setup lang="ts">`. Name components in PascalCase, for example `MainWindow.vue`, and name composables with the `useX.ts` pattern, for example `useTimer.ts`. Keep shared frontend types in `app/types.d.ts` when globally consumed. Follow the existing TypeScript style: semicolons are optional in current files, imports use Nuxt aliases such as `~/composables/useIdleState` when helpful, and UnoCSS utility classes are used directly in templates. Keep Rust changes inside `src-tauri/src/` idiomatic for edition 2021.

## Testing Guidelines

No automated test suite is currently committed. For now, validate changes manually with `npm run tauri dev`, covering timer start, pause/resume, stop, idle notification behavior, system tray actions, and Jira login/filter loading when credentials are available. If adding tests, colocate focused unit tests near the code or add a clear `tests/` directory, and document the new runner in `package.json`.

## Commit & Pull Request Guidelines

Recent history uses short conventional prefixes such as `feat:`, `fix:`, and `chore:`. Keep commits scoped and imperative, for example `fix: avoid idle tracking when timer is stopped`. Reference issues with `closes #5` when applicable. Pull requests should include a concise summary, manual verification steps, linked issues, and screenshots or recordings for UI changes, especially system tray and notification flows.

## Security & Configuration Tips

Do not commit real Jira credentials. Runtime Jira values are configured through Nuxt public runtime config, including `NUXT_PUBLIC_JIRA_ENDPOINT`, `NUXT_JIRA_USER`, and `NUXT_JIRA_PASSWORD`. Treat `.env` as local-only configuration and add explicit Tauri permissions in `src-tauri/capabilities/` before enabling new native APIs.
