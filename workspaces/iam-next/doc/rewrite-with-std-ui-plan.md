# Plan: Rewrite IAM (Angular 17) on std-ui

Status: **Phase 0 complete** (see [phase-0-findings.md](./phase-0-findings.md)). Phases 1-7 are planned, not started.

## Decisions so far

| Topic | Decision |
|-------|----------|
| UI components (G1) | **Adopt Web Awesome** (`@awesome.me/webawesome`). No in-house component set except IAM-specific pieces (split pane, bottom navigation, float button). |
| New app location | `M:\Workspace\iam\workspaces\iam-next`, a member of the root workspaces list alongside `workspaces/iam` and `workspaces/server`. |
| std-ui consumption | **Relative path aliases** to the sibling checkout `M:\Workspace\std-ui\src\{core,ext,router}\src` (set in `iam-next/vite.config.ts` and `tsconfig.json`). Not published or linked for now. Revisit before cutover. |
| Toolchain | Vite + esbuild TS transform (stage-3 decorators), TypeScript 7 (needed for the Navigation API types in std-ui), vitest. |
| Install | Root monorepo uses yarn (`engines`, `yarn.lock`), so install from `M:\Workspace\iam` with yarn. Standalone fallback inside `iam-next` is `npm install --workspaces=false --include-workspace-root=false`. Plain `npm install` at the root fails on the Angular app's peer dependencies. |
| First slice | Read-only doc view `/doc?id=N&f=md`, done. |

## 1. Goal and scope

Rewrite the IAM app (Markdown doc editor/viewer backed by GitHub, PWA) on std-ui (`@std-ui/core`, `@std-ui/ext`, `@std-ui/router`): Web Components, signals, tagged templates, no Angular runtime.

Non-goals: changing features or the data model. The GitHub storage format and doc model stay the same.

## 2. Current state

IAM (Angular 17):
- About 250 TS files, 45 components, 48 services, 230 RxJS usages.
- Feature areas: `home` (doc list, tree, tags), `markdown` (viewer, editor), `search`, `me`, `net-storage/github`, `cache`, `database` (IndexedDB), `shared` (split-pane, bottom-nav, float-button, dialogs), `core` (services).
- Angular Material/CDK: dialog, snack-bar, bottom-sheet, input, chips, autocomplete, tabs, sidenav, menu, tree, drag-drop, layout.
- Routing: lazy modules, a preloading strategy, route reuse for home, `canDeactivate`.
- Local packages: `rx-store`, `lisp.js`, `angular-hotkey`, `spinner`.

std-ui provides: `UIElement`, templates and directives, signals/`state()`, `toSignal`, `@provide`/`@consume`, form state and validators, `virtualize`, and a Navigation API router. It has no component library, overlay layer, HTTP layer, async-resource primitive or PWA support.

## 3. Gap summary (updated after Phase 0)

| # | Gap | Severity | Status / resolution |
|---|-----|----------|---------------------|
| G1 | No UI component library | Blocking | **Decided:** Web Awesome. Remaining work: theming and IAM-specific components |
| G2 | No overlay primitive (dialog, bottom-sheet, snack-bar, menu, autocomplete, tooltip) | Blocking | Use Web Awesome dialog, drawer, dropdown, tooltip; add a thin service for snack-bar/toasts and bottom-sheet. Verify coverage in Phase 1 |
| G3 | No service layer/DI for 48 services | Blocking | Module singletons, `@provide` for context-scoped ones. Config already ported (`src/config.ts`) |
| G4 | No HTTP layer | Important | `fetch` wrapper with interceptors, retry/backoff, abort. Read path started (`src/github/client.ts`) |
| G5 | No async/effect primitive (`rx-store` effects) | Important | First cut done: `src/lib/resource.ts` (abort, loading, error). Needs timeout, retry, mutation support |
| G6a | Router: scroll restoration | n/a | **Not a gap.** The Navigation API handles it |
| G6b | Router: route reuse / keep-alive | Important | **Confirmed gap.** `<std-outlet>` reuses an element only while route and tag are unchanged. Needed for home. Upstream std-ui feature |
| G6c | Router: preloading | Medium | **Confirmed gap**, small: call `route.lazy()` on idle or hover |
| G7 | Template conditionals/lists | n/a | **Not a gap.** `t` handles `null`/`false`, arrays, nested templates; `mapByKey` for keyed lists |
| G8 | Gestures (HammerJS) and hotkeys (Mousetrap) | Medium | Custom attributes `gesture` and `hotkey` |
| G9 | PWA: service worker, update prompts, push | Medium | Hand-written SW or Workbox, manifest |
| G10 | Theming (Material provided it) | Medium | Web Awesome theme and CSS variable tokens, light/dark |
| G11 | Tooling | Low | **Done** in the spike: Vite, vitest, TS 7 |
| G12 | `@HostListener`/`@HostBinding` equivalents | Low | **Minor.** No decorators; use `connect()`/`disconnect()` or `addClassHooks` |
| G13 | `@searchParam`/`@routeParam` unavailable in `connect()` (new) | Low | **Fixed** in std-ui (`beforeConnect` hook + regression test) |

Reusable as-is (framework-independent): markdown-it and its plugins, mermaid, KaTeX, Prism, CodeMirror, Quill, Fuse.js, pica, `lisp.js`, the doc model, the IndexedDB layer.

**Needs a real port (corrected):** `net-storage/github` (built on `HttpClient`, `@Injectable` and RxJS) and the `rx-store` document store/effects.

The viewer elements (toc, tags, version, subpage, code-example) are already custom elements, which fits std-ui well.

## 4. Where the work lives

- **std-ui core/ext/router:** only generic, reusable pieces (G6b, G6c, G8, G13, possibly the async resource from G5).
- **IAM app (`iam-next`):** services, HTTP, PWA, features, IAM-specific components (G3, G4, G9).

## 5. Phases

### Phase 0: Spike and decisions: DONE
- G1 decided (Web Awesome). G6, G7, G12 verified.
- `iam-next` skeleton running with Vite, TS 7, vitest; std-ui via relative paths.
- Vertical slice: read-only doc view against the real `metasong/iam-data` repo (config, `fetch` client, head-meta parsing, markdown-it, router, resource helper, Web Awesome callout/spinner/badge, sub-page links).
- Result: `tsc` clean, 4 tests pass, production build about 83 kB gzip JS + 15 kB gzip CSS.

### Phase 1: Foundations (2-3 weeks): NEARLY DONE
Coverage check done: see [web-awesome-coverage.md](./web-awesome-coverage.md). Only autocomplete and drag-drop have no Web Awesome equivalent.

Done (`iam-next/src/ui`, `src/lib`; 26 unit tests; browser-verified on `/gallery`):
- [x] Theming: light/dark/system, persisted (`theme.ts`).
- [x] Overlay layer: `confirm`, `alert`, `bottomSheet`, `busy` (`dialogs.ts`), `snackbar` with action (`snackbar.ts`). Replaces `dialog.service`, `message-dialog`, `dialog-spinner`, `MatSnackBar`, `MatBottomSheet`.
- [x] `matchMedia` signals (`media.ts`), logger (`lib/logger.ts`), async resource (`lib/resource.ts`).
- [x] IAM components: `<iam-bottom-nav>`, `<iam-float-button>`; split pane replaced by `<wa-split-panel>`.
- [x] Component gallery at `/gallery`.
- [x] std-ui G13 fix: `@routeParam`/`@searchParam` readable in `connect()` (`beforeConnect` hook, regression test added in `std-ui/src/router`; all 59 router tests pass). The `firstRendered` workaround in `doc-view.ts` is removed.

- [x] `<iam-input>` (`ui/iam-input.ts`): `<wa-input>` as a `formBind` control. Verified: two-way value, `required`/`minLength` messages, touched, disabled, hint shows the error after touch. Needed because `formBind` reports validation only to native controls or elements with `setErrors()`.
- [x] Core services ported (`src/lib`): `commands.ts` (config hotkeys incl. sequences like `ctrl+m f`, replaces `CommandService` + `angular-hotkey`), `copier.ts`, `scroll.ts` (scroll helpers and scroll-spy with the old selection rule). Hotkeys verified in the browser.
- [x] `<iam-reading-progress>` (`ui/reading-progress.ts`): verified in the browser (41% at 700 of 1718 px).

Remaining:
- [ ] Copy-to-clipboard has unit tests for both paths, but it has not been seen to succeed in a real browser: the automation browser has no document focus, so the Clipboard API rejects. Check by hand in a normal browser.
- [ ] Wire `getCommands()` into the real features when they are ported (editor, viewer).
- [x] Icon assets: the free Web Awesome package ships no icon files, so `ui/icons.ts` bundles inline SVG icons and replaces the `default` icon library (no network fetch, works in production builds). Add icons to the map as features need them. Also fixed std-ui API renames (`firstRendered`/`rendered` are now `firstUpdated`/`updated`); `tsc` clean, 60 tests pass.
- [x] G6b keep-alive in std-ui (uncommitted, in `std-ui/src/router`): `keepAlive` on `RouteDef` / `keep-alive` attribute on `<std-route>`. `<std-outlet>` detaches the element when leaving the route (so `disconnect()` runs and effects stop) and re-attaches the same instance on return, with fresh `params`/`data`. Instance state (signals, fields, DOM) survives; `connect()` runs again, so keep one-time setup in the constructor or guard it. Limits: per outlet, unbounded cache, not for `errorElement`/`template` routes; scroll position inside the element is not restored by the router. 61 router tests pass, including a new one. Phase 3 should add an LRU cap if needed.
- [x] Code-level keyboard/ARIA pass on the gallery components (not yet a real screen-reader run): float button now has an accessible name via visually hidden text (an `aria-label` on the `<wa-button>` host does not reach its inner `<button>`), glyph is `aria-hidden`, and Escape returns focus to the toggle; gallery status text uses `role="status"`. Bottom nav (`nav` + `aria-current`) and reading progress (`progressbar`) were already fine. A manual check with NVDA/Narrator is still worth doing before cutover.
- **Exit:** a component gallery page in `iam-next` shows all of these with keyboard and ARIA behaviour.

> **std-ui API change (Nov 23):** core's `signal()`/`ReadonlySignal` are gone; the writable primitive is now `state()` (`ReadonlyState`, `State`), and the object tree that used to be `state({...}).with(...)` is `stateTree()` in `@std-ui/ext`. `iam-next` was migrated (117 tests, `tsc` and build pass against the new build).

### Phase 2: Data layer (2 weeks): IN PROGRESS
Done (`iam-next/src/lib`, `src/github`; `data.test.ts`, 31 tests; `tsc` clean, 57 tests total):
- [x] `lib/retry.ts` (replaces `backoff`, `error-retry`, `timeout-monitor`): `retry`, `withTimeout`, `sleep`, interval shapes. Original error is rethrown instead of a generic "retried N times" error.
- [x] `lib/http.ts` (replaces `HttpClient` + interceptors): JSON, params, abort, timeout, retry on network/5xx/408/429 for idempotent methods only, interceptors, `HttpError`.
- [x] `lib/resource.ts` (G5): `resource` gains `retry`, `timeout`, `reload()`, keep-previous; new `mutation()` (no retry by default, newer run aborts older).
- [x] `github/repository.ts` (+ `model.ts`, `media.ts`): `getSha`, `getContents`, `getContentsRaw`, `getReadme`, `newFile`, `updateFile`, `newBinaryFile`, `file` (upsert, creates only on 404), `delFile`, `delFileViaSha`, `searchIssue`, `searchCode`, `listCommits`, `move`. Writes are never retried.
- [x] `github/auth.ts` (replaces `AuthService`/`UserInfo`): credentials signal in localStorage; signed out means read-only via the raw endpoint.
- Decisions and fixes found while porting:
  - The old bundle embedded an XOR-obfuscated GitHub token. It is **not** copied; sign-in with a token replaces it. Rotate that token, since it is in the old repo's history.
  - Old `move` read `response.data` and could never have worked with `HttpClient`; fixed, covered by a mocked test, but **not yet run against the real API**.
  - Old `generateSha` hashed the UTF-16 length for non-ASCII docs, so shas differed from GitHub's. The new `gitSha` uses the byte length (matches GitHub). Existing IndexedDB cache entries for non-ASCII docs will not match; the cache is rebuilt anyway.

Remaining:
- [ ] Issues API (`issues/issue.ts`, `labels.ts`) if the app still uses it.
- [x] IndexedDB layer: `lib/idb.ts` (promise based, replaces `database-engine`: lazy shared open, `get`/`getAll`/`getAllKeys`/`count`, atomic `putMany`/`put`/`add`/`delete`/`deleteMany`/`clear`, cursor `query` with range/direction/filter/skip/limit, `getByPage`, `modify` for read-decide-write) and `lib/schema.ts` (same three stores). Tested with `fake-indexeddb` (7 tests; 67 total, `tsc` clean). The old `changes` Subject is dropped; the cache layer will notify through signals.
- [x] `cache/db-cache.ts` + `cache/model.ts` (port of `DatabaseCache`, framework free; 11 tests, 78 total, `tsc` clean). Reads are async generators that yield the cached value first, then newer remote data (`readBulkMeta`, `readMeta`, `readContent`), with the same sync rules (remote delete wins, `updateDate` / `sha` comparison, dirty flag dropped on sha change). Also `add`, `update` (local save + dirty marker, optional `forceSave`), `syncToNext`, `dirtyIds`, `delete`. The next level is a small `NextCache` promise interface. Model is plain data (no classes). Not yet ported: the auto-saver (timer, online event, `BroadcastChannel`, store updates), `github-cache` (the `NextCache` implementation over `github/repository.ts`) and `store-cache`.
- [x] `github/issues.ts` (`IssuesApi`: list, get, create, edit; reachable as `repo.issue`), `cache/doc-meta.ts` (title/summary/picture extraction, meta <-> issue body, `issueToDocMeta`, `metaFromContent`) and `cache/github-cache.ts` (`GithubCache implements NextCache`: `create`, `readBulkMeta` with the old page heuristics extracted into `pagesFor`, `readMeta`, `readContent` with the 404 fallbacks, `update`, `delete`, `search`). 14 new tests, 92 total, `tsc` clean. All mocked: **not yet run against the real GitHub API**.
  - Fixed while porting: `create` never closed the issue after a failed create (its `id` variable was never assigned); `FileResult.commit` was typed as the list-commits shape, but the contents API returns the git commit object (`committer` directly on it).
  - Behaviour changes: `readBulkMeta` returns one deduplicated list instead of emitting page by page; the 5-minute first-page refresh is a staleness check instead of a one-shot timer; the legacy `<Title>_<id>` file name is sanitized like the read path. Old quirk kept: `create` reuses the *last* closed issue in the list (the old log message said first).
  - The tag cache and id range callbacks are injected (`onLabels`, `onIdRange`), so no store dependency.
- [x] `readBulkMeta` now returns the pages read so far when a later page fails (it still throws when nothing was read); logged as a warning.
- [x] Document store and store level (`src/store`; 15 new tests, 108 total, `tsc` clean):
  - `entities.ts`: `EntityMap` replaces `EntityCacheStore`/`MemEntityCache` (one signal holding an immutable `Map`, optional sort, `upsert`/`upsertMany`/`update`/`delete`/`deleteMany`).
  - `doc-store.ts`: `DocStore` replaces `DocumentStore` (metas sorted newest first, contents, statuses, in-store dirty list, tags, `currentId`, `idRangeHigh/Low`, `searchResult`, computed `currentMeta/Content/Status` and the dirty/editable/syncing flags, `upsertStatus`, `delete`). Effects (`rx-store`) are not needed: the reads are signals and the writes are plain async methods.
  - `store-cache.ts`: `StoreCache` replaces `StoreCache` + `StoreSaver`: `createDraft`, `create`, `readBulkMeta`/`readMeta`/`readContent` (apply what the db level yields to the store; sha check, remote deletes, tag line from labels via `withTags`), `update` (dirty marker, or write-through with `forceSave` that also clears `isStoreDirty`/`isDbDirty`/`isSyncing`), `delete`, `saveDirtyNow` and `startAutoSave` (10 s, rounds never overlap, 2 retries, failures stay dirty).
  - `NextCache.create` / `DbCache.create` added; the db copy is written with `put` (the old `add` failed when a reused issue id already had a stale local record).
  - Changed: the old `readDocContent` emitted the content once per meta emission; it now yields once, after the meta sync. Store search is left for Phase 6 (needs the local search service).
- [x] Data layer wired end to end (9 new tests, 117 total, `tsc` clean; all against a fake GitHub, fake IndexedDB):
  - `cache/db-auto-saver.ts` (`DbAutoSaver`, port of `DatabaseCacheSaver`): every 5 min (+ random 0-10 s so tabs differ) and 6 s after the browser goes online it pushes dirty docs to GitHub, one at a time with 2 retries; a failing doc stays dirty and the round goes on; rounds never overlap. A `BroadcastChannel` tells other tabs, which update meta, flags and content (a tab that saved to the db last keeps its editor text and takes only the new sha).
  - `github/storage.ts`: `openRepository` (looks the repo up, creates it on 404 when signed in) and `lazyRepository` (memoized, retried after failure). `GithubCache` now accepts a repository or a function that opens it, so the app starts offline from IndexedDB.
  - `cache/index.ts`: `createCaches({ github })` builds store -> db -> GitHub, feeds the tag store and id range, and returns `{ store, storeCache, dbCache, githubCache, dbSaver, start(), dispose() }`.
  - `StoreCache.readContent` re-flags `isDbDirty` after a reload when the db still holds unsynced edits (old `updateDbDirtyStatus`, minus its 1 s timer hack).
- [ ] Still open in Phase 2: sign-in UI (Phase 6 `me` page) and a manual run of reads and writes against a scratch repo (nothing has touched the real API yet). (`database-cache`, `github-cache`, `store-cache`) and the `rx-store` document store.
- [ ] Sign-in UI (the `me` page, Phase 6) and a manual check of writes against a scratch repo.

Original scope:
- Extend `src/github/client.ts` to authenticated calls (contents, issues, commits, search) with interceptor-style auth, retry/backoff (port `backoff`, `error-retry`, `timeout-monitor`) and abort. This is a real port of `net-storage/github`, not a copy.
- Extend the resource helper (G5): timeout, retry, mutations.
- Port the IndexedDB layer and entity cache. Replace the `rx-store` document store and effects with `state()` plus resources.
- Port `auth.service`.
- Tests: port the `rx-store` specs that remain relevant.
- **Exit:** the document store passes the ported tests against a mocked GitHub.

### Phase 3: App shell and routing (1-2 weeks): IN PROGRESS
Done (128 tests, `tsc` clean, build splits each page into its own chunk; verified in the browser):
- [x] `src/routes.ts`: route table `/` -> `/home`, `home` (keepAlive), `doc`, `explore`, `message`, `search`, `me`, `gallery`, `*` not-found; every page lazy with a title. Placeholder pages for explore, message, search, me, not-found, home.
- [x] Keep-alive (G6b) works in the real app: the home element is the same instance after visiting another page, its state survives and `connect()` runs again.
- [x] Preloading (G6c), `lib/preload.ts`: `preloadOnIdle` (routes with `meta.preload`, currently `doc`), `prefetchOnIntent` (hover, focus or touch of a link loads that route's chunk; honours the base path, ignores external links), failures are logged and retried later, never thrown.
- [x] `lib/leave.ts` `guardUnsaved(router, isDirty)` replaces `CanDeactivateGuard`: confirm dialog on in-app navigation, browser prompt on tab close, returns an unregister function. The editor (Phase 5) will use it.
- [x] App shell (`app.ts`): sticky top bar (menu, title, theme cycle system/light/dark), `wa-drawer` side menu that closes on link click, routed outlet, reading progress, bottom nav.
- Finding: `<std-router>` reads `routes` when it connects, before a template property binding can set them (the router started empty). The shell builds the router with `createRouter` and assigns it in `firstUpdated()`. Upstream option: let `std-router` pick up `routes` set shortly after connect, or document it.
- `@std-ui/router/testing` alias added for tests (`createMemoryNavigation`).

Remaining:
- [ ] Float button in the shell (needs the page actions from Phases 5-6, e.g. "new doc").
- [ ] Wire `createCaches()` into the app (a `caches` module with the config, started on boot) once the first real page needs it (home list, Phase 6; doc view, Phase 4).
- [ ] Keyboard check of the drawer and a view-transition decision.

Original scope:
- `<std-router>` routes: `home`, `doc`, `explore`, `message`, `search`, `me`, not-found.
- Route keep-alive for home (G6b, upstream), preloading (G6c).
- `beforeLeave` replaces `CanDeactivateGuard`.
- App shell: top bar, bottom nav, float button, sidenav.
- **Exit:** navigation works across all routes with placeholders in place.

### Phase 4: Viewer (3 weeks)
- Move the markdown-it pipeline into a `UIElement` viewer; port the ~20 plugins (`incremental-dom` rendering is replaced by setting HTML through `unsafeHtml` or a morphing step).
- Port the viewer widgets: toc, tags, version/history, subpage (with titles), code-example/code, reading-position indicator.
- Mermaid, KaTeX, Prism and code-fence script run, with the same isolation.
- Decide HTML sanitizing (docs are rendered with raw HTML today).
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
- Decide how std-ui is consumed for release (publish, link, or vendor); relative paths are for development.
- Run old and new in parallel under different base paths, then switch over, keeping the Angular app for a rollback window.

Estimated total remaining: about 14-17 weeks for one developer. Adopting Web Awesome removes most of the component work from Phase 1.

## 6. Risks

| Risk | Mitigation |
|------|-----------|
| Web Awesome lacks a widget IAM needs (bottom-sheet, autocomplete, tree behavior) | Check coverage at the start of Phase 1; build thin wrappers or IAM-specific components |
| Web Awesome licensing/version (it replaced Shoelace; the pro tier is paid) | Confirm which components and the version are in the free tier before widening use; pin the version |
| Relative-path std-ui coupling breaks if the sibling checkout moves or changes | Pin a known std-ui commit; revisit publishing before cutover |
| Router lacks route keep-alive | Design and contribute in Phase 1; fallback is caching list state in a signal store |
| std-ui is young, with API churn | Keep adapters thin; add tests in IAM for the contract used |
| TS 7 / esbuild toolchain differences | Match std-ui's versions; keep the typecheck in CI |
| Navigation API support on Safari | Rely on the built-in shim; test early |
| Feature regressions | Parity checklist per phase, comparison corpus of real docs |
| Raw HTML rendered from docs | Keep the data repo trusted, or sanitize in Phase 4 |
| Dev-notes features in flight (code playground, upload as link, etc.) | Freeze new features on Angular, or port after Phase 5 |

## 7. Open questions

1. Which parts of the work are contributed upstream to std-ui, and which stay in IAM? (Candidates: keep-alive, preloading, `beforeConnect` fix, the resource helper.)
2. Is a big-bang cutover acceptable, or must old and new coexist longer?
3. Do `rx-store` and `angular-hotkey`/`spinner` need to remain usable as standalone packages?
4. Which browsers must be supported (this affects the Navigation API requirement)?
5. Is the Web Awesome free tier sufficient for all needed components?

## 8. Next steps

1. Finish the remaining Phase 1 items above (form input wrapper, remaining core services, icon assets, a11y pass).
2. Run the yarn install from the repo root once to confirm the updated workspace list.
3. Commit the std-ui router change (it is in the sibling `M:\Workspace\std-ui` repo, uncommitted).
