# frozen_string_literal: true

class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Inertia.js setup
  include InertiaRails::Controller

  before_action :require_authentication
  before_action :set_current_user

  private

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def set_current_user
    @current_user = current_user
  end

  def require_authentication
    return if current_user

    redirect_to new_session_path, alert: "Você precisa fazer login para acessar esta página."
  end
end
