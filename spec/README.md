# Estratégia de Testes

## Rails (RSpec)

### Testes de Request (Recomendado para Inertia.js)

Os testes de request são ideais para aplicações Inertia.js porque:
- Testam a integração completa (controller + resposta JSON)
- Verificam se os dados corretos são enviados para o frontend
- São mais rápidos que testes de sistema
- Cobrem a maior parte da lógica de negócio

**Arquivos criados:**
- `spec/requests/sessions_spec.rb` - Autenticação
- `spec/requests/invoices_spec.rb` - CRUD de notas fiscais
- `spec/requests/dashboard_spec.rb` - Dashboard e cálculos

### Testes de Models

Testam validações, associações e lógica de negócio nos models.

**Arquivos criados:**
- `spec/models/user_spec.rb`
- `spec/models/invoice_spec.rb`
- `spec/models/company_spec.rb`
- `spec/models/setting_spec.rb`

### Helpers

- `spec/support/inertia_helpers.rb` - Helpers para testar respostas Inertia
- `spec/support/auth_helpers.rb` - Helpers para autenticação em testes

### Factories

- `spec/factories/users.rb`
- `spec/factories/companies.rb`
- `spec/factories/invoices.rb`
- `spec/factories/settings.rb`

## JavaScript/TypeScript

### Recomendação

Para aplicações Inertia.js, **não é necessário** criar muitos testes unitários de JavaScript porque:

1. Os testes de request no Rails já cobrem a integração completa
2. A maior parte da lógica está no backend
3. Os componentes React são principalmente apresentação

### Quando testar JavaScript

Considere testes unitários apenas para:
- Funções utilitárias complexas (formatação, cálculos)
- Lógica de negócio no frontend (se houver)
- Componentes com lógica complexa (ex: validação de formulários)

### Opções de ferramentas (se necessário)

Se decidir testar JavaScript:
- **Jest** + **React Testing Library** - Padrão da indústria
- **Vitest** - Alternativa mais rápida ao Jest

## Executando os testes

```bash
# Todos os testes
bundle exec rspec

# Testes específicos
bundle exec rspec spec/models/user_spec.rb
bundle exec rspec spec/requests/invoices_spec.rb

# Com coverage
COVERAGE=true bundle exec rspec
```
