# Web Awesome coverage of IAM's Angular Material / CDK usage

Web Awesome `@awesome.me/webawesome` 3.15.0, MIT licensed. Registered components live in `iam-next/src/ui/components.ts`.

| IAM uses (Angular) | Replacement | Status |
|---|---|---|
| `MatDialog` (message-dialog) | `confirm()` / `alert()` in `src/ui/dialogs.ts`, on `<wa-dialog>` | Done, verified in browser |
| `dialog-spinner` | `busy()` in `src/ui/dialogs.ts` (blocking dialog + `<wa-spinner>`) | Done, verified |
| `MatBottomSheet` | `bottomSheet()` in `src/ui/dialogs.ts`, on `<wa-drawer placement="bottom">` | Done, verified |
| `MatSnackBar` | `snackbar()` in `src/ui/snackbar.ts`, on `<wa-toast>`; supports variant, duration, action button | Done, verified |
| `cdk/layout` BreakpointObserver | `mediaQuery()` / `isHandset()` in `src/ui/media.ts` (signals) | Done, tested |
| Material theming | `src/ui/theme.ts`: light/dark/system, persisted, `wa-dark` class | Done, tested |
| `split-pane` (custom, 7 files) | `<wa-split-panel>` directly | Covered, in gallery |
| `bottom-navigation` | `<iam-bottom-nav>` (`src/ui/bottom-nav.ts`) | Done, tested (`isActive`) |
| `float-button` (ngc) | `<iam-float-button>` speed dial (`src/ui/float-button.ts`) | Done, verified |
| `mat-input`, form-field | `<wa-input>` (needs binding to `ext` form state) | Component available; form wiring pending |
| `mat-slide-toggle` | `<wa-switch>` | Available |
| `mat-chips` | `<wa-tag>` (`removable`) / `<wa-tag-input>` | Available |
| `mat-tabs` | `<wa-tab-group>` | Available, in gallery |
| `mat-card`, `mat-toolbar`, `mat-list` | `<wa-card>`; toolbar and list are plain markup | Available |
| `mat-progress-bar` / spinner | `<wa-progress-bar>`, `<wa-spinner>` | Available |
| `mat-tooltip` | `<wa-tooltip>` | Available |
| `mat-menu` | `<wa-dropdown>` + `<wa-dropdown-item>` | Available |
| `mat-sidenav` | `<wa-drawer placement="start">`, or `<wa-page>` for the shell | Available |
| `mat-expansion` | `<wa-details>` / `<wa-accordion>` | Available |
| `mat-tree` / `cdk/tree` (doc-tree) | `<wa-tree>` + `<wa-tree-item>` (lazy loading supported) | Available; needs a data adapter (Phase 6) |
| `mat-autocomplete` | **Gap.** `<wa-select>` is not free-text. Needs `<wa-input>` + `<wa-popup>`/`<wa-popover>` or `<wa-dropdown>` | To build when search (Phase 6) needs it |
| `cdk/drag-drop` | **Gap.** No equivalent | Small reorder helper (native drag events) if still needed |
| `cdk-experimental/scrolling` | std-ui `virtualize` directive | Covered |
| `mat-icon` | `<wa-icon>` (system icons inline; named icons are fetched from the asset base path) | See note |

## Notes

- **Icons:** `wa-icon` with a name loads its SVG from the base path set in `main.ts` (`/node_modules/...` in dev). A production build does not ship those files. Before cutover, copy `node_modules/@awesome.me/webawesome/dist/assets` into the build and point `setBasePath` at it, or register an inline icon set. The current UI uses no named icons.
- **Bundle size:** with the Phase 1 components registered, the production bundle is about 150 kB gzip JS and 15 kB gzip CSS. Register only the components used; split heavy ones by route if the budget matters.
- **Gaps left:** autocomplete and drag-drop only. Both are Phase 6 concerns.
