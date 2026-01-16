# frozen_string_literal: true

class Company < ApplicationRecord
  belongs_to :user
  has_many :invoices, dependent: :destroy

  validates :name, presence: true
  validates :cnpj, format: { with: /\A\d{14}\z|\A\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\z|\A\z/ }, allow_blank: true
end
