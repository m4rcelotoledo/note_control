# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Dashboard", type: :request do
  subject(:my_dashboard) { get "/" }

  let(:user) { create(:user) }
  let(:company) { create(:company, user: user) }

  before do
    sign_in(user)
    Setting.set("mei_annual_limit", 81_000.00)
  end

  describe "GET /" do
    it "shows dashboard with empty data" do
      my_dashboard

      expect(response).to have_http_status(:success)
      expect(inertia_component).to eq("Dashboard")
      expect(inertia_props["total_revenue"].to_f).to eq(0.0)
      expect(inertia_props["remaining_revenue"].to_f).to eq(81_000.0)
      expect(inertia_props["monthly_data"].length).to eq(12)
    end

    it "calculates remaining revenue correctly" do
      create(:invoice, user: user, company: company, value: 10_000, competence_month: Date.current.beginning_of_year)
      create(:invoice, user: user, company: company, value: 5_000, competence_month: Date.current.beginning_of_year)

      my_dashboard

      expect(inertia_props["total_revenue"].to_f).to eq(15_000.0)
      expect(inertia_props["remaining_revenue"].to_f).to eq(66_000.0)
    end

    it "shows monthly revenue data" do
      create(:invoice, user: user, company: company, value: 5_000, competence_month: Date.new(Date.current.year, 1, 1))
      create(:invoice, user: user, company: company, value: 3_000, competence_month: Date.new(Date.current.year, 2, 1))

      my_dashboard
      monthly_data = inertia_props["monthly_data"]

      expect(monthly_data[0]["revenue"].to_f).to eq(5_000.0) # Janeiro
      expect(monthly_data[1]["revenue"].to_f).to eq(3_000.0) # Fevereiro
    end

    it "shows company revenue data" do
      company2 = create(:company, user: user, name: "Empresa 2")
      create(:invoice, user: user, company: company, value: 10_000, competence_month: Date.current.beginning_of_year)
      create(:invoice, user: user, company: company2, value: 5_000, competence_month: Date.current.beginning_of_year)

      my_dashboard
      company_data = inertia_props["company_data"]

      expect(company_data.length).to eq(2)
      expect(company_data.map { |c| c["name"] }).to contain_exactly(company.name, company2.name)
      expect(company_data.find { |c| c["name"] == company.name }["revenue"].to_f).to eq(10_000.0)
      expect(company_data.find { |c| c["name"] == company2.name }["revenue"].to_f).to eq(5_000.0)
    end

    it "shows recent invoices" do
      invoice1 = create(:invoice, user: user, company: company, created_at: 1.day.ago)
      invoice2 = create(:invoice, user: user, company: company, created_at: 2.days.ago)

      my_dashboard
      recent_invoices = inertia_props["recent_invoices"]

      expect(recent_invoices.length).to eq(2)
      expect(recent_invoices.first["id"]).to eq(invoice1.id)
      expect(recent_invoices.last["id"]).to eq(invoice2.id)
    end
  end
end
