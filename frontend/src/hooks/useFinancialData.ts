import { useEffect, useState } from "react";

import { fetchFinancialMovements } from "@/api/financial-api";
import type { KPIMetrics, MonthlyDataPoint } from "@/lib/financial-types";
import {
  computeKPIs,
  computeMonthlyData,
  derivePeriodLabel,
} from "@/lib/financial-utils";

const LOAD_ERROR_MESSAGE =
  "Could not load financial data. Check that the backend API is running.";

export function useFinancialData() {
  const [metrics, setMetrics] = useState<KPIMetrics | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyDataPoint[]>([]);
  const [periodLabel, setPeriodLabel] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    fetchFinancialMovements(controller.signal)
      .then((movements) => {
        if (cancelled) return;

        setMetrics(computeKPIs(movements));
        setMonthlyData(computeMonthlyData(movements));
        setPeriodLabel(derivePeriodLabel(movements));
      })
      .catch((cause: unknown) => {
        if (cancelled || controller.signal.aborted) return;

        console.error("Failed to load financial data:", cause);
        setError(LOAD_ERROR_MESSAGE);
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return { metrics, monthlyData, periodLabel, loading, error };
}
