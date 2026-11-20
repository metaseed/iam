# Plan: Rewrite IAM (Angular 17) on std-ui

Status: draft. Based on a first-pass review. Verify the items marked **(verify)** before committing to them.

## 1. Goal and scope

Rewrite the IAM app (Markdown doc editor/viewer backed by GitHub Issues, PWA) on std-ui (`@std-ui/core`, `@std-ui/ext`, `@std-ui/router`): Web Components, signals, tagged templates, no Angular runtime.

Non-goals: changing features or the data model. The GitHub storage format and doc model stay the same.

## 2. Current state

IAM (Angular 17):
- About 250 TS files, 45 components, 48 services, 230 RxJS usages.
- Feature areas: `home` (doc list, tree, tags), `markdown` (viewer, editor), `search`, `me`, `net-storage/github`, `cache`, `database` (IndexedDB), `shared` (split-pane, bottom-nav, float-button, dialogs), `core` (services).
- Angular Material/CDK: dialog, snack-bar, bottom-sheet, input, chips, autocomplete, tabs, sidenav, menu, tree, drag-drop, layout.
- Routing: lazy modules, a preloading strategy, route reuse for home, `canDeactivate`.
- Local packages: `rx-store`, `lisp.js`, `angular-hotkey`, `spinner`.

std-ui provides: `UIElement`, templates and directives, signals/`state()`, `toSignal`, `@provide`/`@consume`, form state and validators, `virtualize`, and a Navigation API router. It has no component library, overlay layer, HTTP layer, async-resource primitive or PWA support.

## 3. Gap summary

| # | Gap | Severity | Resolution |
|---|-----|----------|------------|
| G1 | No UI component library (dialog, menu, tabs, input, tree, etc.) | Blocking | Build a small `iam-ui` set on `<dialog>`/Popover API, or adopt an existing Web Component library |
| G2 | No overlay primitive (dialog, bottom-sheet, snack-bar, menu, autocomplete, tooltip) | Blocking | Build one overlay service on `<dialog>`/Popover |
| G3 | No service layer/DI for 48 services | Blocking | Module singletons, `@provide` for context-scoped ones |
| G4 | No HTTP layer | Important | `fetch` wrapper with interceptors, retry/backoff, abort |
| G5 | No async/effect primitive (`rx-store` effects) | Important | `resource`-style helper: loading, error, timeout, retry |
| G6 | Router: route reuse, preloading, scroll restoration **(verify)** | Important | Contribute to `@std-ui/router` or implement in the app shell |
| G7 | Template conditionals/lists beyond `mapByKey`/`virtualize` **(verify)** | Medium | Ternaries in `t`; add small directives if needed |
| G8 | Gestures (HammerJS) and hotkeys (Mousetrap) | Medium | Custom attributes `gesture` and `hotkey` |
| G9 | PWA: service worker, update prompts, push | Medium | Hand-written SW or Workbox, manifest |
| G10 | Theming (Material provided it) | Medium | CSS variable tokens, light/dark |
| G11 | Tooling: lint, test (Karma to vitest), build (ng to Vite) | Low | Reuse the std-ui Vite/vitest setup |
| G12 | `@HostListener`/`@HostBinding` equivalents **(verify)** | Low | Check `UIElement` hooks |

Reusable as-is (framework-independent): markdown-it and its plugins, mermaid, KaTeX, Prism, CodeMirror, Quill, Fuse.js, pica, `lisp.js`, the GitHub client, the doc model, the IndexedDB layer. The viewer elements (toc, tags, version, subpage, code-example) are already custom elements.

## 4. Where the gap work lives

- **std-ui core/ext/router:** only generic, reusable pieces (G6, G7, G8, G12, possibly the async resource from G5).
- **`iam-ui` (new package, in the IAM repo or std-ui):** components, overlay, theming (G1, G2, G10).
- **IAM app:** services, HTTP, PWA, features (G3, G4, G9).

## 5. Phases

### Phase 0: Spike and decisions (about 1 week)
- Decide G1: build or adopt a component library. This is the largest cost driver.
- Verify G6, G7 and G12 against the std-ui source and tests.
- Stand up a Vite + TS app skeleton consuming std-ui, with vitest.
- Port one vertical slice end to end to prove the stack: the `me` page, or a read-only doc view fetched from GitHub.
- **Exit:** the slice runs, and the build/test pipeline works.

### Phase 1: Foundations (2-3 weeks)
- Theming tokens and light/dark.
- Overlay service: dialog, snack-bar, bottom-sheet, menu, tooltip. This replaces `dialog.service`, `message-dialog` and `dialog-spinner`.
- Base components: button, icon, toolbar, card, chips, checkbox, toggle, progress, spinner, input/form-field (wired to `ext` form state).
- `matchMedia` signals (replaces `cdk/layout`).
- Core services as module singletons: logger, config, command, copier, scroll, scroll-spy.
- **Exit:** a component gallery in the demo shows all of these with keyboard and ARIA behaviour.

### Phase 2: Data layer (2 weeks)
- `fetch` client with interceptors (GitHub auth), retry/backoff and abort. Port `backoff`, `error-retry` and `timeout-monitor` logic.
- Async resource helper (G5).
- Port `net-storage/github` (mostly framework-free) and `auth.service`.
- Port the database/IndexedDB layer and the entity cache. Replace the `rx-store` document store and effects with `state()` + async resources.
- Tests: port the `rx-store` specs that remain relevant.
- **Exit:** the document store passes the ported tests against a mocked GitHub.

### Phase 3: App shell and routing (1-2 weeks)
- `<std-router>` routes: `home`, `doc`, `explore`, `message`, `search`, `me`, not-found.
- Route reuse for home, preloading, scroll restoration (G6).
- `beforeLeave` replaces `CanDeactivateGuard`.
- App shell: top bar, bottom nav, float button, sidenav.
- **Exit:** navigation works across all routes with the placeholders in place.

### Phase 4: Viewer (3 weeks)
- Wrap the markdown-it pipeline in a `UIElement` viewer.
- Port the viewer widgets: toc, tags, version/history, subpage, code-example/code, reading-position indicator.
- Mermaid, KaTeX, Prism and code-fence script run, with the same isolation.
- **Exit:** a visual and functional comparison against the Angular viewer on a corpus of real docs.

### Phase 5: Editor (3 weeks)
- CodeMirror element with form binding (replaces `ControlValueAccessor`).
- Editor toolbar, change-note input, file/image upload (shared component), keymap/hotkeys (G8), save service, split pane and view/editor swap gesture.
- Dirty-state guard with `beforeLeave({ unload })`.
- **Exit:** create, edit and save round-trip works against GitHub.

### Phase 6: Home, search, me (2-3 weeks)
- Doc list with `virtualize`, doc tree component, tag cloud, search (Fuse.js plus the store search service), user page.
- **Exit:** feature parity checklist on these pages.

### Phase 7: PWA, hardening, cutover (2 weeks)
- Service worker, update prompt, push (G9), manifest and offline behaviour.
- Accessibility pass, bundle-size budget, cross-browser check (Navigation API shim on Safari).
- Run old and new in parallel under different base paths, then switch over, keeping the Angular app for a rollback window.

Estimated total: about 15-18 weeks for one developer. It varies mostly with the G1 decision.

## 6. Risks

| Risk | Mitigation |
|------|-----------|
| Component library effort balloons | Decide in Phase 0. Prefer adopting an existing Web Component set. Limit scope to what IAM uses |
| Overlay and focus handling bugs | Build on native `<dialog>`/Popover, test with keyboard and screen reader |
| Router lacks route reuse or preloading | Spike in Phase 0, contribute upstream |
| std-ui is young, with API churn | Pin versions, keep adapters thin, add tests in IAM for the contract used |
| Decorators need a compile step | Use esbuild/TS in Vite; already assumed |
| Navigation API support on Safari | Rely on the built-in shim; test early |
| Feature regressions | Parity checklist per phase, comparison corpus of real docs |
| Dev-notes features in flight (code playground, upload as link, etc.) | Freeze new features on Angular, or port after Phase 5 |

## 7. Open questions

1. Build `iam-ui` or adopt Shoelace/Web Awesome, Material Web or Spectrum?
2. Which parts of the work are contributed upstream to std-ui, and which stay in IAM?
3. Is a big-bang cutover acceptable, or must old and new coexist longer?
4. Do `rx-store` and `angular-hotkey`/`spinner` need to remain usable as standalone packages?
5. Which browsers must be supported (this affects the Navigation API requirement)?

## 8. Immediate next steps

1. Review and confirm this plan, then answer the open questions.
2. Run the Phase 0 spike (decision on G1 and verification of G6, G7, G12).
3. Create the new app skeleton and the first vertical slice.
