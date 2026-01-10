class WelcomeController < ApplicationController
  def index
    # Render Inertia page with props
    render inertia: "Welcome", props: {
      message: "Welcome to your Rails + React + TypeScript + Tailwind app!",
      timestamp: Time.current.iso8601
    }
  end
end
