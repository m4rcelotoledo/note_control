# frozen_string_literal: true

class RegistrationsController < ApplicationController
  skip_before_action :require_authentication, only: %i[new create]

  def new
    redirect_to root_path and return if current_user

    render inertia: "Auth/Register", props: {}
  end

  def create
    # Accept params from Inertia form (can be nested under :user or at root level)
    user_params_hash = if params[:user].present?
      params.require(:user).permit(:email, :password, :password_confirmation)
    else
      params.permit(:email, :password, :password_confirmation)
    end

    user = User.new(user_params_hash)

    if user.save
      session[:user_id] = user.id
      # Initialize default MEI limit
      Setting.set("mei_annual_limit", Setting::MEI_ANNUAL_LIMIT) unless Setting.exists?(key: "mei_annual_limit")
      redirect_to root_path, notice: "Conta criada com sucesso!"
    else
      email = user_params_hash[:email] || params[:email]
      render inertia: "Auth/Register", props: {
        errors: user.errors.as_json,
        user: { email: email }
      }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
