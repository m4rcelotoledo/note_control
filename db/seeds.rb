# Initialize default MEI limit if not exists
Setting.find_or_create_by!(key: "mei_annual_limit") do |setting|
  setting.value = Setting::MEI_ANNUAL_LIMIT.to_s
end
puts "Default MEI limit initialized with value: #{Setting::MEI_ANNUAL_LIMIT}"

# Create default user first (required for companies and invoices)
puts "Creating default user..."
user = User.find_or_create_by!(email: "admin@sample.com") do |u|
  u.password = "password"
  u.password_confirmation = "password"
end
puts "Default user created successfully"

# Create default companies (must be created after user)
puts "Creating default companies..."
company1 = Company.find_or_create_by!(user: user, name: "Empresa 123") do |c|
  c.cnpj = "12345678901234"
end
company2 = Company.find_or_create_by!(user: user, name: "Empresa ABC") do |c|
  c.cnpj = "12345678901235"
end
company3 = Company.find_or_create_by!(user: user, name: "Empresa XYZ") do |c|
  c.cnpj = "12345678901236"
end
company4 = Company.find_or_create_by!(user: user, name: "Empresa DEF") do |c|
  c.cnpj = "12345678901237"
end
company5 = Company.find_or_create_by!(user: user, name: "Empresa KWY") do |c|
  c.cnpj = "12345678901238"
end
puts "Default companies created successfully"

# Create default invoices (must be created after user and companies)
puts "Creating default invoices..."
Invoice.find_or_create_by!(user: user, number: "00001") do |i|
  i.value = 2500
  i.competence_month = Date.new(2026, 1, 1)
  i.cash_month = Date.new(2026, 1, 1)
  i.service_description = "Serviço 1"
  i.company = company1
end
Invoice.find_or_create_by!(user: user, number: "00002") do |i|
  i.value = 1400
  i.competence_month = Date.new(2026, 1, 1)
  i.cash_month = Date.new(2026, 1, 1)
  i.service_description = "Serviço 2"
  i.company = company2
end
Invoice.find_or_create_by!(user: user, number: "00003") do |i|
  i.value = 4000
  i.competence_month = Date.new(2026, 2, 1)
  i.cash_month = Date.new(2026, 2, 1)
  i.service_description = "Serviço 3"
  i.company = company3
end
Invoice.find_or_create_by!(user: user, number: "00004") do |i|
  i.value = 1800
  i.competence_month = Date.new(2026, 2, 1)
  i.cash_month = Date.new(2026, 2, 1)
  i.service_description = "Serviço 4"
  i.company = company4
end
Invoice.find_or_create_by!(user: user, number: "00005") do |i|
  i.value = 2000
  i.competence_month = Date.new(2026, 2, 1)
  i.cash_month = Date.new(2026, 2, 1)
  i.service_description = "Serviço 5"
  i.company = company5
end
Invoice.find_or_create_by!(user: user, number: "00006") do |i|
  i.value = 5000
  i.competence_month = Date.new(2026, 3, 1)
  i.cash_month = Date.new(2026, 3, 1)
  i.service_description = "Serviço 6"
  i.company = company1
end
Invoice.find_or_create_by!(user: user, number: "00007") do |i|
  i.value = 4000
  i.competence_month = Date.new(2026, 4, 1)
  i.cash_month = Date.new(2026, 4, 1)
  i.service_description = "Serviço 7"
  i.company = company2
end
Invoice.find_or_create_by!(user: user, number: "00008") do |i|
  i.value = 4000
  i.competence_month = Date.new(2026, 4, 1)
  i.cash_month = Date.new(2026, 4, 1)
  i.service_description = "Serviço 8"
  i.company = company3
end
Invoice.find_or_create_by!(user: user, number: "00009") do |i|
  i.value = 8000
  i.competence_month = Date.new(2026, 5, 1)
  i.cash_month = Date.new(2026, 5, 1)
  i.service_description = "Serviço 9"
  i.company = company4
end
Invoice.find_or_create_by!(user: user, number: "00010") do |i|
  i.value = 3000
  i.competence_month = Date.new(2026, 6, 1)
  i.cash_month = Date.new(2026, 6, 1)
  i.service_description = "Serviço 10"
  i.company = company5
end
Invoice.find_or_create_by!(user: user, number: "00011") do |i|
  i.value = 3000
  i.competence_month = Date.new(2026, 6, 1)
  i.cash_month = Date.new(2026, 6, 1)
  i.service_description = "Serviço 11"
  i.company = company1
end
Invoice.find_or_create_by!(user: user, number: "00012") do |i|
  i.value = 2000
  i.competence_month = Date.new(2026, 7, 1)
  i.cash_month = Date.new(2026, 7, 1)
  i.service_description = "Serviço 12"
  i.company = company2
end
Invoice.find_or_create_by!(user: user, number: "00013") do |i|
  i.value = 5000
  i.competence_month = Date.new(2026, 7, 1)
  i.cash_month = Date.new(2026, 7, 1)
  i.service_description = "Serviço 13"
  i.company = company3
end
Invoice.find_or_create_by!(user: user, number: "00014") do |i|
  i.value = 2000
  i.competence_month = Date.new(2026, 8, 1)
  i.cash_month = Date.new(2026, 8, 1)
  i.service_description = "Serviço 14"
  i.company = company4
end
Invoice.find_or_create_by!(user: user, number: "00015") do |i|
  i.value = 1000
  i.competence_month = Date.new(2026, 9, 1)
  i.cash_month = Date.new(2026, 9, 1)
  i.service_description = "Serviço 15"
  i.company = company5
end
Invoice.find_or_create_by!(user: user, number: "00016") do |i|
  i.value = 2000
  i.competence_month = Date.new(2026, 10, 1)
  i.cash_month = Date.new(2026, 10, 1)
  i.service_description = "Serviço 16"
  i.company = company1
end
Invoice.find_or_create_by!(user: user, number: "00017") do |i|
  i.value = 4000
  i.competence_month = Date.new(2026, 10, 1)
  i.cash_month = Date.new(2026, 10, 1)
  i.service_description = "Serviço 17"
  i.company = company2
end
Invoice.find_or_create_by!(user: user, number: "00018") do |i|
  i.value = 1500
  i.competence_month = Date.new(2026, 11, 1)
  i.cash_month = Date.new(2026, 11, 1)
  i.service_description = "Serviço 18"
  i.company = company3
end
Invoice.find_or_create_by!(user: user, number: "00019") do |i|
  i.value = 3500
  i.competence_month = Date.new(2026, 11, 1)
  i.cash_month = Date.new(2026, 11, 1)
  i.service_description = "Serviço 19"
  i.company = company4
end
Invoice.find_or_create_by!(user: user, number: "00020") do |i|
  i.value = 1000
  i.competence_month = Date.new(2026, 12, 1)
  i.cash_month = Date.new(2026, 12, 1)
  i.service_description = "Serviço 20"
  i.company = company5
end
Invoice.find_or_create_by!(user: user, number: "00021") do |i|
  i.value = 1000
  i.competence_month = Date.new(2026, 12, 1)
  i.cash_month = Date.new(2026, 12, 1)
  i.service_description = "Serviço 21"
  i.company = company1
end
Invoice.find_or_create_by!(user: user, number: "00022") do |i|
  i.value = 1000
  i.competence_month = Date.new(2026, 12, 1)
  i.cash_month = Date.new(2026, 12, 1)
  i.service_description = "Serviço 22"
  i.company = company2
end
Invoice.find_or_create_by!(user: user, number: "00023") do |i|
  i.value = 1000
  i.competence_month = Date.new(2026, 12, 1)
  i.cash_month = Date.new(2026, 12, 1)
  i.service_description = "Serviço 23"
  i.company = company3
end
Invoice.find_or_create_by!(user: user, number: "00024") do |i|
  i.value = 1000
  i.competence_month = Date.new(2026, 12, 1)
  i.cash_month = Date.new(2026, 12, 1)
  i.service_description = "Serviço 24"
  i.company = company4
end
Invoice.find_or_create_by!(user: user, number: "00025") do |i|
  i.value = 1000
  i.competence_month = Date.new(2026, 12, 1)
  i.cash_month = Date.new(2026, 12, 1)
  i.service_description = "Serviço 25"
  i.company = company5
end
puts "Default invoices created successfully"

puts "Seeds completed successfully"
