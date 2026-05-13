/**
 * @file hooks/useMetrics.ts
 * @description Custom hook that simulates live metric updates.
 * In production, this would connect to a real WebSocket.
 * Encapsulates all data-fetching logic away from components.
 */

import { useState, useEffect, useCallback } from "react";
import { type MetricData, type ConnectionStatus } from "../types";
import { DATA_REFRESH_INTERVAL_MS } from "../constants";

// ─────────────────────────────────────────
// INITIAL DATA
// ─────────────────────────────────────────

/** Starting values for each metric */
const INITIAL_METRICS: MetricData[] = [
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
// HELPERS
// ─────────────────────────────────────────

/**
 * Generates a small random fluctuation around a base value.
 * Simulates real-world metric variance.
 *
 * @param base - The base value to fluctuate around
 * @param range - Max fluctuation amount (default 5%)
 */
const fluctuate = (base: number, range = 0.05): number => {
  const delta = base * range * (Math.random() * 2 - 1);
  return parseFloat((base + delta).toFixed(2));
};

/**
 * Determines trend direction based on change percentage.
 *
 * @param change - The percentage change value
 */
const getTrend = (change: number): MetricData["trend"] => {
  if (change > 0.5)  return "up";
  if (change < -0.5) return "down";
  return "neutral";
};

// ─────────────────────────────────────────
// HOOK
// ─────────────────────────────────────────

/** Return shape of the useMetrics hook */
interface UseMetricsReturn {
  metrics: MetricData[];
  status: ConnectionStatus;
}

/**
 * useMetrics
 * Provides live-updating metric data at a set interval.
 * Simulates WebSocket behavior for demo purposes.
 *
 * @example
 * const { metrics, status } = useMetrics();
 */
const useMetrics = (): UseMetricsReturn => {
  const [metrics, setMetrics]   = useState<MetricData[]>(INITIAL_METRICS);
  const [status, setStatus]     = useState<ConnectionStatus>("connecting");

  /**
   * Simulates a live data update by slightly fluctuating each metric.
   * Wrapped in useCallback to keep the reference stable across renders.
   */
  const updateMetrics = useCallback(() => {
    setMetrics((prev) =>
      prev.map((metric) => {
        const newValue     = fluctuate(metric.value);
        const newChange    = fluctuate(metric.changePercent, 0.1);
        const newTrend     = getTrend(newChange);

        return {
          ...metric,
          value:         newValue,
          changePercent: newChange,
          trend:         newTrend,
        };
      })
    );
  }, []);

  // Simulate connection then start live updates
  useEffect(() => {
    // Simulate initial connection delay
    const connectTimer = setTimeout(() => {
      setStatus("connected");
    }, 1000);

    // Start live data updates after connection
    const dataTimer = setInterval(() => {
      updateMetrics();
    }, DATA_REFRESH_INTERVAL_MS);

    // Cleanup both timers on unmount
    return () => {
      clearTimeout(connectTimer);
      clearInterval(dataTimer);
    };
  }, [updateMetrics]);

  return { metrics, status };
};

export default useMetrics;