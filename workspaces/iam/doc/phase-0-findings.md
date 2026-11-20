# Phase 0 findings: IAM rewrite on std-ui

Date: 2026-11-20. Plan: [rewrite-with-std-ui-plan.md](./rewrite-with-std-ui-plan.md).
Spike app: `M:\Workspace\iam\workspaces\iam-next` (Vite + TS, std-ui consumed from the sibling checkout `M:\Workspace\std-ui` via path alias).

## Decisions

| # | Decision |
|---|----------|
| G1 | **Adopt Web Awesome (`@awesome.me/webawesome` 3.15).** The spike uses `wa-spinner`, `wa-callout` and `wa-badge`, importing components individually and the theme from `dist/styles/webawesome.css`. Production build: about 15 kB gzip CSS plus 83 kB gzip JS. |
| Location | New app at `workspaces/iam-next` (sibling of `workspaces/iam`). |
| Slice | Read-only doc view `/doc?id=N&f=md`. |

## Verification of the open items

| Item | Result |
|------|--------|
| G6 scroll restoration | **Not a gap.** The router uses the Navigation API, and the browser restores scroll and focus. |
| G6 route reuse (keep-alive) | **Gap confirmed.** `<std-outlet>` reuses an element only while route and tag are unchanged. There is no cache of instances for routes that were left. Needed for the home list. Candidate for an upstream std-ui feature. |
| G6 preloading | **Gap confirmed.** Routes have `lazy`, but nothing prefetches ahead of time. Small to build (call `route.lazy()` on idle or hover). |
| G7 conditionals / lists | **Not a gap.** `t` accepts `null`/`false`, nested templates and arrays; `mapByKey` handles keyed lists. |
| G12 host listeners/bindings | **Minor.** No decorators; use `connect()`/`disconnect()` or `addClassHooks`. |
| GitHub client | **Correction to the plan:** it is not framework-free (`HttpClient`, `@Injectable`, RxJS everywhere). It needs a real port. Phase 0 re-implemented the read path with `fetch`. |

## What the spike proves

- Vite + esbuild (decorators) + std-ui source alias + TypeScript 7 typecheck + vitest all work: `tsc` clean, 4 tests pass, `vite build` succeeds (about 83 kB gzip JS including markdown-it, js-yaml and the Web Awesome components used).
- A routed page (`<std-router>`, `<std-outlet>`, `@searchParam`) fetches a real doc from `metasong/iam-data` on GitHub, parses head meta, renders it with markdown-it, and shows loading/error states.
- `src/lib/resource.ts` (about 40 lines) covers the rx-store "load when key changes" use case with abort and loading/error signals (G5, first cut).
- `src/github/client.ts`, `src/config.ts`, `src/markdown/render.ts` have no framework dependency.

## Issues found (std-ui and tooling)

1. **`@searchParam`/`@routeParam` are not readable in `connect()`.** The getters are defined by a hook that runs after `connect()`, so the value is `undefined` there, and a signal effect created in `connect()` never re-runs. Workaround: create dependent effects in `firstRendered()`. Upstream options: define the getters in `beforeConnect`, or document it.
2. **The root `M:\Workspace\iam\package.json` declares `workspaces: ["workspaces/*"]`.** `iam-next` is auto-included and a plain `npm install` fails on the Angular app's peer dependency conflicts. Workaround: `npm install --workspaces=false --include-workspace-root=false`. A cleaner fix is to narrow the root `workspaces` list or move the new app out.
3. **TypeScript 5.x cannot type-check std-ui source.** The router needs the Navigation API types that ship with TS 7. `iam-next` uses `typescript ^7.0.2`, like std-ui.
4. **std-ui is not published.** It is consumed through relative path aliases. Before Phase 1, decide between a published or linked package and keep versions pinned.
5. **Real docs put the `---` head meta after the `# Title` line, not at the top.** The new `splitHeadMeta` handles both layouts (covered by a test).
6. **Security note:** `html: true` plus `unsafeHtml` renders raw HTML from docs. This matches the old app, but it is only safe while the data repo is trusted. Decide on sanitizing before editing or sharing features are added.

## Phase 0 exit criteria

- [x] The slice runs against the real data repo.
- [x] Build, typecheck and test pipeline works.
- [x] G1, G6, G7, G12 resolved or scoped.
- [ ] Open for you: fix the root `workspaces` setting; decide how std-ui is consumed (item 4).

## Suggested adjustments to the plan

- Phase 1: add a keep-alive/route-cache and preload task (G6) to the std-ui side, and a note that `@searchParam` needs the `beforeConnect` fix or the `firstRendered` workaround.
- Phase 2: the GitHub client port is a real port, not a copy. Start from `fetch` and the `getDocRaw` pattern, then add authenticated calls (issues, contents, commits) with the interceptor-style wrapper.
- Replace "adopt vs build" in Phase 0 with the decision above, and drop the in-house `iam-ui` set except for IAM-specific pieces (split pane, bottom navigation, float button).
