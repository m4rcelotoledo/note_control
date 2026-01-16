# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Invoices", type: :request do
  let(:user) { create(:user) }
  let(:company) { create(:company, user: user) }

  before do
    sign_in(user)
  end

  describe "GET /invoices" do
    subject(:my_invoices) { get "/invoices" }

    it "lists user invoices" do
      invoice = create(:invoice, user: user, company: company)
      other_user = create(:user)
      _other_invoice = create(:invoice, user: other_user, company: create(:company, user: other_user))

      my_invoices

      expect(response).to have_http_status(:success)
      expect(inertia_component).to eq("Invoices/Index")
      expect(inertia_props["invoices"].length).to eq(1)
      expect(inertia_props["invoices"].first["id"].to_i).to eq(invoice.id)
    end
  end

  describe "POST /invoices" do
    subject(:my_post_invoices) { post "/invoices", params: invoice_params }

    context "with valid parameters" do
      let(:invoice_params) do
        {
          invoice: {
            number: "12345",
            value: "1000.50",
            company_id: company.id,
            competence_month: "2024-01",
            cash_month: "2024-01",
            service_description: "Serviço de consultoria"
          }
        }
      end

      it "creates a new invoice" do
        expect {
          my_post_invoices
        }.to change(Invoice, :count).by(1)
        expect(response).to redirect_to(invoices_path)

        invoice = Invoice.last

        expect(invoice.number).to eq("12345")
        expect(invoice.value).to eq(1000.50)
      end
    end

    context "with invalid parameters" do
      let(:invoice_params) do
        {
          invoice: {
            number: "",
            value: "-100",
            company_id: company.id,
            competence_month: "2024-01",
            cash_month: "2024-01",
            service_description: ""
          }
        }
      end

      it "does not create invoice with invalid data" do
        expect {
          my_post_invoices
        }.not_to change(Invoice, :count)

        expect(response).to have_http_status(:unprocessable_entity)
        expect(inertia_component).to eq("Invoices/New")
      end
    end
  end

  describe "PUT /invoices/:id" do
    subject(:my_put_invoices) { put "/invoices/#{invoice.id}", params: invoice_params }

    let(:invoice) { create(:invoice, user: user, company: company) }
    let(:invoice_params) do
      {
        invoice: {
          number: invoice.number,
          value: "2000.00",
          company_id: company.id,
          competence_month: "2024-02",
          cash_month: "2024-02",
          service_description: "Serviço atualizado"
        }
      }
    end

    it "updates invoice" do
      my_put_invoices
      expect(response).to redirect_to(invoices_path)
      invoice.reload

      expect(invoice.value).to eq(2000.00)
      expect(invoice.service_description).to eq("Serviço atualizado")
    end
  end

  describe "DELETE /invoices/:id" do
    subject(:my_delete_invoices) { delete "/invoices/#{invoice.id}" }

    context "with valid parameters" do
      let(:invoice) { create(:invoice, user: user, company: company) }

      before { invoice }

      it "deletes invoice" do
        expect {
          my_delete_invoices
        }.to change(Invoice, :count).by(-1)

        expect(response).to redirect_to(invoices_path)
      end
    end

    context "with invalid parameters" do
      let(:other_user) { create(:user) }
      let!(:invoice) { create(:invoice, user: other_user, company: create(:company, user: other_user)) }

      it "does not delete invoice from other user and returns 404" do
        invoice_id = invoice.id
        initial_count = Invoice.count

        my_delete_invoices

        # Rails converts ActiveRecord::RecordNotFound to HTTP 404
        expect(response).to have_http_status(:not_found)
        # The invoice should still exist
        expect(Invoice.find_by(id: invoice_id)).to be_present
        expect(Invoice.count).to eq(initial_count)
      end
    end
  end
end
