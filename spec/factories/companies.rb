# frozen_string_literal: true

FactoryBot.define do
  factory :company do
    association :user
    name { Faker::Company.name }
    cnpj { Faker::Company.brazilian_company_number(formatted: true) }
  end
end
