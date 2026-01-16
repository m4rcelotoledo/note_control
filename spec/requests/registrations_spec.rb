# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Registrations", type: :request do
  describe "GET /registrations/new" do
    subject(:my_registrations_new) { get "/registrations/new" }

    it "renders registration page" do
      my_registrations_new

      expect(response).to have_http_status(:success)
      expect(inertia_component).to eq("Auth/Register")
    end

    it "redirects to root if already logged in" do
      user = create(:user)
      sign_in(user)
      my_registrations_new

      expect(response).to redirect_to(root_path)
    end
  end

  describe "POST /registrations" do
    subject(:my_post_registrations) { post "/registrations", params: registration_params }

    context "with valid parameters" do
      let(:registration_params) do
        {
          user: {
            email: "newuser@example.com",
            password: "password123",
            password_confirmation: "password123"
          }
        }
      end

      it "creates a new user" do
        expect {
          my_post_registrations
        }.to change(User, :count).by(1)

        expect(response).to redirect_to(root_path)
        user = User.last
        expect(user.email).to eq("newuser@example.com")
      end

      it "sets session after registration" do
        my_post_registrations

        user = User.last
        expect(session[:user_id]).to eq(user.id)
      end

      it "initializes default MEI limit setting" do
        my_post_registrations

        expect(Setting.exists?(key: "mei_annual_limit")).to be true
        expect(Setting.get("mei_annual_limit").to_f).to eq(Setting::MEI_ANNUAL_LIMIT.to_f)
      end

      it "does not create duplicate MEI limit if it already exists" do
        # Create setting before registration
        Setting.set("mei_annual_limit", 200_000.0)

        my_post_registrations

        # Should keep existing value
        expect(Setting.get("mei_annual_limit").to_f).to eq(200_000.0)
      end
    end

    context "with invalid parameters" do
      context "with invalid email" do
        let(:registration_params) do
          {
            user: {
              email: "invalid-email",
              password: "password123",
              password_confirmation: "password123"
            }
          }
        end

        it "does not create user with invalid email" do
          expect {
            my_post_registrations
          }.not_to change(User, :count)

          expect(response).to have_http_status(:unprocessable_entity)
          expect(inertia_component).to eq("Auth/Register")
        end
      end

      context "with duplicate email" do
        let!(:existing_user) { create(:user, email: "existing@example.com") }
        let(:registration_params) do
          {
            user: {
              email: existing_user.email,
              password: "password123",
              password_confirmation: "password123"
            }
          }
        end

        it "does not create user with duplicate email" do
          expect {
            my_post_registrations
          }.not_to change(User, :count)

          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context "with password too short" do
        let(:registration_params) do
          {
            user: {
              email: "user@example.com",
              password: "short",
              password_confirmation: "short"
            }
          }
        end

        it "does not create user with short password" do
          expect {
            my_post_registrations
          }.not_to change(User, :count)

          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context "with password mismatch" do
        let(:registration_params) do
          {
            user: {
              email: "user@example.com",
              password: "password123",
              password_confirmation: "different123"
            }
          }
        end

        it "does not create user with mismatched passwords" do
          expect {
            my_post_registrations
          }.not_to change(User, :count)

          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context "with empty email" do
        let(:registration_params) do
          {
            user: {
              email: "",
              password: "password123",
              password_confirmation: "password123"
            }
          }
        end

        it "does not create user with empty email" do
          expect {
            my_post_registrations
          }.not_to change(User, :count)

          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    context "with params at root level (not nested)" do
      let(:registration_params) do
        {
          email: "rootlevel@example.com",
          password: "password123",
          password_confirmation: "password123"
        }
      end

      it "creates user with root level params" do
        expect {
          my_post_registrations
        }.to change(User, :count).by(1)

        user = User.last
        expect(user.email).to eq("rootlevel@example.com")
      end
    end
  end
end
