# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Settings", type: :request do
  let(:user) { create(:user) }

  before { sign_in(user) }

  describe "GET /settings" do
    subject(:my_settings) { get "/settings" }

    it "shows settings page with default MEI limit" do
      # Ensure default setting exists
      Setting.set("mei_annual_limit", Setting::MEI_ANNUAL_LIMIT) unless Setting.exists?(key: "mei_annual_limit")

      my_settings

      expect(response).to have_http_status(:success)
      expect(inertia_component).to eq("Settings/Index")
      expect(inertia_props["mei_annual_limit"].to_f).to eq(Setting::MEI_ANNUAL_LIMIT.to_f)
    end

    it "shows settings page with custom MEI limit" do
      custom_limit = 150_000.0
      Setting.set("mei_annual_limit", custom_limit)

      my_settings

      expect(inertia_props["mei_annual_limit"].to_f).to eq(custom_limit)
    end
  end

  describe "PUT /settings" do
    subject(:my_put_settings) { put "/settings", params: { mei_annual_limit: limit_value } }

    context "with valid parameters" do
      let(:limit_value) { "120000.50" }

      it "updates MEI annual limit" do
        my_put_settings

        expect(response).to redirect_to(settings_path)
        expect(Setting.get("mei_annual_limit").to_f).to eq(120_000.50)
      end
    end

    context "with invalid parameters" do
      context "when limit is zero" do
        let(:limit_value) { "0" }

        it "does not update and returns error" do
          initial_limit = Setting.get("mei_annual_limit", Setting::MEI_ANNUAL_LIMIT).to_f

          my_put_settings

          expect(response).to have_http_status(:unprocessable_entity)
          expect(inertia_component).to eq("Settings/Index")
          expect(Setting.get("mei_annual_limit").to_f).to eq(initial_limit)
        end
      end

      context "when limit is negative" do
        let(:limit_value) { "-1000" }

        it "does not update and returns error" do
          initial_limit = Setting.get("mei_annual_limit", Setting::MEI_ANNUAL_LIMIT).to_f

          my_put_settings

          expect(response).to have_http_status(:unprocessable_entity)
          expect(Setting.get("mei_annual_limit").to_f).to eq(initial_limit)
        end
      end

      context "when limit is empty string" do
        let(:limit_value) { "" }

        it "does not update and returns error" do
          initial_limit = Setting.get("mei_annual_limit", Setting::MEI_ANNUAL_LIMIT).to_f

          my_put_settings

          expect(response).to have_http_status(:unprocessable_entity)
          expect(Setting.get("mei_annual_limit").to_f).to eq(initial_limit)
        end
      end
    end
  end

  describe "PATCH /settings" do
    it "updates MEI annual limit using PATCH" do
      patch "/settings", params: { mei_annual_limit: "95000.75" }

      expect(response).to redirect_to(settings_path)
      expect(Setting.get("mei_annual_limit").to_f).to eq(95_000.75)
    end
  end
end
