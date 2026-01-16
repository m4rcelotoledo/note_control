# frozen_string_literal: true

class CreateInvoices < ActiveRecord::Migration[8.0]
  def change
    create_table :invoices do |t|
      t.references :user, null: false, foreign_key: true
      t.references :company, null: false, foreign_key: true
      t.string :number
      t.decimal :value, precision: 10, scale: 2
      t.date :competence_month
      t.date :cash_month
      t.text :service_description

      t.timestamps
    end

    add_index :invoices, [:user_id, :number], unique: true
    add_index :invoices, :competence_month
    add_index :invoices, :cash_month
  end
end
