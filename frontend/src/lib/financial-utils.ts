import {
  type FinancialMovement,
  type KPIMetrics,
  type MonthlyDataPoint,
} from "./financial-types";

function toYearMonthKey(value: Date): string {
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}`;
}

function formatMonthYearLabel(yearMonthKey: string): string {
  const [yearText, monthText] = yearMonthKey.split("-");
  const year = Number(yearText);
  const month = Number(monthText) - 1;
  return new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function computeKPIs(movements: FinancialMovement[]): KPIMetrics {
  let totalIncome = 0;
  let totalOutcome = 0;

  for (const movement of movements) {
    if (movement.operation_type === "income") {
      totalIncome += movement.amount;
    } else {
      totalOutcome += movement.amount;
    }
  }

  const profit = totalIncome - totalOutcome;
  const profitPercent = totalIncome > 0 ? (profit / totalIncome) * 100 : 0;

  return { totalIncome, totalOutcome, profit, profitPercent };
}

export function computeMonthlyData(
  movements: FinancialMovement[],
): MonthlyDataPoint[] {
  const monthlyMap: Record<string, { income: number; outcome: number }> = {};

  for (const m of movements) {
    const yearMonthKey = toYearMonthKey(new Date(m.create_date));
    if (!monthlyMap[yearMonthKey]) {
      monthlyMap[yearMonthKey] = { income: 0, outcome: 0 };
    }

    if (m.operation_type === "income") {
      monthlyMap[yearMonthKey].income += m.amount;
    } else {
      monthlyMap[yearMonthKey].outcome += m.amount;
    }
  }

  return Object.keys(monthlyMap)
    .sort()
    .map((yearMonthKey) => {
      const { income, outcome } = monthlyMap[yearMonthKey];
      const profit = income - outcome;
      const profitPercent = income > 0 ? (profit / income) * 100 : 0;
      return {
        month: formatMonthYearLabel(yearMonthKey),
        income,
        outcome,
        profitPercent,
      };
    });
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

function toDate(value: string): Date {
  return new Date(value);
}

function formatMonthYear(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function derivePeriodLabel(movements: FinancialMovement[]): string {
  if (movements.length === 0) {
    return "No data";
  }

  const sortedDates = movements
    .map((movement) => toDate(movement.create_date))
    .sort((left, right) => left.getTime() - right.getTime());

  const start = sortedDates[0];
  const end = sortedDates[sortedDates.length - 1];
  const sameYear = start.getFullYear() === end.getFullYear();
  const fullYear =
    sameYear && start.getMonth() === 0 && end.getMonth() === 11;

  if (fullYear) {
    return `${start.getFullYear()} — Full Year`;
  }

  return `${formatMonthYear(start)} – ${formatMonthYear(end)}`;
}
