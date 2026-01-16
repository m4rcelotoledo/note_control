# frozen_string_literal: true

class SessionsController < ApplicationController
  skip_before_action :require_authentication, only: %i[new create]

  def new
    redirect_to root_path and return if current_user

    render inertia: "Auth/Login", props: {}
  end

  def create
    user = User.find_by(email: params[:email]&.downcase)

    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to root_path, notice: "Login realizado com sucesso!"
    else
      render inertia: "Auth/Login", props: {
        errors: { base: "Email ou senha inválidos" },
        email: params[:email]
      }, status: :unprocessable_entity
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to new_session_path, notice: "Logout realizado com sucesso!"
  end
end
