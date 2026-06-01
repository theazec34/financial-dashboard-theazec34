/**
 * Date string in ISO format YYYY-MM-DD.
 */
export type ISODateString = string;

/**
 * Supported operation types in metrics endpoints.
 */
export type OperationType = "income" | "outcome";

/**
 * Supported business lines.
 */
export type BusinessType = "B2B" | "B2C";

/**
 * Supported financial categories returned by the API.
 */
export type Category = "suppliers" | "sales" | "operational" | "administrative" | "others";

/**
 * Time bucketing accepted by summary and alerts endpoints.
 */
export type GroupBy = "day" | "week" | "month";

/**
 * Response payload from GET /api/metrics/facets.
 * Provides available filter values and full date range in the dataset.
 */
export interface FacetsResponse {
  /** Distinct operation types available in the dataset. */
  operation_types: OperationType[];
  /** Distinct business lines available in the dataset. */
  business_types: BusinessType[];
  /** Distinct categories available in the dataset. */
  categories: Category[];
  /** Oldest record date available in the dataset. Format: YYYY-MM-DD. */
  min_date: ISODateString;
  /** Most recent record date available in the dataset. Format: YYYY-MM-DD. */
  max_date: ISODateString;
}

/**
 * One anomaly row returned by GET /api/metrics/alerts.
 */
export interface AlertEntry {
  /** Period label based on group_by (for example 2026-05 or 2026-W22). */
  period: string;
  /** Outcome total for the evaluated period. */
  outcome_total: number;
  /** Baseline average used to compare the current period. */
  baseline_average: number;
  /** Relative increase ratio versus baseline (for example 0.35 = +35%). */
  increase_ratio: number;
}

/**
 * Full alerts response payload from GET /api/metrics/alerts.
 */
export type AlertsResponse = AlertEntry[];

/**
 * One category entry returned by GET /api/metrics/categories/top.
 */
export interface CategoryEntry {
  /** Category identifier. */
  category: Category;
  /** Operation type used in the query. */
  operation_type: OperationType;
  /** Total amount aggregated for the category. */
  total_amount: number;
}

/**
 * Full response payload from GET /api/metrics/categories/top.
 */
export type TopCategoriesResponse = CategoryEntry[];
