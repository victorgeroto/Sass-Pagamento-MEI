# CreatorFlow 💚

> Plataforma de gestão financeira para criadores digitais MEI brasileiros.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-00d4aa?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.13-blue?style=flat-square&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green?style=flat-square&logo=fastapi)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)

---

## 📋 Sobre o projeto

O **CreatorFlow** é um SaaS voltado para criadores de conteúdo que atuam como MEI. A plataforma centraliza receitas de múltiplas plataformas (Hotmart, YouTube, Kiwify, mentorias), controla obrigações do MEI como o DAS, e oferece relatórios financeiros em tempo real — tudo em um único painel.

### Problema resolvido

Criadores digitais frequentemente gerenciam receitas de várias plataformas em planilhas separadas, perdem prazos do DAS e têm dificuldade em acompanhar o limite de faturamento anual do MEI (R$ 81.000). O CreatorFlow resolve isso com um dashboard unificado, alertas automáticos e controle financeiro simplificado.

---

## 🚀 Funcionalidades

- **Dashboard unificado** — visão geral de receitas, alunos, faturamento e limite MEI
- **Controle financeiro** — lançamentos por plataforma e categoria, filtros e busca
- **Gestão de alunos** — cadastro e acompanhamento de mentorados
- **Painel MEI** — controle do DAS, faturamento anual e alertas de vencimento
- **Autenticação JWT** — registro, login e proteção de rotas
- **Pagamentos via Stripe** — checkout, planos e webhook automático
- **Design responsivo** — funciona em desktop e mobile

---

## 🛠️ Stack tecnológica

### Backend
| Tecnologia | Versão | Uso |
|---|---|---|
| Python | 3.13 | Linguagem principal |
| FastAPI | 0.100+ | Framework da API REST |
| SQLModel | latest | ORM e modelos de dados |
| SQLite | — | Banco de dados local |
| python-jose | latest | Geração e validação de JWT |
| passlib + bcrypt | 4.0.1 | Hash seguro de senhas |
| Stripe | latest | Processamento de pagamentos |
| python-dotenv | latest | Variáveis de ambiente |

### Frontend
| Tecnologia | Versão | Uso |
|---|---|---|
| Next.js | 15 | Framework React com App Router |
| React | 19 | Interface de usuário |
| Tailwind CSS | 3 | Estilização utilitária |
| Lucide React | latest | Ícones modernos |

---

## 📁 Estrutura do projeto

```
saas-pagamentos/
├── backend/
│   ├── main.py                  # Entrada da aplicação + CORS
│   ├── database.py              # Conexão e sessão do banco
│   ├── auth.py                  # JWT, hash de senha, autenticação
│   ├── .env                     # Variáveis de ambiente (não versionar)
│   ├── saas.db                  # Banco de dados SQLite
│   ├── models/
│   │   ├── user.py              # Modelo de usuário
│   │   ├── plan.py              # Modelo de plano
│   │   └── subscription.py      # Modelo de assinatura
│   ├── schemas/
│   │   ├── user.py              # Schemas de entrada/saída do usuário
│   │   ├── plan.py              # Schemas de plano
│   │   └── subscription.py      # Schemas de assinatura
│   └── routes/
│       ├── auth.py              # Registro e login
│       ├── user.py              # CRUD de usuários
│       ├── plan.py              # CRUD de planos
│       ├── subscription.py      # Gestão de assinaturas
│       ├── payment.py           # Checkout e webhook Stripe
│       ├── dashboard.py         # Dados do painel principal
│       └── financeiro.py        # Dados financeiros
│
└── frontend/
    ├── app/
    │   ├── page.tsx             # Redireciona para /home
    │   ├── home/page.tsx        # Landing page
    │   ├── login/page.js        # Página de login
    │   ├── register/page.js     # Página de cadastro
    │   ├── forgot-password/     # Recuperação de senha
    │   └── dashboard/
    │       ├── page.js          # Dashboard principal
    │       ├── financeiro/      # Página financeira
    │       ├── alunos/          # Gestão de alunos
    │       ├── mei/             # Painel MEI
    │       └── configuracoes/   # Configurações da conta
    └── components/
        ├── home-components/     # Navbar, Hero, Features, Pricing...
        └── dashboard-components/
            ├── Sidebar.js
            ├── Header.js
            ├── StatsCards.js
            ├── RevenueChart.js
            ├── MeiProgress.js
            ├── RecentTransactions.js
            └── financeiro/      # Componentes da página financeira
```

---

## ⚙️ Como rodar o projeto

### Pré-requisitos

- Python 3.13+
- Node.js 18+
- npm ou yarn
- Conta no [Stripe](https://stripe.com) (para pagamentos)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/saas-pagamentos.git
cd saas-pagamentos
```

### 2. Backend

```bash
cd backend

# Criar e ativar o ambiente virtual
python -m venv venv

# Windows (PowerShell)
.\venv\Scripts\Activate.ps1

# Linux / macOS
source venv/bin/activate

# Instalar dependências
pip install fastapi uvicorn sqlmodel python-dotenv python-jose passlib bcrypt stripe

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas chaves

# Rodar o servidor
python -m uvicorn main:app --reload
```

A API estará disponível em `http://localhost:8000`
Documentação interativa em `http://localhost:8000/docs`

### 3. Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:3000`

### 4. Stripe Webhooks (opcional para desenvolvimento)

```bash
# Windows
C:\stripe\stripe.exe listen --forward-to localhost:8000/pagamentos/webhook

# macOS / Linux
stripe listen --forward-to localhost:8000/pagamentos/webhook
```

---

## 🔐 Variáveis de ambiente

Crie um arquivo `.env` dentro da pasta `backend/` com o seguinte conteúdo:

```env
DATABASE_URL=sqlite:///./saas.db
SECRET_KEY=sua-chave-super-secreta-aqui
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

> ⚠️ Nunca versione o arquivo `.env`. Certifique-se de que ele está no `.gitignore`.

---

## 🔌 Endpoints da API

### Autenticação
| Método | Rota | Descrição |
|---|---|---|
| POST | `/auth/registro` | Criar nova conta |
| POST | `/auth/login` | Login e geração de token JWT |

### Usuários
| Método | Rota | Descrição |
|---|---|---|
| GET | `/usuarios/` | Listar usuários (protegido) |
| GET | `/usuarios/{id}` | Buscar usuário |
| PUT | `/usuarios/{id}` | Atualizar usuário |
| DELETE | `/usuarios/{id}` | Deletar usuário |

### Planos
| Método | Rota | Descrição |
|---|---|---|
| POST | `/planos/` | Criar plano (protegido) |
| GET | `/planos/` | Listar planos (público) |

### Assinaturas
| Método | Rota | Descrição |
|---|---|---|
| POST | `/assinaturas/` | Criar assinatura |
| GET | `/assinaturas/` | Listar assinaturas |
| PUT | `/assinaturas/{id}/cancelar` | Cancelar assinatura |

### Pagamentos
| Método | Rota | Descrição |
|---|---|---|
| POST | `/pagamentos/criar-sessao/{plano_id}` | Criar sessão Stripe |
| POST | `/pagamentos/webhook` | Webhook do Stripe |

### Dashboard & Financeiro
| Método | Rota | Descrição |
|---|---|---|
| GET | `/dashboard/resumo` | Dados do painel principal |
| GET | `/financeiro/resumo` | Dados financeiros |

---

## 🗺️ Roadmap

### ✅ Concluído
- [x] Configuração do ambiente (backend + frontend)
- [x] Autenticação JWT (registro, login)
- [x] CRUD de usuários, planos e assinaturas
- [x] Integração com Stripe (checkout + webhook)
- [x] Landing page (Navbar, Hero, Features, Pricing, About, CTA, Footer)
- [x] Páginas de login, registro e recuperação de senha
- [x] Dashboard principal com dados reais da API
- [x] Rota `/dashboard/resumo` no backend
- [x] Página Financeiro (lançamentos e relatórios)
- [x] Página Alunos (gestão de mentorados)
- [x] Página MEI (DAS, faturamento e alertas)
- [x] Página Configurações (perfil e conta)

### 🔮 Futuro
- [ ] Restrições por plano (Free, Basic, Premium)
- [ ] Nota fiscal automática (NFS-e)
- [ ] Exportação de relatórios em PDF e Excel
- [ ] Integração com Hotmart, Kiwify e YouTube via API
- [ ] Migração para PostgreSQL em produção
- [ ] Deploy (Railway, Vercel, AWS)
---

## 🛡️ Hardening e Segurança (antes de publicar)

Este projeto é ilustrativo para portfólio. Para reduzir riscos, siga este checklist:

- Nunca suba `.env`, banco local (`*.db`) ou qualquer chave real.
- Troque (rotate) qualquer chave já utilizada em testes públicos.
- Em produção, configure `APP_ENV=production` para desativar `/docs`, `/redoc` e OpenAPI pública.
- Defina `CORS_ORIGINS` apenas com o domínio real do frontend (evite curinga).
- Use `SECRET_KEY` forte (>= 32 caracteres) e única por ambiente.
- Mantenha `SQL_ECHO=false` fora de desenvolvimento para não vazar dados em logs.
- Utilize apenas dados fictícios no deploy de portfólio.
- Ative Secret Scanning e Dependabot no GitHub.

### Exemplo de variáveis seguras (produção)

```env
APP_ENV=production
DATABASE_URL=sqlite:///./saas.db
SECRET_KEY=gere-uma-chave-grande-e-aleatoria-com-mais-de-32-caracteres
ACCESS_TOKEN_EXPIRE_MINUTES=30
SQL_ECHO=false
CORS_ORIGINS=https://seu-frontend.com
```


---

## 💡 Planos disponíveis

| Recurso | Free | Basic (R$29,90/mês) | Premium (R$99,90/mês) |
|---|:---:|:---:|:---:|
| Dashboard básico | ✅ | ✅ | ✅ |
| Até 3 plataformas | ✅ | ✅ | ✅ |
| Plataformas ilimitadas | ❌ | ✅ | ✅ |
| Histórico completo | ❌ | ✅ | ✅ |
| Gráficos de receita | ❌ | ✅ | ✅ |
| Exportação PDF/Excel | ❌ | ✅ | ✅ |
| Alertas avançados MEI | ❌ | ✅ | ✅ |
| Até 50 alunos | ❌ | ✅ | ✅ |
| Nota fiscal automática | ❌ | ❌ | ✅ |
| Alunos ilimitados | ❌ | ❌ | ✅ |
| Relatórios personalizados | ❌ | ❌ | ✅ |
| Suporte prioritário | ❌ | ❌ | ✅ |

---

## 🎨 Design System

| Elemento | Valor |
|---|---|
| Cor primária | `#0a1628` (Marinho) |
| Cor de destaque | `#00d4aa` (Menta) |
| Fundo | `#f8fffe` |
| Fonte | Sistema padrão (sans-serif) |
| Border radius padrão | `rounded-2xl` (16px) |

---

## 👨‍💻 Autor

Desenvolvido por **Victor Toledo**

---

## 📄 Licença

Este projeto está sob licença privada. Todos os direitos reservados.
