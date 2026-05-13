/**
 * @file App.tsx
 * @description Root application component.
 * Composes layout, live data hooks, and dashboard sections.
 */

import Header from "./components/layout/Header";
import MetricsGrid from "./components/metrics/MetricsGrid";
import ChartCard from "./components/charts/ChartCard";
import LineChart from "./components/charts/LineChart";
import useMetrics from "./hooks/useMetrics";
import useChartData from "./hooks/useChartData";

// ─────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────

/**
 * App
 * Root component — wires together the header,
 * live metrics, and live chart sections.
 */
const App = () => {
  const { metrics, status } = useMetrics();
  const { chartData }       = useChartData();

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Top Navigation */}
      <Header status={status} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 pb-8">

        {/* Metrics Section */}
        <section aria-label="Key Metrics" className="mb-8">
          <h2 className="text-sm font-semibold text-slate-500
                         uppercase tracking-wider mb-4">
            Key Metrics
          </h2>
          <MetricsGrid metrics={metrics} />
        </section>

        {/* Chart Section */}
        <section aria-label="Live Charts">
          <h2 className="text-sm font-semibold text-slate-500
                         uppercase tracking-wider mb-4">
            Live Activity
          </h2>
          <ChartCard
            title="Page Views & Revenue"
            subtitle="Updates every 2 seconds — last 20 data points"
          >
            <LineChart series={chartData} height={300} />
          </ChartCard>
        </section>

      </main>
    </div>
  );
};

export default App;