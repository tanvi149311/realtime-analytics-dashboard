/**
 * @file components/metrics/MetricsGrid.tsx
 * @description Renders a responsive grid of MetricCards.
 * Separating the grid from the card keeps each component focused.
 */

import MetricCard from "./MetricCard";
import { type MetricData } from "../../types";

// ─────────────────────────────────────────
// PROPS
// ─────────────────────────────────────────

interface MetricsGridProps {
  /** Array of metric data to display as cards */
  metrics: MetricData[];
}

// ─────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────

/**
 * MetricsGrid
 * Renders metric cards in a responsive 2 or 4 column grid.
 *
 * @example
 * <MetricsGrid metrics={metricsArray} />
 */
const MetricsGrid = ({ metrics }: MetricsGridProps) => {
  if (metrics.length === 0) {
    return (
      <p className="text-slate-400 text-sm text-center py-8">
        No metrics available.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
};

export default MetricsGrid;
