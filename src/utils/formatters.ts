/**
 * @file utils/formatters.ts
 * @description Pure utility functions for formatting values.
 * Pure functions are easy to test and reuse across components.
 */

// ─────────────────────────────────────────
// NUMBER FORMATTING
// ─────────────────────────────────────────

/**
 * Formats a number with commas and optional unit.
 * Prefix unit (e.g. "$") goes before, suffix after.
 *
 * @param value - The number to format
 * @param unit  - Optional unit symbol
 *
 * @example
 * formatMetricValue(1284)        // "1,284"
 * formatMetricValue(48295, "$")  // "$48,295"
 * formatMetricValue(3.6, "%")    // "3.6%"
 */
export const formatMetricValue = (value: number, unit?: string): string => {
  const formatted = value.toLocaleString("en-US");
  if (!unit)        return formatted;
  if (unit === "$") return `${unit}${formatted}`;
  return `${formatted}${unit}`;
};

// ─────────────────────────────────────────
// PERCENT FORMATTING
// ─────────────────────────────────────────

/**
 * Formats a change percentage with a leading + or - sign.
 *
 * @param value - The percentage value
 *
 * @example
 * formatChangePercent(12.5)   // "+12.5%"
 * formatChangePercent(-3.1)   // "-3.1%"
 * formatChangePercent(0)      // "0%"
 */
export const formatChangePercent = (value: number): string => {
  if (value > 0) return `+${value}%`;
  return `${value}%`;
};

// ─────────────────────────────────────────
// TREND HELPERS
// ─────────────────────────────────────────

/**
 * Determines trend direction from a change value.
 *
 * @param change - The change value to evaluate
 *
 * @example
 * getTrendFromChange(5)    // "up"
 * getTrendFromChange(-2)   // "down"
 * getTrendFromChange(0)    // "neutral"
 */
export const getTrendFromChange = (
  change: number
): "up" | "down" | "neutral" => {
  if (change > 0.5)  return "up";
  if (change < -0.5) return "down";
  return "neutral";
};
