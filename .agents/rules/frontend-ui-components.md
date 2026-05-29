# Frontend UI components

Apply when building or editing dashboard and shared UI under `frontend/src/components/`.

## Component categories

| Category | Location | Examples |
|----------|----------|----------|
| Dashboard | `components/dashboard/` | `KPIRow`, `IncomeOutcomeChart`, `DashboardHeader` |
| Shared dashboard | `components/dashboard/` | `ChartTooltip` |
| Primitives | `components/ui/` | `Card`, `Skeleton` |

## Rules

### DO: handle `loading` and empty data in every data-driven component

Pattern used in `KPICard`, `IncomeOutcomeChart`, and `ProfitPercentChart`:

1. If `loading` → render skeleton
2. If no meaningful data → render empty state message
3. Otherwise → render chart/content

### DO: reuse shared subcomponents

Chart tooltips use `ChartTooltip` from `components/dashboard/chart-tooltip.tsx`. Do not copy tooltip JSX into new charts.

```tsx
<Tooltip content={<ChartTooltip valueFormatter={(v) => formatCurrency(v)} />} />
```

### DO: use semantic headings

- One `<h1>` in `DashboardHeader`
- Card/chart titles use `CardTitle` (renders `<h3>`)
- Section landmarks use `<section aria-label="...">`

### DO: use design tokens from `index.css`

Colors for charts and badges:

- `var(--chart-income)`, `var(--chart-outcome)`, `var(--chart-profit)`
- Tailwind semantic classes: `bg-background`, `text-muted-foreground`, `border-border`

Do not hardcode hex colors in dashboard components.

### DO: keep components presentational

Dashboard components accept typed props (`KPIMetrics`, `MonthlyDataPoint[]`, `loading`, `error` is handled at App level). No `fetch` inside chart or KPI files.

### DO: use `cn()` for conditional classes

From `@/lib/utils` — same pattern as shadcn/ui.

### DON'T: use unlabeled `<div>` for critical titles

`CardTitle` must remain a heading element, not a generic div.

### DON'T: mix languages in user-visible strings

UI copy is **English** (labels, errors, empty states). If i18n is added later, centralize strings in a `lib/messages.ts` or i18n library — do not scatter Spanish/English randomly.

### DON'T: import from deleted or test-only mock files

Production data comes from the API via hooks. Test fixtures live inside `*.test.ts` files.

## Error display

Errors are shown once at the App level with `role="alert"`. Individual components should not duplicate global error banners unless showing field-level validation (not used today).

## Theming

The app currently forces dark mode via `className="dark"` on `<main>`. When adding a theme toggle:

- Extract to `useTheme` hook
- Apply class on `html` or `main`
- Do not duplicate color values; keep using CSS variables

## Adding a new chart

1. Create `components/dashboard/<name>-chart.tsx`
2. Reuse `Card`, `Skeleton`, `ChartTooltip`
3. Accept `data` + `loading` props
4. Register in `App.tsx` inside the charts `<section>`
5. Add changelog row in `frontend/README.md`
