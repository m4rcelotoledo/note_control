# frozen_string_literal: true

require "rails_helper"

RSpec.describe Company, type: :model do
  subject(:my_company) { build(:company, user: user) }

  let(:user) { create(:user) }

  describe "validations" do
    it "requires name" do
      my_company.name = nil
      expect(my_company).not_to be_valid
      expect(my_company.errors[:name]).to be_present
    end

    it "validates CNPJ format" do
      my_company.cnpj = "invalid"
      expect(my_company).not_to be_valid
    end

    it "accepts valid CNPJ" do
      my_company.cnpj = "12.345.678/0001-90"
      expect(my_company).to be_valid
    end

    it "accepts empty CNPJ" do
      my_company.cnpj = ""
      expect(my_company).to be_valid
    end
  end

  describe "associations" do
    it "belongs to user" do
      expect(my_company.user).to eq(user)
    end

    it "has many invoices" do
      invoice = create(:invoice, user: user, company: my_company)
      expect(my_company.invoices).to include(invoice)
    end
  end
end
