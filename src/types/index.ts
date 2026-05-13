/**
 * @file types/index.ts
 * @description Central type definitions for the analytics dashboard.
 * All shared interfaces and types live here for reusability.
 */

// ─────────────────────────────────────────
// METRIC TYPES
// ─────────────────────────────────────────

/** Trend direction for a metric */
export type TrendDirection = "up" | "down" | "neutral";

/** A single metric card's data shape */
export interface MetricData {
  id: string;
  label: string;        // e.g. "Active Users"
  value: number;        // e.g. 1284
  unit?: string;        // e.g. "$", "%"
  trend: TrendDirection;
  changePercent: number; // e.g. 12.5 means 12.5%
  description?: string;  // e.g. "compared to yesterday"
}

// ─────────────────────────────────────────
// CHART TYPES
// ─────────────────────────────────────────

/** A single data point on a time-series chart */
export interface ChartDataPoint {
  timestamp: string;   // formatted time label e.g. "10:00"
  value: number;
  label?: string;
}

/** Shape of data for the analytics line chart */
export interface AnalyticsChartData {
  id: string;
  name: string;         // e.g. "Page Views"
  color: string;        // hex color e.g. "#6366f1"
  data: ChartDataPoint[];
}

// ─────────────────────────────────────────
// WEBSOCKET TYPES
// ─────────────────────────────────────────

/** Status of the WebSocket connection */
export type ConnectionStatus = "connecting" | "connected" | "disconnected";

/** Shape of incoming WebSocket messages */
export interface WebSocketMessage {
  type: "metric_update" | "chart_update";
  payload: MetricData | AnalyticsChartData;
  timestamp: string;
}
