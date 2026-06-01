# Component breakdown

This document defines the frontend component split for the three requested features.
It specifies responsibilities and data flow only (no implementation code).

## Shared building blocks

- DateRangeFilterBar
  - Renders start/end date inputs.
  - Shows available range hint from facets.
  - Emits validated filter changes.
- AvailableRangeHint
  - Displays `min_date` and `max_date` from facets.
- EmptyStatePanel
  - Reusable empty state block for tables/charts.

## Feature 1: Dashboard date range filter

- DashboardHeaderFilters
  - Container at top of dashboard.
  - Composes DateRangeFilterBar + AvailableRangeHint.
- useDashboardFilters (hook)
  - Stores selected `start_date` and `end_date`.
  - Handles invalid range state (`start_date > end_date`).
- useFinancialData (existing hook, extended)
  - Accepts DateRangeFilter.
  - Sends date filters to backend requests.

### Data contract

- Reads facets with `FacetsResponse`.
- Sends filters with `DateRangeFilter`.

## Feature 2: Outcome anomaly alerts table

- AlertsSection
  - Wraps threshold input and alert table.
  - Manages loading, empty and error states.
- AlertThresholdInput
  - Numeric input for `threshold`.
  - Enforces UI range 0.01..1.0.
- AlertsTable
  - Columns: period, outcome_total, baseline_average, increase_ratio.
  - Uses EmptyStatePanel when there are no anomalies.
- useAlertsData (hook)
  - Accepts `AlertsParams`.
  - Fetches alert rows from backend.

### Data contract

- Sends query with `AlertsParams`.
- Renders rows from `AlertsResponse`.

## Feature 3: B2B vs B2C comparison view

- ComparisonPage
  - Dedicated route/page for comparative analysis.
  - Includes filter bar + two top-category tables + one comparison chart.
- BusinessTopCategoriesPanel
  - Generic panel used twice: B2B and B2C.
  - Renders table with category, amount and percentage.
- B2BvsB2CIncomeChart
  - Single visual comparing total income per business line.
- useTopCategoriesByBusiness (hook)
  - Requests top income categories for B2B and B2C.
  - Calculates percentage over group total in frontend.

### Data contract

- Reads available range using `FacetsResponse`.
- Sends query with `TopCategoriesParams`.
- Reads rows using `TopCategoriesResponse`.

## Composition notes

- Keep API calls in `src/api/`.
- Keep stateful orchestration in hooks under `src/hooks/`.
- Keep table and chart components presentational.
- Keep date filter shape shared by all three features using `DateRangeFilter`.
