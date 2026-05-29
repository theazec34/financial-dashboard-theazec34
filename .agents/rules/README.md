# Frontend rules index

Agents and developers working on the dashboard **must read these rules** before editing `frontend/`.

| Rule file | When to apply |
|-----------|---------------|
| [frontend-architecture.md](./frontend-architecture.md) | New files, refactors, where to put API/hooks/utils |
| [frontend-data-fetching.md](./frontend-data-fetching.md) | `fetch`, hooks, loading/error state, API params |
| [frontend-ui-components.md](./frontend-ui-components.md) | Dashboard components, charts, accessibility, theming |
| [frontend-code-standards.md](./frontend-code-standards.md) | TypeScript, tests, lint, changelog, anti-patterns |

## Living documentation

Implementation history and justified changes: [`frontend/README.md`](../../frontend/README.md)

## Validation checklist

Before marking frontend work complete:

- [ ] Code follows the layer split (`api/` → `hooks/` → components → `App.tsx`)
- [ ] Data effects use `AbortController` cleanup
- [ ] No dead files or duplicated UI blocks
- [ ] Pure logic has or updates Vitest coverage
- [ ] Changelog row added to `frontend/README.md`
- [ ] `npm run test`, `npm run lint`, and `npm run build` pass in `frontend/`
