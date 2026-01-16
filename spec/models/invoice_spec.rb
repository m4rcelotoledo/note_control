# frozen_string_literal: true

require "rails_helper"

RSpec.describe Invoice, type: :model do
  subject(:my_invoice) { build(:invoice, user: user, company: company) }

  let(:user) { create(:user) }
  let(:company) { create(:company, user: user) }

  describe "validations" do
    it "requires number" do
      my_invoice.number = nil
      expect(my_invoice).not_to be_valid
    end

    it "requires value" do
      my_invoice.value = nil
      expect(my_invoice).not_to be_valid
    end

    it "requires value greater than 0" do
      my_invoice.value = -100
      expect(my_invoice).not_to be_valid
    end

    it "requires competence_month" do
      my_invoice.competence_month = nil
      expect(my_invoice).not_to be_valid
    end

    it "requires cash_month" do
      my_invoice.cash_month = nil
      expect(my_invoice).not_to be_valid
    end

    it "requires service_description" do
      my_invoice.service_description = nil
      expect(my_invoice).not_to be_valid
    end
  end

  describe "uniqueness" do
    it "validates uniqueness of number per user" do
      create(:invoice, user: user, company: company, number: "12345")
      duplicate = build(:invoice, user: user, company: company, number: "12345")
      expect(duplicate).not_to be_valid
    end

    it "allows same number for different users" do
      user2 = create(:user)
      company2 = create(:company, user: user2)
      create(:invoice, user: user, company: company, number: "12345")
      duplicate = build(:invoice, user: user2, company: company2, number: "12345")
      expect(duplicate).to be_valid
    end
  end

  describe "scopes" do
    let!(:invoice_last_year) { create(:invoice, user: user, company: company, competence_month: Date.new(2025, 6, 1)) }
    let!(:invoice_this_year) { create(:invoice, user: user, company: company, competence_month: Date.new(2026, 1, 1)) }

    it "filters by year" do
      expect(described_class.by_year(2025)).to include(invoice_last_year)
      expect(described_class.by_year(2026)).to include(invoice_this_year)
      expect(described_class.by_year(2026)).not_to include(invoice_last_year)
    end

    it "filters by month" do
      expect(described_class.by_month(2025, 6)).to include(invoice_last_year)
      expect(described_class.by_month(2026, 1)).to include(invoice_this_year)
      expect(described_class.by_month(2026, 1)).not_to include(invoice_last_year)
    end
  end
end
