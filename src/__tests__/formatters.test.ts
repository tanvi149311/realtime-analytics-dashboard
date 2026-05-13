/**
 * @file __tests__/formatters.test.ts
 * @description Unit tests for formatter utility functions.
 * Pure functions are the easiest to test — input in, output out.
 */

import { describe, it, expect } from "vitest";
import {
  formatMetricValue,
  formatChangePercent,
  getTrendFromChange,
} from "../utils/formatters";

// ─────────────────────────────────────────
// formatMetricValue
// ─────────────────────────────────────────

describe("formatMetricValue", () => {
  it("formats a plain number with commas", () => {
    expect(formatMetricValue(1284)).toBe("1,284");
  });

  it("adds $ prefix for dollar unit", () => {
    expect(formatMetricValue(48295, "$")).toBe("$48,295");
  });

  it("adds % suffix for percent unit", () => {
    expect(formatMetricValue(3.6, "%")).toBe("3.6%");
  });

  it("handles zero correctly", () => {
    expect(formatMetricValue(0)).toBe("0");
  });

  it("handles large numbers", () => {
    expect(formatMetricValue(1000000)).toBe("1,000,000");
  });
});

// ─────────────────────────────────────────
// formatChangePercent
// ─────────────────────────────────────────

describe("formatChangePercent", () => {
  it("adds + sign for positive values", () => {
    expect(formatChangePercent(12.5)).toBe("+12.5%");
  });

  it("keeps - sign for negative values", () => {
    expect(formatChangePercent(-3.1)).toBe("-3.1%");
  });

  it("handles zero correctly", () => {
    expect(formatChangePercent(0)).toBe("0%");
  });
});

// ─────────────────────────────────────────
// getTrendFromChange
// ─────────────────────────────────────────

describe("getTrendFromChange", () => {
  it("returns up for positive change above threshold", () => {
    expect(getTrendFromChange(5)).toBe("up");
  });

  it("returns down for negative change below threshold", () => {
    expect(getTrendFromChange(-2)).toBe("down");
  });

  it("returns neutral for change within threshold", () => {
    expect(getTrendFromChange(0)).toBe("neutral");
  });

  it("returns neutral for small positive change", () => {
    expect(getTrendFromChange(0.3)).toBe("neutral");
  });

  it("returns neutral for small negative change", () => {
    expect(getTrendFromChange(-0.3)).toBe("neutral");
  });
});
