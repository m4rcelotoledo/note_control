export interface Invoice {
  id: number;
  number: string;
  value: number;
  company_id: number;
  company_name?: string;
  competence_month: string; // YYYY-MM format
  cash_month: string; // YYYY-MM format
  service_description: string;
  created_at: string;
  updated_at: string;
}

export interface InvoiceFormData {
  number: string;
  value: string;
  company_id: string;
  competence_month: string; // YYYY-MM format
  cash_month: string; // YYYY-MM format
  service_description: string;
}

export interface InvoiceErrors {
  number?: string[];
  value?: string[];
  company_id?: string[];
  competence_month?: string[];
  cash_month?: string[];
  service_description?: string[];
  base?: string;
}
