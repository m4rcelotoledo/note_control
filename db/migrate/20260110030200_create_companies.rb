# frozen_string_literal: true

class CreateCompanies < ActiveRecord::Migration[8.0]
  def change
    create_table :companies do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name
      t.string :cnpj

      t.timestamps
    end

    add_index :companies, [:user_id, :name]
  end
end
