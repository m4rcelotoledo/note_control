import { useState, useCallback } from "react";
import { formatCNPJ, unformatCNPJ } from "../utils/cnpj";

/**
 * Hook to manage CNPJ input with mask
 * Returns the formatted value for display and the unformatted value for submission
 */
export function useCNPJMask(initialValue: string = "") {
  const [displayValue, setDisplayValue] = useState(formatCNPJ(initialValue));

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formatted = formatCNPJ(inputValue);
    setDisplayValue(formatted);
    return formatted;
  }, []);

  const getUnformattedValue = useCallback(() => {
    return unformatCNPJ(displayValue);
  }, [displayValue]);

  const setValue = useCallback((value: string) => {
    setDisplayValue(formatCNPJ(value));
  }, []);

  return {
    displayValue,
    handleChange,
    getUnformattedValue,
    setValue,
  };
}
