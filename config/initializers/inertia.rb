# frozen_string_literal: true

InertiaRails.configure do |config|
  # Include empty errors hash to comply with Inertia protocol
  # This will be required in InertiaRails 4.0
  config.always_include_errors_hash = true

  # Optional: Set version for asset versioning
  # config.version = ViteRuby.digest # if using Vite
  # config.version = Rails.application.assets_manifest.digest # if using asset pipeline
end
