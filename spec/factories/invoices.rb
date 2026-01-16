# frozen_string_literal: true

FactoryBot.define do
  factory :invoice do
    association :user
    association :company
    number { Faker::Number.unique.number(digits: 9).to_s }
    value { Faker::Number.decimal(l_digits: 5, r_digits: 2) }
    competence_month { Date.current.beginning_of_month }
    cash_month { Date.current.beginning_of_month }
    service_description { Faker::Lorem.sentence }
  end
end
