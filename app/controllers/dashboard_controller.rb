# frozen_string_literal: true

class DashboardController < ApplicationController
  def index
    # Initialize default MEI limit if not exists
    Setting.set("mei_annual_limit", Setting::MEI_ANNUAL_LIMIT) unless Setting.exists?(key: "mei_annual_limit")

    current_year = Date.current.year
    invoices = current_user.invoices.by_year(current_year)
    total_revenue = invoices.sum(:value)
    mei_limit = Setting.get("mei_annual_limit", Setting::MEI_ANNUAL_LIMIT).to_f
    remaining_revenue = [ mei_limit - total_revenue, 0 ].max

    # Monthly revenue data
    month_names = %w[
      Janeiro
      Fevereiro
      Março
      Abril
      Maio
      Junho
      Julho
      Agosto
      Setembro
      Outubro
      Novembro
      Dezembro
    ]

    monthly_data = (1..12).map do |month|
      month_invoices = invoices.where("EXTRACT(MONTH FROM competence_month) = ?", month)
      {
        month: month,
        month_name: month_names[month - 1],
        revenue: month_invoices.sum(:value).to_f
      }
    end

    # Revenue by company
    company_data = current_user.companies.includes(:invoices).map do |company|
      company_invoices = company.invoices.by_year(current_year)
      {
        id: company.id,
        name: company.name,
        revenue: company_invoices.sum(:value).to_f
      }
    end.reject { |data| data[:revenue].zero? }

    # Recent invoices
    recent_invoices = current_user.invoices
                                  .includes(:company)
                                  .order(created_at: :desc)
                                  .limit(10)
                                  .map do |invoice|
      {
        id: invoice.id,
        number: invoice.number,
        value: invoice.value.to_f,
        company_name: invoice.company.name,
        competence_month: invoice.competence_month.strftime("%Y-%m"),
        created_at: invoice.created_at.iso8601
      }
    end

    render inertia: "Dashboard", props: {
      total_revenue: total_revenue.to_f,
      remaining_revenue: remaining_revenue,
      mei_limit: mei_limit,
      monthly_data: monthly_data,
      company_data: company_data,
      recent_invoices: recent_invoices,
      current_year: current_year
    }
  end
end
