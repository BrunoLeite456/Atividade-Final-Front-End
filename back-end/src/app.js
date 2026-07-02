const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const { sequelize } = require("./models");
const { JWT_SECRET, cadastrar, login } = require("./controllers/authController");
const categoryController = require("./controllers/categoryController");
const expenseController = require("./controllers/expenseController");
const dashboardController = require("./controllers/dashboardController");

const app = express();
app.use(cors()); // libera o acesso da API para o front-end (outra porta/origem)
app.use(express.json());

// Middleware simples para verificar o token JWT nas rotas protegidas
function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não informado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const dados = jwt.verify(token, JWT_SECRET);
    req.usuarioId = dados.id;
    next();
  } catch (erro) {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}

// Rotas de autenticação (não precisam de token)
app.post("/users", cadastrar);
app.post("/auth/login", login);

// Rotas de categorias (protegidas)
app.get("/categories", verificarToken, categoryController.listar);
app.get("/categories/:id", verificarToken, categoryController.buscarPorId);
app.post("/categories", verificarToken, categoryController.criar);
app.put("/categories/:id", verificarToken, categoryController.atualizar);
app.delete("/categories/:id", verificarToken, categoryController.remover);

// Rotas de despesas (protegidas)
app.get("/expenses", verificarToken, expenseController.listar);
app.get("/expenses/:id", verificarToken, expenseController.buscarPorId);
app.post("/expenses", verificarToken, expenseController.criar);
app.put("/expenses/:id", verificarToken, expenseController.atualizar);
app.delete("/expenses/:id", verificarToken, expenseController.remover);

// Rotas do dashboard (protegidas)
app.get("/dashboard/total-expenses", verificarToken, dashboardController.totalGastos);
app.get("/dashboard/expenses-count", verificarToken, dashboardController.quantidadeDespesas);
app.get("/dashboard/expenses-by-category", verificarToken, dashboardController.gastosPorCategoria);

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

// Tratamento global de erros
app.use((erro, req, res, next) => {
  console.error(erro);
  res.status(500).json({ erro: "Erro interno no servidor" });
});

const PORT = 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados feita com sucesso!");
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((erro) => {
    console.error("Erro ao conectar com o banco de dados:", erro);
  });

module.exports = app;
