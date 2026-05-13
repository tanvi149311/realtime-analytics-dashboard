/**
 * @file __tests__/useMetrics.test.ts
 * @description Tests for the useMetrics custom hook.
 * Uses vitest fake timers to control time-based updates.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useMetrics from "../hooks/useMetrics";

// ─────────────────────────────────────────
// TESTS
// ─────────────────────────────────────────

describe("useMetrics", () => {
  // Use fake timers so we control when intervals fire
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("returns 4 metrics on initial render", () => {
    const { result } = renderHook(() => useMetrics());
    expect(result.current.metrics).toHaveLength(4);
  });

  it("starts with connecting status", () => {
    const { result } = renderHook(() => useMetrics());
    expect(result.current.status).toBe("connecting");
  });

  it("transitions to connected after 1 second", () => {
    const { result } = renderHook(() => useMetrics());
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.status).toBe("connected");
  });

  it("updates metrics after refresh interval", () => {
    const { result } = renderHook(() => useMetrics());

    const initialValues = result.current.metrics.map((m) => m.value);

    // Advance time past the refresh interval
    act(() => vi.advanceTimersByTime(2500));

    const updatedValues = result.current.metrics.map((m) => m.value);

    // At least one metric value should have changed
    const hasChanged = initialValues.some(
      (val, i) => val !== updatedValues[i]
    );
    expect(hasChanged).toBe(true);
  });

  it("returns metrics with required fields", () => {
    const { result } = renderHook(() => useMetrics());
    result.current.metrics.forEach((metric) => {
      expect(metric).toHaveProperty("id");
      expect(metric).toHaveProperty("label");
      expect(metric).toHaveProperty("value");
      expect(metric).toHaveProperty("trend");
      expect(metric).toHaveProperty("changePercent");
    });
  });
});
