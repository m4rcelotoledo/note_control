export interface Company {
  id: number;
  name: string;
  cnpj?: string;
  created_at: string;
  updated_at: string;
}

export interface CompanyFormData {
  name: string;
  cnpj?: string;
}

export interface CompanyErrors {
  name?: string[];
  cnpj?: string[];
  base?: string;
}
