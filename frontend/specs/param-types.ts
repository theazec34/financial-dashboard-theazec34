import type { BusinessType, GroupBy, ISODateString, OperationType } from "./api-types";

/**
 * Shared date range filters used by multiple dashboard features.
 */
export interface DateRangeFilter {
  /** Optional inclusive start date. Format: YYYY-MM-DD. */
  start_date?: ISODateString;
  /** Optional inclusive end date. Format: YYYY-MM-DD. */
  end_date?: ISODateString;
}

/**
 * Query params for GET /api/metrics/alerts.
 */
export interface AlertsParams extends DateRangeFilter {
  /**
   * Minimum increase ratio to classify an alert.
   * API constraint: >= 0 (docs).
   * Product UX recommendation: between 0.01 and 1.0.
   */
  threshold?: number;
  /** Optional period grouping. Valid values: day, week, month. */
  group_by?: GroupBy;
  /** Optional business line filter. Valid values: B2B, B2C. */
  business_type?: BusinessType;
}

/**
 * Query params for GET /api/metrics/categories/top.
 */
export interface TopCategoriesParams extends DateRangeFilter {
  /** Optional operation filter. Valid values: income, outcome. */
  operation_type?: OperationType;
  /** Optional maximum number of categories. API range: 1..20, default 5. */
  limit?: number;
  /** Optional business line filter. Valid values: B2B, B2C. */
  business_type?: BusinessType;
}
