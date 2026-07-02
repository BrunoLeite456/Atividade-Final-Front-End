# Projeto Integrador — Frontend

Aplicação React que consome a API RESTful do backend de controle de despesas (Node.js + Express + MySQL).

## Estrutura do projeto

```text
src/
 ├── components/   -> componentes reutilizáveis (Navbar, formulários, filtros, etc)
 ├── pages/         -> páginas da aplicação (Login, Dashboard, Categorias, Despesas)
 ├── routes/        -> configuração das rotas (React Router)
 ├── services/      -> chamadas HTTP para a API (axios)
 ├── contexts/      -> Context API (autenticação)
 ├── hooks/         -> hooks customizados (useAuth, useCategories, useExpenses)
 └── styles/        -> CSS global
```

## Tecnologias usadas

- React + Vite
- React Router DOM
- Axios
- Context API (estado global de autenticação)
- Bootstrap (via CDN, direto no `index.html`) — CSS framework livre

## Como rodar

### 1. O backend precisa estar rodando

Este frontend consome a API em `http://localhost:3000`. Antes de rodar o frontend, deixe o backend (o projeto Node/Express/MySQL) rodando com `npm start`.

Se o backend estiver em outra porta, ajuste a `baseURL` em `src/services/api.js`.

### 2. Instalar as dependências

```bash
npm install
```

### 3. Rodar o projeto

```bash
npm run dev
```

Abra `http://localhost:5173` no navegador.

## Fluxo da aplicação

1. **Cadastro** (`/register`) — cria um usuário novo, chamando `POST /users`
2. **Login** (`/login`) — autentica e guarda o token JWT no `localStorage`
3. **Dashboard** (`/dashboard`) — mostra total de gastos, quantidade de despesas, gastos por categoria e últimas despesas
4. **Categorias** (`/categories`) — CRUD completo
5. **Despesas** (`/expenses`) — CRUD completo, com filtros por categoria, status, período e valor

Todas as rotas, exceto login e cadastro, exigem estar autenticado — se o token expirar ou não existir, o usuário é redirecionado para o login automaticamente.

## Observações

Este projeto foi feito de forma simples, sem os itens de bônus do enunciado (Dark Mode, paginação, ordenação, gráficos, upload de comprovantes).
