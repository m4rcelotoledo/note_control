# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Sessions", type: :request do
  describe "GET /sessions/new" do
    subject(:my_get_sessions_new) { get "/sessions/new" }

    it "renders login page" do
      my_get_sessions_new

      expect(response).to have_http_status(:success)
      expect(inertia_component).to eq("Auth/Login")
    end

    it "redirects to root if already logged in" do
      user = create(:user)
      sign_in(user)
      my_get_sessions_new

      expect(response).to redirect_to(root_path)
    end
  end

  describe "POST /sessions" do
    let(:user) { create(:user, password: "password123") }

    it "logs in with valid credentials" do
      post "/sessions", params: { email: user.email, password: "password123" }

      expect(response).to redirect_to(root_path)
      expect(session[:user_id]).to eq(user.id)
    end

    it "does not log in with invalid email" do
      post "/sessions", params: { email: "wrong@example.com", password: "password123" }

      expect(response).to have_http_status(:unprocessable_entity)
      expect(session[:user_id]).to be_nil
    end

    it "does not log in with invalid password" do
      post "/sessions", params: { email: user.email, password: "wrongpassword" }

      expect(response).to have_http_status(:unprocessable_entity)
      expect(session[:user_id]).to be_nil
    end
  end

  describe "DELETE /sessions" do
    subject(:my_delete_sessions) { delete "/sessions" }

    it "logs out the user" do
      user = create(:user)
      sign_in(user)
      my_delete_sessions

      expect(response).to redirect_to(new_session_path)
      expect(session[:user_id]).to be_nil
    end
  end
end
