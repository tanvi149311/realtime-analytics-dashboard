/**
 * @file constants/index.ts
 * @description App-wide constants. Centralizing these avoids
 * magic numbers/strings scattered across the codebase.
 */

// ─────────────────────────────────────────
// WEBSOCKET
// ─────────────────────────────────────────

/** WebSocket server URL - update for production */
export const WS_URL = "ws://localhost:8080";

/** How often (ms) to simulate new data in demo mode */
export const DATA_REFRESH_INTERVAL_MS = 2000;

// ─────────────────────────────────────────
// CHART
// ─────────────────────────────────────────

/** Max number of data points to show on chart at once */
export const MAX_CHART_POINTS = 20;

/** Chart color palette - consistent across all charts */
export const CHART_COLORS = {
  primary: "#6366f1",    // indigo
  success: "#22c55e",    // green
  warning: "#f59e0b",    // amber
  danger: "#ef4444",     // red
  muted: "#94a3b8",      // slate
} as const;

// ─────────────────────────────────────────
// METRICS
// ─────────────────────────────────────────

/** Default metric cards shown on the dashboard */
export const DEFAULT_METRICS = [
  { id: "active_users",  label: "Active Users",   unit: ""  },
  { id: "revenue",       label: "Revenue",         unit: "$" },
  { id: "page_views",    label: "Page Views",      unit: ""  },
  { id: "conversion",    label: "Conversion Rate", unit: "%" },
] as const;
