# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2026_01_10_030202) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "companies", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name"
    t.string "cnpj"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "name"], name: "index_companies_on_user_id_and_name"
    t.index ["user_id"], name: "index_companies_on_user_id"
  end

  create_table "invoices", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "company_id", null: false
    t.string "number"
    t.decimal "value", precision: 10, scale: 2
    t.date "competence_month"
    t.date "cash_month"
    t.text "service_description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cash_month"], name: "index_invoices_on_cash_month"
    t.index ["company_id"], name: "index_invoices_on_company_id"
    t.index ["competence_month"], name: "index_invoices_on_competence_month"
    t.index ["user_id", "number"], name: "index_invoices_on_user_id_and_number", unique: true
    t.index ["user_id"], name: "index_invoices_on_user_id"
  end

  create_table "settings", force: :cascade do |t|
    t.string "key"
    t.text "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["key"], name: "index_settings_on_key", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "companies", "users"
  add_foreign_key "invoices", "companies"
  add_foreign_key "invoices", "users"
end
