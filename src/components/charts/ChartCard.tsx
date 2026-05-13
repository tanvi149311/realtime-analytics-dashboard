/**
 * @file components/charts/ChartCard.tsx
 * @description A reusable card wrapper for charts.
 * Provides consistent title, subtitle, and padding.
 */

import { type ReactNode } from "react";

// ─────────────────────────────────────────
// PROPS
// ─────────────────────────────────────────

interface ChartCardProps {
  /** Chart title displayed at the top */
  title: string;
  /** Optional subtitle or description */
  subtitle?: string;
  /** The chart component to render inside */
  children: ReactNode;
  /** Optional extra classes */
  className?: string;
}

// ─────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────

/**
 * ChartCard
 * Wraps any chart in a consistent card UI.
 *
 * @example
 * <ChartCard title="Page Views" subtitle="Last 20 points">
 *   <LineChart ... />
 * </ChartCard>
 */
const ChartCard = ({
  title,
  subtitle,
  children,
  className = "",
}: ChartCardProps) => {
  return (
    <div
      className={`
        bg-white rounded-2xl p-6 shadow-sm border border-slate-100
        ${className}
      `}
    >
      {/* Card Header */}
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-800">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-slate-400 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {/* Chart Content */}
      {children}
    </div>
  );
};

export default ChartCard;