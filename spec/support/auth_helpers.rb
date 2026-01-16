# frozen_string_literal: true

module AuthHelpers
  def sign_in(user, password: "password123")
    post "/sessions", params: { email: user.email, password: password }
    follow_redirect! if response.redirect?
  end
end

RSpec.configure do |config|
  config.include AuthHelpers, type: :request
end
