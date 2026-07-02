const { Op } = require("sequelize");
const { Expense, Category } = require("../models");

// GET /expenses - lista as despesas do usuário logado, com filtros opcionais
// Filtros aceitos via query string: categoria, status, dataInicio, dataFim, valorMin, valorMax
async function listar(req, res) {
  try {
    const { categoria, status, dataInicio, dataFim, valorMin, valorMax } = req.query;

    const filtros = { usuarioId: req.usuarioId };

    if (categoria) {
      filtros.categoriaId = categoria;
    }

    if (status) {
      filtros.status = status;
    }

    if (dataInicio && dataFim) {
      filtros.data = { [Op.between]: [dataInicio, dataFim] };
    } else if (dataInicio) {
      filtros.data = { [Op.gte]: dataInicio };
    } else if (dataFim) {
      filtros.data = { [Op.lte]: dataFim };
    }

    if (valorMin && valorMax) {
      filtros.valor = { [Op.between]: [valorMin, valorMax] };
    } else if (valorMin) {
      filtros.valor = { [Op.gte]: valorMin };
    } else if (valorMax) {
      filtros.valor = { [Op.lte]: valorMax };
    }

    const despesas = await Expense.findAll({
      where: filtros,
      include: { model: Category },
    });

    return res.json(despesas);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}

// GET /expenses/:id
async function buscarPorId(req, res) {
  try {
    const despesa = await Expense.findOne({
      where: { id: req.params.id, usuarioId: req.usuarioId },
      include: { model: Category },
    });

    if (!despesa) {
      return res.status(404).json({ erro: "Despesa não encontrada" });
    }

    return res.json(despesa);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}

// POST /expenses
async function criar(req, res) {
  try {
    const { descricao, valor, data, status, categoriaId } = req.body;

    const despesa = await Expense.create({
      descricao,
      valor,
      data,
      status,
      categoriaId,
      usuarioId: req.usuarioId,
    });

    return res.status(201).json(despesa);
  } catch (erro) {
    if (erro.name === "SequelizeValidationError" || erro.name === "SequelizeUniqueConstraintError") {
      const mensagens = erro.errors.map((e) => e.message);
      return res.status(400).json({ erro: mensagens });
    }
    return res.status(400).json({ erro: erro.message });
  }
}

// PUT /expenses/:id
async function atualizar(req, res) {
  try {
    const despesa = await Expense.findOne({
      where: { id: req.params.id, usuarioId: req.usuarioId },
    });

    if (!despesa) {
      return res.status(404).json({ erro: "Despesa não encontrada" });
    }

    const { descricao, valor, data, status, categoriaId } = req.body;
    await despesa.update({ descricao, valor, data, status, categoriaId });

    return res.json(despesa);
  } catch (erro) {
    if (erro.name === "SequelizeValidationError" || erro.name === "SequelizeUniqueConstraintError") {
      const mensagens = erro.errors.map((e) => e.message);
      return res.status(400).json({ erro: mensagens });
    }
    return res.status(400).json({ erro: erro.message });
  }
}

// DELETE /expenses/:id
async function remover(req, res) {
  try {
    const despesa = await Expense.findOne({
      where: { id: req.params.id, usuarioId: req.usuarioId },
    });

    if (!despesa) {
      return res.status(404).json({ erro: "Despesa não encontrada" });
    }

    await despesa.destroy();
    return res.status(204).send();
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
