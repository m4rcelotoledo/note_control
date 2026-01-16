# frozen_string_literal: true

class CompaniesController < ApplicationController
  before_action :set_company, only: %i[show edit update destroy]

  def index
    companies = current_user.companies.order(:name).map do |company|
      {
        id: company.id,
        name: company.name,
        cnpj: company.cnpj,
        invoices_count: company.invoices.count,
        created_at: company.created_at.iso8601
      }
    end

    render inertia: "Companies/Index", props: {
      companies: companies
    }
  end

  def show
    render inertia: "Companies/Show", props: {
      company: {
        id: @company.id,
        name: @company.name,
        cnpj: @company.cnpj,
        created_at: @company.created_at.iso8601
      }
    }
  end

  def new
    render inertia: "Companies/New", props: {}
  end

  def create
    company = current_user.companies.build(company_params)

    if company.save
      redirect_to companies_path, notice: "Empresa criada com sucesso!"
    else
      render inertia: "Companies/New", props: {
        errors: company.errors.as_json,
        company: company_params
      }, status: :unprocessable_entity
    end
  end

  def edit
    render inertia: "Companies/Edit", props: {
      company: {
        id: @company.id,
        name: @company.name,
        cnpj: @company.cnpj
      }
    }
  end

  def update
    if @company.update(company_params)
      redirect_to companies_path, notice: "Empresa atualizada com sucesso!"
    else
      render inertia: "Companies/Edit", props: {
        errors: @company.errors.as_json,
        company: {
          id: @company.id,
          name: @company.name,
          cnpj: @company.cnpj
        }
      }, status: :unprocessable_entity
    end
  end

  def destroy
    if @company.invoices.any?
      redirect_to companies_path, alert: "Não é possível excluir empresa que possui notas fiscais."
    else
      @company.destroy
      redirect_to companies_path, notice: "Empresa excluída com sucesso!"
    end
  end

  private

  def set_company
    @company = current_user.companies.find(params[:id])
  end

  def company_params
    params.require(:company).permit(:name, :cnpj)
  end
end
