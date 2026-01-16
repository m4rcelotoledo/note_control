# frozen_string_literal: true

class SettingsController < ApplicationController
  def index
    mei_limit = Setting.get("mei_annual_limit", Setting::MEI_ANNUAL_LIMIT).to_f

    render inertia: "Settings/Index", props: {
      mei_annual_limit: mei_limit
    }
  end

  def update
    limit_value = params[:mei_annual_limit].to_f

    if limit_value <= 0
      render inertia: "Settings/Index", props: {
        errors: { mei_annual_limit: [ "O limite deve ser maior que zero" ] },
        mei_annual_limit: Setting.get("mei_annual_limit", Setting::MEI_ANNUAL_LIMIT).to_f
      }, status: :unprocessable_entity
      return
    end

    Setting.set("mei_annual_limit", limit_value)

    redirect_to settings_path, notice: "Configuração atualizada com sucesso!"
  end
end
