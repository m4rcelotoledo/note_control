# frozen_string_literal: true

module InertiaHelpers
  def inertia_response
    # Inertia returns HTML with page data in a script tag
    # Extract Inertia page data from HTML response
    if response.body.include?("data-page")
      # The data is in a script tag with data-page attribute
      # Try different patterns to find the data
      match = response.body.match(/data-page="([^"]+)"/) ||
              response.body.match(/data-page='([^']+)'/) ||
              response.body.match(/id="app"[^>]*data-page="([^"]+)"/)

      if match
        # Unescape HTML entities
        require "cgi"
        JSON.parse(CGI.unescapeHTML(match[1]))
      else
        raise "Could not find Inertia page data in response. Response body: #{response.body[0..500]}"
      end
    elsif response.content_type&.include?("application/json")
      # If it's already JSON (from X-Inertia header)
      JSON.parse(response.body)
    else
      raise "Response does not contain Inertia page data. Content-Type: #{response.content_type}, Body: #{response.body[0..500]}"
    end
  end

  def inertia_component
    inertia_response["component"]
  end

  def inertia_props
    inertia_response["props"]
  end
end

RSpec.configure do |config|
  config.include InertiaHelpers, type: :request
end
