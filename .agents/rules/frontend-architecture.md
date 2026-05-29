# Frontend architecture

Apply these rules when creating or modifying files under `frontend/src/`.

## Layer responsibilities

| Layer | Path | Responsibility |
|-------|------|----------------|
| API | `src/api/` | HTTP calls, base URL, query params, typed responses |
| Hooks | `src/hooks/` | React state, effects, derived data for components |
| Utils | `src/lib/` | Pure functions (KPIs, formatting, labels) + unit tests |
| Dashboard UI | `src/components/dashboard/` | Business components (KPIs, charts, header) |
| Primitives | `src/components/ui/` | Reusable UI building blocks |
| App shell | `src/App.tsx` | Layout and composition only |

## Rules

### DO: keep `App.tsx` as a composition root

`App.tsx` must not contain `fetch`, business calculations, or multi-step state logic.

```tsx
// Good — current pattern
function App() {
  const { metrics, monthlyData, periodLabel, loading, error } = useFinancialData();
  return (/* layout only */);
}
```

```tsx
// Bad — avoid reverting to this
function App() {
  useEffect(() => { fetch(...).then(data => computeKPIs(data)) }, []);
}
```

### DO: add new API endpoints in `src/api/`

One file per domain is fine (`financial-api.ts`). Export named async functions that accept an optional `AbortSignal`.

### DO: add reusable stateful logic in `src/hooks/`

Name hooks `use<Feature>`. Return a stable object: `{ data, loading, error, ... }`.

### DO: keep calculations in `src/lib/`

Functions like `computeKPIs`, `computeMonthlyData`, and `derivePeriodLabel` stay pure and are covered by Vitest.

### DON'T: leave unused files

Remove dead code (e.g. orphaned mock datasets). If mocks are needed for tests, colocate them in `*.test.ts`.

### DON'T: duplicate logic between frontend and backend unnecessarily

Today the dashboard aggregates raw movements client-side. That is acceptable while only `/api/metrics` is consumed. When adding filters or summary views, prefer extending `financial-api.ts` and the hook before recomputing in multiple components.

## File checklist for new features

1. Type in `lib/financial-types.ts` (if new shape)
2. API function in `src/api/`
3. Hook update or new hook in `src/hooks/`
4. Presentational component in `src/components/dashboard/`
5. Wire in `App.tsx`
6. Document the change in `frontend/README.md` changelog table
