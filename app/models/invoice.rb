# frozen_string_literal: true

class Invoice < ApplicationRecord
  belongs_to :user
  belongs_to :company

  validates :number, presence: true, uniqueness: { scope: :user_id }
  validates :value, presence: true, numericality: { greater_than: 0 }
  validates :competence_month, presence: true
  validates :cash_month, presence: true
  validates :service_description, presence: true

  scope :by_year, ->(year) { where("EXTRACT(YEAR FROM competence_month) = ?", year) }
  scope :by_month, ->(year, month) { where("EXTRACT(YEAR FROM competence_month) = ? AND EXTRACT(MONTH FROM competence_month) = ?", year, month) }
end
