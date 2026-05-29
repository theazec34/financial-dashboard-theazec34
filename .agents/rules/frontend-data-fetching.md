# Frontend data fetching

Apply when reading or writing data from the backend in the React app.

## Current flow

1. `fetchFinancialMovements()` in `src/api/financial-api.ts` calls `GET /api/metrics`
2. `useFinancialData()` in `src/hooks/useFinancialData.ts` orchestrates fetch + derived state
3. Components receive `{ metrics, monthlyData, periodLabel, loading, error }`

## Rules

### DO: pass `AbortSignal` to every `fetch`

```ts
export async function fetchFinancialMovements(signal?: AbortSignal) {
  const response = await fetch(`${API_BASE_URL}/api/metrics`, { signal });
  // ...
}
```

### DO: abort and guard in `useEffect` cleanup

```ts
useEffect(() => {
  const controller = new AbortController();
  let cancelled = false;

  fetchFinancialMovements(controller.signal)
    .then(/* skip if cancelled */)
    .catch(/* skip if cancelled or aborted */);

  return () => {
    cancelled = true;
    controller.abort();
  };
}, []);
```

This prevents state updates after unmount and handles React StrictMode double-mounting.

### DO: log the original error in development

```ts
.catch((cause: unknown) => {
  console.error("Failed to load financial data:", cause);
  setError(LOAD_ERROR_MESSAGE);
});
```

Show users a stable, actionable message. Log the real cause for debugging.

### DO: use `VITE_API_BASE_URL` only in the API layer

```ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
```

Never read `import.meta.env` inside components or hooks directly.

### DO: throw typed errors from the API layer

```ts
if (!response.ok) {
  throw new Error(`API request failed (${response.status})`);
}
```

Hooks map errors to UI state; they do not parse HTTP responses.

### DON'T: swallow errors silently

```ts
// Bad
.catch(() => setError("Something went wrong"));
```

### DON'T: fetch inside presentational components

Charts and KPI cards receive data via props. Only hooks (or future route loaders) fetch data.

## Adding filters (future)

When the UI supports date/category filters:

1. Add optional params to `fetchFinancialMovements({ startDate, endDate, category, signal })`
2. Build query string in the API layer
3. Extend `useFinancialData(filters)` — reset `loading` when filters change
4. Re-run the effect when filter deps change
5. Document in `frontend/README.md`

## Environment

Local dev uses the Vite proxy (`vite.config.ts` → `backend:8000`). No `.env` required unless pointing to a different backend origin (`frontend/.env.example`).
