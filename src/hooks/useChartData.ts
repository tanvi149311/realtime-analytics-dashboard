/**
 * @file hooks/useChartData.ts
 * @description Custom hook that generates and streams
 * live time-series data for the line chart.
 * Keeps a rolling window of MAX_CHART_POINTS data points.
 */

import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { type AnalyticsChartData } from "../types";
import { MAX_CHART_POINTS, CHART_COLORS, DATA_REFRESH_INTERVAL_MS } from "../constants";

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────

/**
 * Generates a random value within a range.
 *
 * @param min - Minimum value
 * @param max - Maximum value
 */
const randomInRange = (min: number, max: number): number => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(1));
};

/**
 * Creates a new data point with current timestamp.
 *
 * @param min - Minimum value for this metric
 * @param max - Maximum value for this metric
 */
const createDataPoint = (min: number, max: number) => ({
  timestamp: format(new Date(), "HH:mm:ss"),
  value:     randomInRange(min, max),
});

// ─────────────────────────────────────────
// INITIAL DATA
// ─────────────────────────────────────────

/**
 * Generates initial historical data points so the
 * chart isn't empty on first render.
 *
 * @param count - Number of initial points to generate
 * @param min   - Minimum value
 * @param max   - Maximum value
 */
const generateInitialData = (count: number, min: number, max: number) =>
  Array.from({ length: count }, () => createDataPoint(min, max));

/** Initial chart series configuration */
const INITIAL_CHART_DATA: AnalyticsChartData[] = [
  {
    id:    "page_views",
    name:  "Page Views",
    color: CHART_COLORS.primary,
    data:  generateInitialData(10, 200, 800),
  },
  {
    id:    "revenue",
    name:  "Revenue",
    color: CHART_COLORS.success,
    data:  generateInitialData(10, 100, 500),
  },
];

// ─────────────────────────────────────────
// HOOK
// ─────────────────────────────────────────

/** Return shape of the useChartData hook */
interface UseChartDataReturn {
  chartData: AnalyticsChartData[];
}

/**
 * useChartData
 * Streams live time-series data for the line chart.
 * Maintains a rolling window of MAX_CHART_POINTS points.
 *
 * @example
 * const { chartData } = useChartData();
 */
const useChartData = (): UseChartDataReturn => {
  const [chartData, setChartData] = useState<AnalyticsChartData[]>(
    INITIAL_CHART_DATA
  );

  /**
   * Appends a new data point to each series and
   * trims to MAX_CHART_POINTS to keep the chart clean.
   */
  const updateChartData = useCallback(() => {
    setChartData((prev) =>
      prev.map((series) => {
        // Define value ranges per series
        const ranges: Record<string, [number, number]> = {
          page_views: [200, 800],
          revenue:    [100, 500],
        };

        const [min, max] = ranges[series.id] ?? [0, 100];
        const newPoint   = createDataPoint(min, max);

        // Rolling window — drop oldest, add newest
        const updatedData = [...series.data, newPoint].slice(-MAX_CHART_POINTS);

        return { ...series, data: updatedData };
      })
    );
  }, []);

  // Stream new data points at the refresh interval
  useEffect(() => {
    const timer = setInterval(updateChartData, DATA_REFRESH_INTERVAL_MS);

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, [updateChartData]);

  return { chartData };
};

export default useChartData;