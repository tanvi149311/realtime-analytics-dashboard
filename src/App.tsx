/**
 * @file App.tsx
 * @description Root application component.
 * Composes layout, live data hook, and dashboard sections.
 */

import Header from "./components/layout/Header";
import MetricsGrid from "./components/metrics/MetricsGrid";
import useMetrics from "./hooks/useMetrics";

// ─────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────

/**
 * App
 * Root component — wires together the header,
 * live metrics hook, and metrics grid.
 */
const App = () => {
  // All live data logic lives in the hook — App stays clean
  const { metrics, status } = useMetrics();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <Header status={status} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 pb-8">

        {/* Metrics Section */}
        <section aria-label="Key Metrics">
          <h2 className="text-sm font-semibold text-slate-500 uppercase
                         tracking-wider mb-4">
            Key Metrics
          </h2>
          <MetricsGrid metrics={metrics} />
        </section>

      </main>
    </div>
  );
};

export default App;