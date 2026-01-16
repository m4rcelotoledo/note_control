# frozen_string_literal: true

require "rails_helper"

RSpec.describe User, type: :model do
  subject(:my_user) { build(:user) }

  describe "validations" do
    it "requires email" do
      my_user.email = nil
      expect(my_user).not_to be_valid
      expect(my_user.errors[:email]).to be_present
    end

    it "requires unique email" do
      create(:user, email: "test@example.com")
      duplicate = build(:user, email: "test@example.com", password: "password123", password_confirmation: "password123")
      expect(duplicate).not_to be_valid
      expect(duplicate.errors[:email]).to be_present
    end

    it "validates email format" do
      my_user.email = "invalid_email"
      expect(my_user).not_to be_valid
    end

    it "accepts valid email" do
      my_user.email = "user@example.com"
      expect(my_user).to be_valid
    end
  end

  describe "associations" do
    it "has many invoices" do
      invoice = create(:invoice, user: my_user)
      expect(my_user.invoices).to include(invoice)
    end

    it "has many companies" do
      company = create(:company, user: my_user)
      expect(my_user.companies).to include(company)
    end
  end

  describe "password" do
    it "requires password on creation" do
      my_user.password = nil
      expect(my_user).not_to be_valid
      expect(my_user.errors[:password]).to be_present
    end

    it "requires minimum 6 characters for password" do
      my_user.password = "12345"
      expect(my_user).not_to be_valid
    end

    it "creates user with valid password" do
      my_user.password = "password123"
      my_user.password_confirmation = "password123"
      expect(my_user).to be_valid
      expect(my_user.password_digest).to be_present
    end
  end
end
