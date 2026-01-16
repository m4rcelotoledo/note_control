# frozen_string_literal: true

class Setting < ApplicationRecord
  MEI_ANNUAL_LIMIT = 81_000.00

  validates :key, presence: true, uniqueness: true

  def self.get(key, default = nil)
    setting = find_by(key: key)
    return default if setting.nil?

    # Try to parse as number if it looks like one
    value = setting.value
    return value.to_f if value.match?(/\A\d+\.?\d*\z/)

    value
  end

  def self.set(key, value)
    setting = find_or_initialize_by(key: key)
    setting.value = value.to_s
    setting.save!
  end
end
