/**
 * @file __tests__/MetricCard.test.tsx
 * @description Component tests for MetricCard.
 * Tests what the user actually sees — not implementation details.
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MetricCard from "../components/metrics/MetricCard";
import { type MetricData } from "../types";

// ─────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────

/** Reusable mock metric for tests */
const MOCK_METRIC: MetricData = {
  id:            "active_users",
  label:         "Active Users",
  value:         1284,
  trend:         "up",
  changePercent: 12.5,
  description:   "compared to yesterday",
};

// ─────────────────────────────────────────
// TESTS
// ─────────────────────────────────────────

describe("MetricCard", () => {
  it("renders the metric label", () => {
    render(<MetricCard metric={MOCK_METRIC} />);
    expect(screen.getByText("Active Users")).toBeInTheDocument();
  });

  it("renders the formatted metric value", () => {
    render(<MetricCard metric={MOCK_METRIC} />);
    expect(screen.getByText("1,284")).toBeInTheDocument();
  });

  it("renders the change percent with + sign", () => {
    render(<MetricCard metric={MOCK_METRIC} />);
    expect(screen.getByText("+12.5%")).toBeInTheDocument();
  });

  it("renders the description text", () => {
    render(<MetricCard metric={MOCK_METRIC} />);
    expect(screen.getByText("compared to yesterday")).toBeInTheDocument();
  });

  it("renders $ prefix for revenue metric", () => {
    const revenueMetric: MetricData = {
      ...MOCK_METRIC,
      id:    "revenue",
      label: "Revenue",
      value: 48295,
      unit:  "$",
    };
    render(<MetricCard metric={revenueMetric} />);
    expect(screen.getByText("$48,295")).toBeInTheDocument();
  });

  it("renders default description when none provided", () => {
    const metricWithoutDesc: MetricData = {
      ...MOCK_METRIC,
      description: undefined,
    };
    render(<MetricCard metric={metricWithoutDesc} />);
    expect(
      screen.getByText("compared to yesterday")
    ).toBeInTheDocument();
  });
});
