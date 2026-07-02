const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Chave usada para gerar e validar o token JWT (num projeto real ficaria em variável de ambiente)
const JWT_SECRET = "chave-secreta-controle-despesas";

// POST /users - cadastro de usuário
async function cadastrar(req, res) {
  try {
    const { nome, email, senha } = req.body;

    const usuarioExistente = await User.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ erro: "Este email já está cadastrado" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await User.create({
      nome,
      email,
      senha: senhaCriptografada,
    });

    return res.status(201).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    });
  } catch (erro) {
    if (erro.name === "SequelizeValidationError" || erro.name === "SequelizeUniqueConstraintError") {
      const mensagens = erro.errors.map((e) => e.message);
      return res.status(400).json({ erro: mensagens });
    }
    return res.status(400).json({ erro: erro.message });
  }
}

// POST /auth/login
async function login(req, res) {
  try {
    const { email, senha } = req.body;

    const usuario = await User.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    const token = jwt.sign({ id: usuario.id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({ token });
  } catch (erro) {
    return res.status(400).json({ erro: erro.message });
  }
}

module.exports = { cadastrar, login, JWT_SECRET };
