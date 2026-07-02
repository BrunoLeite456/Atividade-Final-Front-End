# Atividade-Final-Backend

API RESTful simples para controle de despesas, feita com Node.js, Express, Sequelize, MySQL, JWT e bcrypt, seguindo o padrão MVC.

## Estrutura do projeto

```text
src/
 ├── controllers/   -> regras de negócio das rotas
 ├── views/          -> não usada (API REST não retorna views)
 ├── models/         -> models do Sequelize (User, Category, Expense)
 ├── config/         -> conexão com o banco (config.json e database.js)
 ├── database/
 │    ├── migrations/ -> criação das tabelas
 │    └── seeders/     -> dados iniciais (categorias e usuário de teste)
 └── app.js          -> rotas e configuração do servidor
```

## Como rodar o projeto

### 1. Instalar as dependências

```bash
npm install
```

### 2. Configurar o banco de dados

Crie um banco MySQL chamado `despesas_db`:

```sql
CREATE DATABASE despesas_db;
```

Abra o arquivo `src/config/config.json` e ajuste `username`, `password` e `host` de acordo com o seu MySQL. Por padrão está configurado como:

```json
"username": "root",
"password": "root",
"host": "127.0.0.1"
```

> Obs: para simplificar, este projeto não usa `dotenv` — as configurações do banco ficam direto no `config.json`.

### 3. Rodar as migrations (cria as tabelas)

```bash
npm run migrate
```

### 4. Rodar os seeders (cria categorias e um usuário de teste)

```bash
npm run seed
```

Isso cria 4 categorias (Alimentação, Transporte, Lazer, Saúde) e um usuário de teste:

- email: `teste@teste.com`
- senha: `123456`

### 5. Iniciar o servidor

```bash
npm start
```

O servidor sobe em `http://localhost:3000`.

## Autenticação

Quase todas as rotas (exceto cadastro e login) exigem um token JWT. Depois de fazer login, envie o token no header:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

## Rotas

### Autenticação

- `POST /users` — cadastrar usuário
  ```json
  { "nome": "João", "email": "joao@email.com", "senha": "123456" }
  ```
- `POST /auth/login` — login
  ```json
  { "email": "joao@email.com", "senha": "123456" }
  ```
  Retorna: `{ "token": "..." }`

### Categorias

- `GET /categories`
- `GET /categories/:id`
- `POST /categories` — `{ "nome": "Educação", "descricao": "Cursos e livros" }`
- `PUT /categories/:id`
- `DELETE /categories/:id`

### Despesas

- `GET /expenses` — aceita filtros na query string:
  - `?categoria=1`
  - `?status=PAGA`
  - `?dataInicio=2026-01-01&dataFim=2026-01-31`
  - `?valorMin=50&valorMax=500`
  - Exemplo: `GET /expenses?status=PAGA&categoria=1`
- `GET /expenses/:id`
- `POST /expenses` — `{ "descricao": "Mercado", "valor": 150.50, "data": "2026-01-15", "status": "PENDENTE", "categoriaId": 1 }`
- `PUT /expenses/:id`
- `DELETE /expenses/:id`

### Dashboard

- `GET /dashboard/total-expenses` — total gasto pelo usuário logado
- `GET /dashboard/expenses-count` — quantidade de despesas do usuário logado
- `GET /dashboard/expenses-by-category` — total gasto agrupado por categoria

## Observações

Este projeto foi feito de forma simples, sem os itens de bônus (como `dotenv` e pastas separadas de `routes` e `middlewares`). As rotas e o middleware de autenticação ficam direto no `src/app.js`.
