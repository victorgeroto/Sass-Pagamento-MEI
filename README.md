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
- **Gestão de alunos** — cadastro, edição, remoção e acompanhamento de mentorados
- **Painel MEI** — controle do DAS, faturamento anual, DASN-SIMEI e alertas de vencimento
- **Página de planos** — cards, comparativo de recursos e FAQ
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
| SQLite | — | Banco de dados local (dev) |
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
├── .gitignore
├── .vscode/
├── README.md
│
├── backend/
│   ├── main.py                      # Entrada da aplicação + CORS
│   ├── database.py                  # Conexão e sessão do banco
│   ├── auth.py                      # JWT, hash de senha, autenticação
│   ├── requirements.txt             # Dependências Python
│   ├── start_backend.ps1            # Script para rodar no Windows
│   ├── .env                         # Variáveis de ambiente (não versionar)
│   ├── .env.example                 # Exemplo de variáveis de ambiente
│   ├── saas.db                      # Banco de dados SQLite
│   ├── models/
│   │   ├── user.py                  # Modelo de usuário
│   │   ├── plan.py                  # Modelo de plano
│   │   ├── subscription.py          # Modelo de assinatura
│   │   └── aluno.py                 # Modelo de aluno
│   ├── schemas/
│   │   ├── user.py                  # Schemas de entrada/saída do usuário
│   │   ├── plan.py                  # Schemas de plano
│   │   └── subscription.py          # Schemas de assinatura
│   └── routes/
│       ├── auth.py                  # Registro e login
│       ├── user.py                  # CRUD de usuários
│       ├── plan.py                  # CRUD de planos
│       ├── subscription.py          # Gestão de assinaturas
│       ├── payment.py               # Checkout e webhook Stripe
│       ├── dashboard.py             # Dados do painel principal
│       ├── financeiro.py            # Dados financeiros
│       ├── alunos.py                # CRUD de alunos
│       ├── mei.py                   # Dados MEI (DAS, DASN, faturamento)
│       └── planos_dashboard.py      # Planos com features e FAQ
│
└── frontend/
    ├── app/
    │   ├── page.tsx                 # Redireciona para /home
    │   ├── layout.tsx               # Layout global + metadata
    │   ├── globals.css              # Estilos globais
    │   ├── home/page.tsx            # Landing page
    │   ├── login/page.js            # Página de login
    │   ├── register/page.js         # Página de cadastro
    │   ├── forgot-password/page.js  # Recuperação de senha
    │   └── dashboard/
    │       ├── page.js              # Dashboard principal
    │       ├── financeiro/page.js   # Página financeira
    │       ├── alunos/page.js       # Gestão de alunos
    │       ├── mei/page.js          # Painel MEI
    │       └── planos/page.js       # Página de planos
    └── components/
        ├── home-components/
        │   ├── Navbar.js
        │   ├── Hero.js
        │   ├── Features.js
        │   ├── Pricing.js
        │   ├── About.js
        │   ├── CTA.js
        │   └── Footer.js
        └── dashboard-components/
            ├── Sidebar.js
            ├── Header.js            # Com dropdown de perfil e notificações
            ├── StatsCards.js
            ├── RevenueChart.js
            ├── MeiProgress.js
            ├── RecentTransactions.js
            ├── financeiro/
            │   ├── FinanceiroCards.js
            │   ├── CategoriasChart.js
            │   └── TabelaTransacoes.js
            ├── alunos/
            │   ├── AlunosCards.js
            │   ├── TabelaAlunos.js
            │   └── ModalAluno.js
            ├── mei/
            │   ├── AlertasMEI.js
            │   ├── FaturamentoMEI.js
            │   ├── ControleDAS.js
            │   └── DasnCard.js
            └── planos/
                ├── CardsPlanos.js
                ├── ComparativoPlanos.js
                └── FaqPlanos.js
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
pip install -r requirements.txt

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas chaves

# Rodar o servidor
python -m uvicorn main:app --reload
```

A API estará disponível em `http://localhost:8000`
Documentação interativa em `http://localhost:8000/docs` (apenas em desenvolvimento)

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

Crie um arquivo `.env` dentro da pasta `backend/` com base no `.env.example`:

```env
APP_ENV=development
DATABASE_URL=sqlite:///./saas.db
SECRET_KEY=sua-chave-super-secreta-aqui-minimo-32-caracteres
ACCESS_TOKEN_EXPIRE_MINUTES=30
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
CORS_ORIGINS=http://localhost:3000
SQL_ECHO=true
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

### Dashboard
| Método | Rota | Descrição |
|---|---|---|
| GET | `/dashboard/resumo` | Dados do painel principal |

### Financeiro
| Método | Rota | Descrição |
|---|---|---|
| GET | `/financeiro/resumo` | Resumo financeiro e transações |

### Alunos
| Método | Rota | Descrição |
|---|---|---|
| GET | `/alunos/` | Listar alunos do usuário |
| POST | `/alunos/` | Cadastrar novo aluno |
| PUT | `/alunos/{id}` | Atualizar aluno |
| DELETE | `/alunos/{id}` | Remover aluno |

### MEI
| Método | Rota | Descrição |
|---|---|---|
| GET | `/mei/resumo` | Faturamento, DAS, DASN e alertas |

### Planos Dashboard
| Método | Rota | Descrição |
|---|---|---|
| GET | `/planos-dashboard/` | Planos com features, comparativo e FAQ |

---

## 🗺️ Roadmap

### ✅ Concluído
- [x] Configuração do ambiente (backend + frontend)
- [x] Autenticação JWT (registro, login, recuperação de senha)
- [x] CRUD de usuários, planos e assinaturas
- [x] Integração com Stripe (checkout + webhook)
- [x] Landing page completa (Navbar, Hero, Features, Pricing, About, CTA, Footer)
- [x] Páginas de login, registro e recuperação de senha
- [x] Dashboard principal com dados reais da API
- [x] Página Financeiro (lançamentos, categorias e relatórios)
- [x] Página Alunos (cadastro, edição, remoção e filtros)
- [x] Página MEI (DAS, faturamento, DASN-SIMEI e alertas)
- [x] Página Planos (cards, comparativo e FAQ)
- [x] Header com dropdown de perfil e notificações
- [x] Hardening de segurança (CORS, JWT, docs desabilitados em produção)

### 🔮 Futuro
- [ ] Restrições por plano (Free, Basic, Premium)
- [ ] Nota fiscal automática (NFS-e)
- [ ] Exportação de relatórios em PDF e Excel
- [ ] Integração com Hotmart, Kiwify e YouTube via API
- [ ] Modo escuro no dashboard
- [ ] Migração para PostgreSQL em produção
- [ ] Rate limiting (proteção contra brute force)
- [ ] Deploy (Railway, Vercel, AWS)

---

## 🛡️ Segurança

Este projeto segue boas práticas de segurança para um SaaS em desenvolvimento:

- `SECRET_KEY` com validação de tamanho mínimo (32 caracteres)
- Documentação da API (`/docs`, `/redoc`) desabilitada em produção
- CORS configurável via variável de ambiente
- `.env` e `saas.db` no `.gitignore`
- Hash bcrypt nas senhas
- JWT com expiração configurável
- `APP_ENV` controla comportamentos de dev vs produção

### Checklist antes de publicar

- [ ] Nunca subir `.env`, banco local (`*.db`) ou chaves reais
- [ ] Trocar todas as chaves utilizadas em testes
- [ ] Configurar `APP_ENV=production`
- [ ] Definir `CORS_ORIGINS` apenas com o domínio real do frontend
- [ ] Usar `SECRET_KEY` forte e única por ambiente
- [ ] Manter `SQL_ECHO=false` em produção
- [ ] Ativar Secret Scanning e Dependabot no GitHub
- [ ] Usar apenas dados fictícios no deploy de portfólio

### Variáveis de produção

```env
APP_ENV=production
DATABASE_URL=postgresql://usuario:senha@host/creatorflow
SECRET_KEY=gere-uma-chave-grande-e-aleatoria-com-mais-de-32-caracteres
ACCESS_TOKEN_EXPIRE_MINUTES=30
SQL_ECHO=false
CORS_ORIGINS=https://seu-frontend.vercel.app
```

---

## 💡 Planos disponíveis

| Recurso | Free | Basic (R$29,90/mês) | Premium (R$99,90/mês) |
|---|:---:|:---:|:---:|
| Dashboard básico | ✅ | ✅ | ✅ |
| Até 3 plataformas | ✅ | ✅ | ✅ |
| Até 10 alunos | ✅ | ✅ | ✅ |
| Alerta básico DAS | ✅ | ✅ | ✅ |
| Plataformas ilimitadas | ❌ | ✅ | ✅ |
| Histórico completo | ❌ | ✅ | ✅ |
| Gráficos de receita | ❌ | ✅ | ✅ |
| Exportação PDF/Excel | ❌ | ✅ | ✅ |
| Alertas avançados MEI | ❌ | ✅ | ✅ |
| Até 50 alunos | ❌ | ✅ | ✅ |
| Nota fiscal automática | ❌ | ❌ | ✅ |
| Alunos ilimitados | ❌ | ❌ | ✅ |
| Relatórios personalizados | ❌ | ❌ | ✅ |
| Suporte via WhatsApp | ❌ | ❌ | ✅ |
| Consultoria mensal | ❌ | ❌ | ✅ |

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
