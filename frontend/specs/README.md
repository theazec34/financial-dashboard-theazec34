# Frontend specs: data contract

Scope: final specifications for the three dashboard features.
Verified against backend OpenAPI at `/docs` and `/openapi.json`.

## 1) Date range filter (main dashboard)

### Endpoints consumed

- `GET /api/metrics/facets`
  - Purpose: obtain valid date range (`min_date`, `max_date`).
- `GET /api/metrics`
  - Purpose: load dashboard data filtered by date range.

### Request and response types

- Request params
  - `DateRangeFilter` (`start_date`, `end_date`).
- Response
  - `FacetsResponse` for `/api/metrics/facets`.

### Valid values and restrictions

- `start_date` and `end_date`
  - Optional.
  - ISO date string in `YYYY-MM-DD` format.
  - UI must prevent invalid range submissions where `start_date > end_date`.

### Edge cases and expected UI behavior

- Edge case A: both dates empty.
  - UI behavior: show full dataset (no date filtering).
- Edge case B: range has no records.
  - UI behavior: show dashboard empty states (not broken charts) and keep filters visible.
- Edge case C: start date after end date.
  - UI behavior: show validation message and skip request until range is valid.

## 2) Anomaly alerts table (main dashboard)

### Endpoints consumed

- `GET /api/metrics/alerts`
  - Query params in docs: `threshold`, `group_by`, `start_date`, `end_date`, `business_type`.

### Request and response types

- Request params
  - `AlertsParams`.
- Response
  - `AlertsResponse` (array of `AlertEntry`).

### Valid values and restrictions

- `threshold`
  - API allows values `>= 0`.
  - Product input should be constrained to `0.01..1.0` (default `0.3`).
- `group_by`
  - Allowed values: `day`, `week`, `month`.
- `start_date`, `end_date`
  - Optional date range in `YYYY-MM-DD`.
- `business_type`
  - Optional; valid values `B2B` or `B2C`.

### Edge cases and expected UI behavior

- Edge case A: no anomalies for current threshold.
  - UI behavior: explicit empty state message in the table area.
- Edge case B: threshold out of allowed UI range.
  - UI behavior: inline validation, do not send invalid request.
- Edge case C: date range is active.
  - UI behavior: alerts table must respect the same range used by feature 1.

## 3) B2B vs B2C comparison view

### Endpoints consumed

- `GET /api/metrics/categories/top`
  - Query params in docs: `operation_type`, `limit`, `start_date`, `end_date`, `business_type`.
- `GET /api/metrics/facets`
  - Purpose: show available date range for comparison filters.

### Request and response types

- Request params
  - `TopCategoriesParams`.
- Response
  - `TopCategoriesResponse` (array of `CategoryEntry`).
  - `FacetsResponse` for date range metadata.

### Valid values and restrictions

- `operation_type`
  - Allowed values: `income`, `outcome`.
  - For this feature, use `income`.
- `limit`
  - API allows `1..20`.
  - For this feature, fixed value `5`.
- `start_date`, `end_date`
  - Optional date range in `YYYY-MM-DD`.
- `business_type`
  - Required per request context: `B2B` for left table, `B2C` for right table.

### Edge cases and expected UI behavior

- Edge case A: one business line returns zero rows.
  - UI behavior: show empty state in that table and keep the other table visible.
- Edge case B: total income is 0 for a business line.
  - UI behavior: show percentage as `0%` (avoid divide-by-zero display errors).
- Edge case C: very narrow range (for example one day).
  - UI behavior: both tables and chart render with sparse data without layout collapse.

## File map

- `frontend/specs/api-types.ts`
- `frontend/specs/param-types.ts`
- `frontend/specs/components.md`
- `frontend/specs/README.md`
