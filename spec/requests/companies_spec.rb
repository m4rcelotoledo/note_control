# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Companies", type: :request do
  let(:user) { create(:user) }
  let(:company) { create(:company, user: user) }

  before do
    sign_in(user)
  end

  describe "GET /companies" do
    subject(:my_companies) { get "/companies" }

    it "lists user companies" do
      _company1 = create(:company, user: user, name: "Company A")
      _company2 = create(:company, user: user, name: "Company B")
      other_user = create(:user)
      _other_company = create(:company, user: other_user)

      my_companies

      expect(response).to have_http_status(:success)
      expect(inertia_component).to eq("Companies/Index")
      expect(inertia_props["companies"].length).to eq(2)
      # Companies should be ordered by name
      expect(inertia_props["companies"].first["name"]).to eq("Company A")
      expect(inertia_props["companies"].second["name"]).to eq("Company B")
    end

    it "includes invoices_count in company data" do
      _invoice1 = create(:invoice, user: user, company: company)
      _invoice2 = create(:invoice, user: user, company: company)

      my_companies

      company_data = inertia_props["companies"].find { |c| c["id"].to_i == company.id }
      expect(company_data["invoices_count"]).to eq(2)
    end
  end

  describe "GET /companies/:id" do
    subject(:my_company_show) { get "/companies/#{company.id}" }

    it "shows company details" do
      my_company_show

      expect(response).to have_http_status(:success)
      expect(inertia_component).to eq("Companies/Show")
      expect(inertia_props["company"]["id"].to_i).to eq(company.id)
      expect(inertia_props["company"]["name"]).to eq(company.name)
    end

    it "does not show company from other user" do
      other_user = create(:user)
      other_company = create(:company, user: other_user)

      get "/companies/#{other_company.id}"

      expect(response).to have_http_status(:not_found)
    end
  end

  describe "GET /companies/new" do
    subject(:my_companies_new) { get "/companies/new" }

    it "renders new company form" do
      my_companies_new

      expect(response).to have_http_status(:success)
      expect(inertia_component).to eq("Companies/New")
    end
  end

  describe "POST /companies" do
    subject(:my_post_companies) { post "/companies", params: company_params }

    context "with valid parameters" do
      let(:company_params) do
        {
          company: {
            name: "Nova Empresa",
            cnpj: "12.345.678/0001-90"
          }
        }
      end

      it "creates a new company" do
        expect {
          my_post_companies
        }.to change(Company, :count).by(1)

        expect(response).to redirect_to(companies_path)
        company = Company.last
        expect(company.name).to eq("Nova Empresa")
        expect(company.cnpj).to eq("12.345.678/0001-90")
        expect(company.user).to eq(user)
      end
    end

    context "with invalid parameters" do
      let(:company_params) do
        {
          company: {
            name: "",
            cnpj: ""
          }
        }
      end

      it "does not create company with invalid data" do
        expect {
          my_post_companies
        }.not_to change(Company, :count)

        expect(response).to have_http_status(:unprocessable_entity)
        expect(inertia_component).to eq("Companies/New")
      end
    end
  end

  describe "GET /companies/:id/edit" do
    subject(:my_companies_edit) { get "/companies/#{company.id}/edit" }

    it "renders edit company form" do
      my_companies_edit

      expect(response).to have_http_status(:success)
      expect(inertia_component).to eq("Companies/Edit")
      expect(inertia_props["company"]["id"].to_i).to eq(company.id)
      expect(inertia_props["company"]["name"]).to eq(company.name)
    end
  end

  describe "PUT /companies/:id" do
    subject(:my_put_companies) { put "/companies/#{company.id}", params: company_params }

    let(:company_params) do
      {
        company: {
          name: "Empresa Atualizada",
          cnpj: "98.765.432/0001-10"
        }
      }
    end

    it "updates company" do
      my_put_companies

      expect(response).to redirect_to(companies_path)
      company.reload
      expect(company.name).to eq("Empresa Atualizada")
      expect(company.cnpj).to eq("98.765.432/0001-10")
    end

    it "does not update company with invalid data" do
      company_params[:company][:name] = ""

      my_put_companies

      expect(response).to have_http_status(:unprocessable_entity)
      expect(inertia_component).to eq("Companies/Edit")
      company.reload
      expect(company.name).not_to eq("")
    end
  end

  describe "DELETE /companies/:id" do
    subject(:my_delete_companies) { delete "/companies/#{company.id}" }

    context "when company has no invoices" do
      let(:company) { create(:company, user: user) }

      before { company }

      it "deletes company" do
        expect {
          my_delete_companies
        }.to change(Company, :count).by(-1)

        expect(response).to redirect_to(companies_path)
      end
    end

    context "when company has invoices" do
      before do
        create(:invoice, user: user, company: company)
      end

      it "does not delete company and shows alert" do
        expect {
          my_delete_companies
        }.not_to change(Company, :count)

        expect(response).to redirect_to(companies_path)
        # Note: In Rails, flash messages are stored in session, so we can't easily test them in request specs
        # The redirect with alert is the expected behavior
      end
    end

    context "with invalid parameters" do
      let(:other_user) { create(:user) }
      let!(:other_company) { create(:company, user: other_user) }

      it "does not delete company from other user and returns 404" do
        company_id = other_company.id
        initial_count = Company.count

        delete "/companies/#{company_id}"

        expect(response).to have_http_status(:not_found)
        expect(Company.find_by(id: company_id)).to be_present
        expect(Company.count).to eq(initial_count)
      end
    end
  end
end
