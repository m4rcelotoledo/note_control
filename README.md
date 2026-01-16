# Sistema de Controle de Notas Fiscais MEI

Sistema web para controle de notas fiscais emitidas por Microempreendedores Individuais (MEI), permitindo o gerenciamento de faturas, empresas clientes e monitoramento do limite anual de faturamento.

## 📋 Sobre a Aplicação

Esta aplicação foi desenvolvida para atender empreendedores MEI que precisam:
- Controlar as notas fiscais emitidas para diferentes empresas
- Monitorar o faturamento anual para evitar desenquadramento
- Visualizar gráficos de receita mensal e por empresa
- Gerenciar empresas clientes e suas informações

## 🚀 Tecnologias Utilizadas

### Backend
- **Ruby 3.4** - Linguagem de programação
- **Rails 8.0** - Framework web
- **PostgreSQL** - Banco de dados
- **bcrypt** - Criptografia de senhas
- **Inertia Rails** - Integração Inertia.js com Rails

### Frontend
- **React 19** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Framework CSS utilitário
- **Inertia.js** - Adaptador SPA sem API
- **Recharts** - Biblioteca de gráficos

### Ferramentas de Desenvolvimento
- **RSpec** - Framework de testes
- **FactoryBot** - Criação de dados de teste
- **Faker** - Geração de dados fictícios
- **RuboCop** - Linter Ruby
- **ESBuild** - Bundler JavaScript

## ✨ Principais Features

### 🔐 Autenticação
- Registro de novos usuários
- Login e logout
- Sessões seguras com bcrypt

### 📊 Dashboard
- **Controle de Limite MEI**: Exibe quanto ainda pode ser faturado no ano sem desenquadramento
- **Gráfico de Receita Mensal**: Visualização em barras da receita por mês
- **Gráfico de Receita por Empresa**: Visualização em pizza da distribuição de receita
- **Notas Fiscais Recentes**: Lista das últimas 10 notas fiscais cadastradas

### 🏢 Gestão de Empresas
- CRUD completo de empresas clientes
- Validação de CNPJ (opcional)
- Proteção contra exclusão de empresas com notas fiscais associadas
- Contagem de notas fiscais por empresa

### 📄 Gestão de Notas Fiscais
- CRUD completo de notas fiscais
- Campos:
  - Número da nota fiscal
  - Valor
  - Empresa cliente
  - Mês de competência
  - Mês de caixa (quando o valor será recebido)
  - Descrição do serviço
- Validação de número único por usuário

### ⚙️ Configurações
- Ajuste do limite anual de faturamento MEI (padrão: R$ 81.000,00)
- Validação de valores positivos

## 📦 Requisitos

- Ruby 3.4+
- PostgreSQL 12+
- Node.js 18+
- Yarn 4+

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd note_control
```

2. Instale as dependências Ruby:
```bash
bundle install
```

3. Instale as dependências JavaScript:
```bash
yarn install
```

4. Configure o banco de dados:
```bash
# Crie o banco de dados
rails db:create

# Execute as migrações
rails db:migrate

# (Opcional) Popule o banco com dados iniciais
rails db:seed
```

5. Configure as variáveis de ambiente:
```bash
# Crie o arquivo .env se necessário
# Configure DATABASE_URL, SECRET_KEY_BASE, etc.
```

## 🏃 Como Executar

### Desenvolvimento

Execute o servidor de desenvolvimento com Foreman (recomendado):
```bash
./bin/dev
```

Ou execute separadamente:
```bash
# Terminal 1 - Servidor Rails
rails server

# Terminal 2 - Build JavaScript (watch mode)
yarn build:watch

# Terminal 3 - Build CSS (watch mode)
yarn build:css --watch
```

A aplicação estará disponível em `http://localhost:3000`

### Produção

```bash
# Compile os assets
yarn build
yarn build:css

# Execute o servidor
rails server -e production
```

## ⏱️ Estimativa de Horas

Para informações detalhadas sobre a estimativa de horas trabalhadas no projeto, consulte o documento [ESTIMATIVA_HORAS.md](ESTIMATIVA_HORAS.md).

## 🧪 Testes

A aplicação utiliza RSpec para testes. A estratégia de testes está documentada em `spec/README.md`.

### Executar todos os testes:
```bash
bundle exec rspec
```

### Executar testes específicos:
```bash
# Testes de models
bundle exec rspec spec/models

# Testes de requests
bundle exec rspec spec/requests

# Arquivo específico
bundle exec rspec spec/requests/invoices_spec.rb
```

### Cobertura de Testes
- ✅ Testes de Models (32 exemplos)
- ✅ Testes de Requests (49 exemplos)
- ✅ Helpers customizados para Inertia.js
- ✅ Factories para todos os models

## 📁 Estrutura do Projeto

```
note_control/
├── app/
│   ├── controllers/        # Controllers Rails
│   │   ├── application_controller.rb
│   │   ├── dashboard_controller.rb
│   │   ├── companies_controller.rb
│   │   ├── invoices_controller.rb
│   │   ├── sessions_controller.rb
│   │   ├── registrations_controller.rb
│   │   └── settings_controller.rb
│   ├── models/             # Models ActiveRecord
│   │   ├── user.rb
│   │   ├── company.rb
│   │   ├── invoice.rb
│   │   └── setting.rb
│   ├── javascript/         # Código frontend
│   │   ├── pages/          # Páginas React
│   │   ├── components/     # Componentes reutilizáveis
│   │   └── types/          # Definições TypeScript
│   └── views/              # Templates Rails (Inertia)
├── config/
│   ├── routes.rb           # Rotas da aplicação
│   └── database.yml        # Configuração do banco
├── db/
│   ├── migrate/            # Migrações do banco
│   └── seeds.rb            # Dados iniciais
├── spec/                   # Testes RSpec
│   ├── models/             # Testes de models
│   ├── requests/           # Testes de requests
│   ├── factories/          # Factories FactoryBot
│   └── support/            # Helpers de teste
└── README.md
```

## 🔑 Modelos de Dados

### User
- Email (único)
- Password (criptografado com bcrypt)

### Company
- Nome
- CNPJ (opcional, com validação de formato)
- Pertence a um User

### Invoice
- Número (único por usuário)
- Valor (decimal)
- Mês de competência
- Mês de caixa
- Descrição do serviço
- Pertence a um User e uma Company

### Setting
- Key (único)
- Value (texto)
- Usado para configurações globais (ex: limite MEI)

## 🛣️ Rotas Principais

```
GET    /                          # Dashboard
GET    /sessions/new              # Login
POST   /sessions                  # Criar sessão
DELETE /sessions                 # Logout
GET    /registrations/new        # Registro
POST   /registrations            # Criar conta
GET    /companies                # Listar empresas
POST   /companies                # Criar empresa
GET    /companies/:id            # Ver empresa
GET    /companies/:id/edit       # Editar empresa
PUT    /companies/:id            # Atualizar empresa
DELETE /companies/:id            # Deletar empresa
GET    /invoices                 # Listar notas fiscais
POST   /invoices                 # Criar nota fiscal
GET    /invoices/:id/edit        # Editar nota fiscal
PUT    /invoices/:id             # Atualizar nota fiscal
DELETE /invoices/:id             # Deletar nota fiscal
GET    /settings                 # Configurações
PUT    /settings                 # Atualizar configurações
```

## 🔒 Segurança

- Autenticação obrigatória para todas as rotas (exceto login/registro)
- Senhas criptografadas com bcrypt
- Validação de parâmetros com Strong Parameters
- Isolamento de dados por usuário (scoping)
- Proteção contra exclusão de dados relacionados

## 📈 Possíveis Melhorias

- [ ] Controle de despesas mensais
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] Notificações de limite próximo
- [ ] Integração com APIs de emissão de notas fiscais
- [ ] Dashboard com mais métricas

---

Desenvolvido com ❤️ usando Ruby on Rails e React
