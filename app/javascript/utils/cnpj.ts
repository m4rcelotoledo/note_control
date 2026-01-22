/**
 * Remove all non-numeric characters from a string
 */
export function removeNonNumeric(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Format a CNPJ in the format: 00.000.000/0000-00
 * Accepts CNPJ with or without formatting
 */
export function formatCNPJ(value: string): string {
  // Remove non-numeric characters
  const numbers = removeNonNumeric(value);

  // Limit to 14 digits
  const limited = numbers.slice(0, 14);

  // Apply the mask
  if (limited.length <= 2) {
    return limited;
  } else if (limited.length <= 5) {
    return `${limited.slice(0, 2)}.${limited.slice(2)}`;
  } else if (limited.length <= 8) {
    return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5)}`;
  } else if (limited.length <= 12) {
    return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5, 8)}/${limited.slice(8)}`;
  } else {
    return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5, 8)}/${limited.slice(8, 12)}-${limited.slice(12, 14)}`;
  }
}

/**
 * Remove the formatting of the CNPJ, returning only numbers
 */
export function unformatCNPJ(value: string): string {
  return removeNonNumeric(value);
}

/**
 * Validate if the CNPJ is in the correct format (14 digits)
 * Returns true for empty string (optional field) or exactly 14 digits
 */
export function isValidCNPJFormat(value: string): boolean {
  if (!value || value.trim() === "") {
    return true; // Empty is valid (optional field)
  }
  const numbers = removeNonNumeric(value);
  // If there are non-numeric characters and the result is empty, it's invalid
  if (value.length > 0 && numbers.length === 0) {
    return false;
  }
  return numbers.length === 14;
}
