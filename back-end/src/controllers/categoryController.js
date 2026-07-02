const { Category } = require("../models");

// GET /categories
async function listar(req, res) {
  try {
    const categorias = await Category.findAll();
    return res.json(categorias);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}

// GET /categories/:id
async function buscarPorId(req, res) {
  try {
    const categoria = await Category.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }
    return res.json(categoria);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}

// POST /categories
async function criar(req, res) {
  try {
    const { nome, descricao } = req.body;
    const categoria = await Category.create({ nome, descricao });
    return res.status(201).json(categoria);
  } catch (erro) {
    if (erro.name === "SequelizeValidationError" || erro.name === "SequelizeUniqueConstraintError") {
      const mensagens = erro.errors.map((e) => e.message);
      return res.status(400).json({ erro: mensagens });
    }
    return res.status(400).json({ erro: erro.message });
  }
}

// PUT /categories/:id
async function atualizar(req, res) {
  try {
    const categoria = await Category.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }

    const { nome, descricao } = req.body;
    await categoria.update({ nome, descricao });

    return res.json(categoria);
  } catch (erro) {
    if (erro.name === "SequelizeValidationError" || erro.name === "SequelizeUniqueConstraintError") {
      const mensagens = erro.errors.map((e) => e.message);
      return res.status(400).json({ erro: mensagens });
    }
    return res.status(400).json({ erro: erro.message });
  }
}

// DELETE /categories/:id
async function remover(req, res) {
  try {
    const categoria = await Category.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }

    await categoria.destroy();
    return res.status(204).send();
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
