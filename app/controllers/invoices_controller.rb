# frozen_string_literal: true

class InvoicesController < ApplicationController
  before_action :set_invoice, only: %i[show edit update destroy]

  def index
    invoices = current_user.invoices
                           .includes(:company)
                           .order(created_at: :desc)
                           .map do |invoice|
      {
        id: invoice.id,
        number: invoice.number,
        value: invoice.value.to_f,
        company_id: invoice.company_id,
        company_name: invoice.company.name,
        competence_month: invoice.competence_month.strftime("%Y-%m"),
        cash_month: invoice.cash_month.strftime("%Y-%m"),
        service_description: invoice.service_description,
        created_at: invoice.created_at.iso8601
      }
    end

    companies = current_user.companies.order(:name).map do |company|
      {
        id: company.id,
        name: company.name
      }
    end

    render inertia: "Invoices/Index", props: {
      invoices: invoices,
      companies: companies
    }
  end

  def show
    render inertia: "Invoices/Show", props: {
      invoice: {
        id: @invoice.id,
        number: @invoice.number,
        value: @invoice.value.to_f,
        company_id: @invoice.company_id,
        company_name: @invoice.company.name,
        competence_month: @invoice.competence_month.strftime("%Y-%m"),
        cash_month: @invoice.cash_month.strftime("%Y-%m"),
        service_description: @invoice.service_description,
        created_at: @invoice.created_at.iso8601
      }
    }
  end

  def new
    companies = current_user.companies.order(:name).map do |company|
      {
        id: company.id,
        name: company.name
      }
    end

    render inertia: "Invoices/New", props: {
      companies: companies
    }
  end

  def create
    invoice = current_user.invoices.build(invoice_params)

    if invoice.save
      redirect_to invoices_path, notice: "Nota fiscal criada com sucesso!"
    else
      companies = current_user.companies.order(:name).map do |company|
        {
          id: company.id,
          name: company.name
        }
      end

      render inertia: "Invoices/New", props: {
        errors: invoice.errors.as_json,
        invoice: invoice_params,
        companies: companies
      }, status: :unprocessable_entity
    end
  end

  def edit
    companies = current_user.companies.order(:name).map do |company|
      {
        id: company.id,
        name: company.name
      }
    end

    render inertia: "Invoices/Edit", props: {
      invoice: {
        id: @invoice.id,
        number: @invoice.number,
        value: @invoice.value.to_f,
        company_id: @invoice.company_id,
        competence_month: @invoice.competence_month.strftime("%Y-%m"),
        cash_month: @invoice.cash_month.strftime("%Y-%m"),
        service_description: @invoice.service_description
      },
      companies: companies
    }
  end

  def update
    if @invoice.update(invoice_params)
      redirect_to invoices_path, notice: "Nota fiscal atualizada com sucesso!"
    else
      companies = current_user.companies.order(:name).map do |company|
        {
          id: company.id,
          name: company.name
        }
      end

      render inertia: "Invoices/Edit", props: {
        errors: @invoice.errors.as_json,
        invoice: {
          id: @invoice.id,
          number: invoice_params[:number],
          value: invoice_params[:value],
          company_id: invoice_params[:company_id],
          competence_month: invoice_params[:competence_month],
          cash_month: invoice_params[:cash_month],
          service_description: invoice_params[:service_description]
        },
        companies: companies
      }, status: :unprocessable_entity
    end
  end

  def destroy
    @invoice.destroy
    redirect_to invoices_path, notice: "Nota fiscal excluída com sucesso!"
  end

  private

  def set_invoice
    @invoice = current_user.invoices.find_by(id: params[:id])

    raise ActiveRecord::RecordNotFound, "Nota fiscal não encontrada" if @invoice.nil?
  end

  def invoice_params
    permitted = params.require(:invoice).permit(:number, :value, :company_id, :competence_month, :cash_month, :service_description)

    # Convert YYYY-MM format to Date (first day of the month)
    if permitted[:competence_month].present? && permitted[:competence_month].is_a?(String)
      year, month = permitted[:competence_month].split("-").map(&:to_i)
      permitted[:competence_month] = Date.new(year, month, 1)
    end

    if permitted[:cash_month].present? && permitted[:cash_month].is_a?(String)
      year, month = permitted[:cash_month].split("-").map(&:to_i)
      permitted[:cash_month] = Date.new(year, month, 1)
    end

    permitted
  end
end
