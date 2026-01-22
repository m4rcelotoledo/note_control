import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCNPJMask } from "../useCNPJMask";

describe("useCNPJMask", () => {
  it("should initialize with empty string", () => {
    const { result } = renderHook(() => useCNPJMask());
    expect(result.current.displayValue).toBe("");
  });

  it("should initialize with provided value", () => {
    const { result } = renderHook(() => useCNPJMask("12345678000190"));
    expect(result.current.displayValue).toBe("12.345.678/0001-90");
  });

  it("should format value on change", () => {
    const { result } = renderHook(() => useCNPJMask());

    act(() => {
      const mockEvent = {
        target: { value: "12345678000190" },
      } as React.ChangeEvent<HTMLInputElement>;
      result.current.handleChange(mockEvent);
    });

    expect(result.current.displayValue).toBe("12.345.678/0001-90");
  });

  it("should return unformatted value", () => {
    const { result } = renderHook(() => useCNPJMask("12.345.678/0001-90"));

    const unformatted = result.current.getUnformattedValue();
    expect(unformatted).toBe("12345678000190");
  });

  it("should update value using setValue", () => {
    const { result } = renderHook(() => useCNPJMask());

    act(() => {
      result.current.setValue("12345678000190");
    });

    expect(result.current.displayValue).toBe("12.345.678/0001-90");
  });

  it("should handle partial input", () => {
    const { result } = renderHook(() => useCNPJMask());

    act(() => {
      const mockEvent = {
        target: { value: "123" },
      } as React.ChangeEvent<HTMLInputElement>;
      result.current.handleChange(mockEvent);
    });

    expect(result.current.displayValue).toBe("12.3");
  });

  it("should handle empty input", () => {
    const { result } = renderHook(() => useCNPJMask("12.345.678/0001-90"));

    act(() => {
      const mockEvent = {
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;
      result.current.handleChange(mockEvent);
    });

    expect(result.current.displayValue).toBe("");
    expect(result.current.getUnformattedValue()).toBe("");
  });
});
