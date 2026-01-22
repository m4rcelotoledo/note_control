import { describe, it, expect } from "vitest";
import {
  removeNonNumeric,
  formatCNPJ,
  unformatCNPJ,
  isValidCNPJFormat,
} from "../cnpj";

describe("CNPJ Utils", () => {
  describe("removeNonNumeric", () => {
    it("should remove all non-numeric characters", () => {
      expect(removeNonNumeric("12.345.678/0001-90")).toBe("12345678000190");
      expect(removeNonNumeric("abc123def456")).toBe("123456");
      expect(removeNonNumeric("12 34 56")).toBe("123456");
      expect(removeNonNumeric("")).toBe("");
    });

    it("should handle strings with only numbers", () => {
      expect(removeNonNumeric("12345678000190")).toBe("12345678000190");
    });

    it("should handle strings with only non-numeric characters", () => {
      expect(removeNonNumeric("abc-def-ghi")).toBe("");
    });
  });

  describe("formatCNPJ", () => {
    it("should format CNPJ correctly with full 14 digits", () => {
      expect(formatCNPJ("12345678000190")).toBe("12.345.678/0001-90");
      expect(formatCNPJ("12345678000190")).toBe("12.345.678/0001-90");
    });

    it("should format CNPJ that already has formatting", () => {
      expect(formatCNPJ("12.345.678/0001-90")).toBe("12.345.678/0001-90");
      expect(formatCNPJ("12.345.678/0001-90")).toBe("12.345.678/0001-90");
    });

    it("should format partial CNPJ correctly", () => {
      expect(formatCNPJ("12")).toBe("12");
      expect(formatCNPJ("123")).toBe("12.3");
      expect(formatCNPJ("12345")).toBe("12.345");
      expect(formatCNPJ("12345678")).toBe("12.345.678");
      expect(formatCNPJ("12345678000")).toBe("12.345.678/000");
      expect(formatCNPJ("123456780001")).toBe("12.345.678/0001");
      expect(formatCNPJ("1234567800019")).toBe("12.345.678/0001-9");
    });

    it("should limit to 14 digits", () => {
      expect(formatCNPJ("12345678000190123")).toBe("12.345.678/0001-90");
    });

    it("should handle empty string", () => {
      expect(formatCNPJ("")).toBe("");
    });

    it("should handle strings with non-numeric characters", () => {
      expect(formatCNPJ("12.345.678/0001-90")).toBe("12.345.678/0001-90");
      expect(formatCNPJ("abc123def456ghi789jkl012mno34")).toBe(
        "12.345.678/9012-34"
      );
    });
  });

  describe("unformatCNPJ", () => {
    it("should remove formatting from CNPJ", () => {
      expect(unformatCNPJ("12.345.678/0001-90")).toBe("12345678000190");
      expect(unformatCNPJ("12.345.678/0001-90")).toBe("12345678000190");
    });

    it("should return the same string if already unformatted", () => {
      expect(unformatCNPJ("12345678000190")).toBe("12345678000190");
    });

    it("should handle empty string", () => {
      expect(unformatCNPJ("")).toBe("");
    });

    it("should handle partial CNPJ", () => {
      expect(unformatCNPJ("12.345")).toBe("12345");
      expect(unformatCNPJ("12.345.678")).toBe("12345678");
    });
  });

  describe("isValidCNPJFormat", () => {
    it("should return true for valid 14-digit CNPJ", () => {
      expect(isValidCNPJFormat("12345678000190")).toBe(true);
      expect(isValidCNPJFormat("12.345.678/0001-90")).toBe(true);
    });

    it("should return true for empty string", () => {
      expect(isValidCNPJFormat("")).toBe(true);
    });

    it("should return false for invalid lengths", () => {
      expect(isValidCNPJFormat("123")).toBe(false);
      expect(isValidCNPJFormat("123456780001901")).toBe(false);
      expect(isValidCNPJFormat("12.345")).toBe(false);
    });

    it("should return false for strings with only non-numeric characters", () => {
      expect(isValidCNPJFormat("abc")).toBe(false);
      expect(isValidCNPJFormat("abc.def/ghi-jk")).toBe(false);
    });
  });

  describe("Integration tests", () => {
    it("should format and unformat correctly", () => {
      const original = "12345678000190";
      const formatted = formatCNPJ(original);
      const unformatted = unformatCNPJ(formatted);
      expect(unformatted).toBe(original);
    });

    it("should handle real-world CNPJ examples", () => {
      const testCases = [
        "12345678000190",
        "98765432000110",
        "11222333000144",
        "99888777000166",
      ];

      testCases.forEach((cnpj) => {
        const formatted = formatCNPJ(cnpj);
        expect(formatted).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/);
        expect(unformatCNPJ(formatted)).toBe(cnpj);
        expect(isValidCNPJFormat(formatted)).toBe(true);
      });
    });
  });
});
