import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { IncomeOutcomeChart } from "@/components/dashboard/income-outcome-chart";
import { KPIRow } from "@/components/dashboard/kpi-row";
import { ProfitPercentChart } from "@/components/dashboard/profit-percent-chart";
import { useFinancialData } from "@/hooks/useFinancialData";

function App() {
  const { metrics, monthlyData, periodLabel, loading, error } =
    useFinancialData();

  return (
    <main className="dark min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <DashboardHeader period={periodLabel || "Loading period..."} />

          {error ? (
            <div
              role="alert"
              className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive-foreground"
            >
              {error}
            </div>
          ) : null}

          <section aria-label="Key performance indicators">
            <KPIRow metrics={metrics} loading={loading} />
          </section>

          <section
            aria-label="Financial charts"
            className="grid grid-cols-1 gap-4 xl:grid-cols-2"
          >
            <IncomeOutcomeChart data={monthlyData} loading={loading} />
            <ProfitPercentChart data={monthlyData} loading={loading} />
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
