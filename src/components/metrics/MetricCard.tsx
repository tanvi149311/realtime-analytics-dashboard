/**
 * @file components/metrics/MetricCard.tsx
 * @description Displays a single metric with its trend direction,
 * percentage change, and description. Fully reusable and type-safe.
 */

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { type MetricData, type TrendDirection } from "../../types";

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────

/**
 * Returns Tailwind color classes based on trend direction.
 * Keeping this outside the component avoids recreation on each render.
 */
const getTrendStyles = (trend: TrendDirection): string => {
  const styles: Record<TrendDirection, string> = {
    up:      "text-green-500",
    down:    "text-red-500",
    neutral: "text-slate-400",
  };
  return styles[trend];
};

/**
 * Returns the correct icon component based on trend direction.
 */
const TrendIcon = ({ trend }: { trend: TrendDirection }) => {
  const iconProps = { size: 16, className: getTrendStyles(trend) };
  if (trend === "up")      return <TrendingUp {...iconProps} />;
  if (trend === "down")    return <TrendingDown {...iconProps} />;
  return <Minus {...iconProps} />;
};

/**
 * Formats a number for display.
 * e.g. 1284 → "1,284" | 48295 → "48,295"
 */
const formatValue = (value: number, unit?: string): string => {
  const formatted = value.toLocaleString("en-US");
  return unit === "$" ? `${unit}${formatted}` : `${formatted}${unit ?? ""}`;
};

// ─────────────────────────────────────────
// PROPS
// ─────────────────────────────────────────

interface MetricCardProps {
  /** The metric data to display */
  metric: MetricData;
  /** Optional extra classes for layout control */
  className?: string;
}

// ─────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────

/**
 * MetricCard
 * Displays a single KPI metric with trend indicator.
 *
 * @example
 * <MetricCard metric={activeUsersData} />
 */
const MetricCard = ({ metric, className = "" }: MetricCardProps) => {
  const {
    label,
    value,
    unit,
    trend,
    changePercent,
    description = "compared to yesterday",
  } = metric;

  return (
    <div
      className={`
        bg-white rounded-2xl p-5 shadow-sm border border-slate-100
        hover:shadow-md transition-shadow duration-200
        ${className}
      `}
    >
      {/* Card Header */}
      <p className="text-sm font-medium text-slate-500 mb-1">
        {label}
      </p>

      {/* Main Value */}
      <h3 className="text-3xl font-bold text-slate-800 mb-3">
        {formatValue(value, unit)}
      </h3>

      {/* Trend Row */}
      <div className="flex items-center gap-1.5">
        <TrendIcon trend={trend} />
        <span className={`text-sm font-semibold ${getTrendStyles(trend)}`}>
          {changePercent > 0 ? "+" : ""}{changePercent}%
        </span>
        <span className="text-xs text-slate-400">{description}</span>
      </div>
    </div>
  );
};

export default MetricCard;
