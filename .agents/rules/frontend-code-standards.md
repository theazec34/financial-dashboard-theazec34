# Frontend code standards

Cross-cutting conventions for TypeScript, tests, and tooling in `frontend/`.

## TypeScript

### DO: define shared domain types in `lib/financial-types.ts`

Use string union types for enums (`OperationType`, `Category`, `BusinessType`).

### DO: use path alias `@/` for imports

```ts
import { useFinancialData } from "@/hooks/useFinancialData";
```

Matches `vite.config.ts`, `tsconfig.app.json`, and `components.json`.

### DO: use `type` imports when importing types only

```ts
import { type FinancialMovement } from "@/lib/financial-types";
```

Required by `verbatimModuleSyntax: true`.

### DON'T: use `any`

Prefer `unknown` in catch blocks and narrow with `instanceof Error`.

## Testing

### DO: unit-test pure functions in `lib/`

Vitest files sit next to source: `financial-utils.test.ts`.

Cover:

- Happy path
- Edge cases (empty input, zero income, cross-year months)
- Formatters

### DO: add tests when adding util functions

Example: `derivePeriodLabel` tests full-year and partial-range labels.

### SHOULD: add component tests for new interactive UI

Not required for every PR today, but preferred for filters, forms, or complex state. Use Testing Library when introduced.

Run tests:

```bash
cd frontend && npm run test
```

## Lint and build

Before finishing frontend work:

```bash
npm run lint
npm run test
npm run build
```

## Style consistency

| Topic | Standard |
|-------|----------|
| Quotes | Double quotes in `api/`, `hooks/`, `lib/`, `App.tsx` |
| Quotes in dashboard/ui | Single quotes (existing shadcn-style files) — acceptable split until Prettier is added |
| File naming | kebab-case for components: `kpi-row.tsx`, `chart-tooltip.tsx` |
| Hook naming | camelCase with `use` prefix: `useFinancialData.ts` |
| API functions | verb + noun: `fetchFinancialMovements` |

Future improvement: add Prettier with a single quote rule for the whole frontend.

## Configuration hygiene

- `index.html` title must reflect the product name
- `components.json` aliases (`@/hooks`) must match real folders — create the folder when adding a new alias target
- Document env vars in `.env.example` only; never commit `.env`

## Documentation duty

Every meaningful frontend change adds a row to the changelog table in `frontend/README.md`:

| Cambio | Archivos | Justificación |

This keeps the team aligned and gives agents historical context for why code is structured a certain way.

## Anti-patterns → replacements (quick reference)

| Avoid | Use instead |
|-------|-------------|
| Fetch in `App.tsx` | `src/api/` + `src/hooks/` |
| Hardcoded period string | `derivePeriodLabel(movements)` |
| Duplicated chart tooltip JSX | `ChartTooltip` component |
| Orphan mock data files | API + test fixtures in `*.test.ts` |
| Silent `.catch(() => {})` | `console.error` + user-facing message |
| `setState` without cleanup | `AbortController` + cancelled flag |
| Mixed ES/EN UI strings | English until i18n is implemented |
| Generic `<div>` titles | `CardTitle` (`<h3>`) or proper heading level |
