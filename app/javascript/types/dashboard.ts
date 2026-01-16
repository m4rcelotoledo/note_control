export interface MonthlyData {
  month: number;
  month_name: string;
  revenue: number;
}

export interface CompanyData {
  id: number;
  name: string;
  revenue: number;
}

export interface RecentInvoice {
  id: number;
  number: string;
  value: number;
  company_name: string;
  competence_month: string;
  created_at: string;
}

export interface DashboardProps {
  total_revenue: number;
  remaining_revenue: number;
  mei_limit: number;
  monthly_data: MonthlyData[];
  company_data: CompanyData[];
  recent_invoices: RecentInvoice[];
  current_year: number;
}
