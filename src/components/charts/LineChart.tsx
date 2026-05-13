/**
 * @file components/charts/LineChart.tsx
 * @description Renders a live-updating multi-series line chart
 * using Recharts. Fully typed and responsive.
 */

import {
    ResponsiveContainer,
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
  } from "recharts";
  import { type AnalyticsChartData } from "../../types";
  
  // ─────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────
  
  /**
   * Merges multiple series into a flat array Recharts can consume.
   * Recharts needs: [{ timestamp, "Page Views": 300, Revenue: 150 }, ...]
   *
   * @param series - Array of chart series data
   */
  const mergeSeriesData = (series: AnalyticsChartData[]) => {
    if (series.length === 0) return [];
  
    // Use the first series timestamps as the base
    return series[0].data.map((point, index) => {
      const merged: Record<string, string | number> = {
        timestamp: point.timestamp,
      };
  
      // Add each series value keyed by series name
      series.forEach((s) => {
        merged[s.name] = s.data[index]?.value ?? 0;
      });
  
      return merged;
    });
  };
  
  // ─────────────────────────────────────────
  // PROPS
  // ─────────────────────────────────────────
  
  interface LineChartProps {
    /** Array of chart series to render */
    series: AnalyticsChartData[];
    /** Chart height in pixels (default: 300) */
    height?: number;
  }
  
  // ─────────────────────────────────────────
  // COMPONENT
  // ─────────────────────────────────────────
  
  /**
   * LineChart
   * Renders a responsive multi-series line chart with
   * grid, tooltip, and legend.
   *
   * @example
   * <LineChart series={chartData} height={300} />
   */
  const LineChart = ({ series, height = 300 }: LineChartProps) => {
    const data = mergeSeriesData(series);
  
    return (
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          {/* Grid */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f1f5f9"
            vertical={false}
          />
  
          {/* X Axis — timestamps */}
          <XAxis
            dataKey="timestamp"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
  
          {/* Y Axis — values */}
          <YAxis
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
            width={40}
          />
  
          {/* Tooltip on hover */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border:          "1px solid #e2e8f0",
              borderRadius:    "8px",
              fontSize:        "12px",
            }}
          />
  
          {/* Legend */}
          <Legend
            wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }}
          />
  
          {/* Render a Line for each series */}
          {series.map((s) => (
            <Line
              key={s.id}
              type="monotone"
              dataKey={s.name}
              stroke={s.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    );
  };
  
  export default LineChart;