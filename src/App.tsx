/**
 * @file App.tsx
 * @description Root application component.
 * Wires together layout, metrics, and charts.
 */

import MetricsGrid from "./components/metrics/MetricsGrid";
import { type MetricData } from "./types";

// ─────────────────────────────────────────
// MOCK DATA (we'll replace with live data later)
// ─────────────────────────────────────────

const MOCK_METRICS: MetricData[] = [
  {
    id: "active_users",
    label: "Active Users",
    value: 1284,
    trend: "up",
    changePercent: 12.5,
    description: "compared to yesterday",
  },
  {
    id: "revenue",
    label: "Revenue",
    value: 48295,
    unit: "$",
    trend: "up",
    changePercent: 8.2,
    description: "compared to yesterday",
  },
  {
    id: "page_views",
    label: "Page Views",
    value: 94210,
    trend: "down",
    changePercent: -3.1,
    description: "compared to yesterday",
  },
  {
    id: "conversion",
    label: "Conversion Rate",
    value: 3.6,
    unit: "%",
    trend: "neutral",
    changePercent: 0,
    description: "no change today",
  },
];

// ─────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Analytics Dashboard
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Real-time metrics and insights
        </p>
      </div>

      {/* Metrics Section */}
      <section aria-label="Key Metrics">
        <MetricsGrid metrics={MOCK_METRICS} />
      </section>
    </div>
  );
};

export default App;
