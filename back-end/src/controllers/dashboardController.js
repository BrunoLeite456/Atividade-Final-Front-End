const { Expense, Category } = require("../models");
const { fn, col } = require("sequelize");

// GET /dashboard/total-expenses
async function totalGastos(req, res) {
  try {
    const total = await Expense.sum("valor", {
      where: { usuarioId: req.usuarioId },
    });

    return res.json({ total: total || 0 });
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}

// GET /dashboard/expenses-count
async function quantidadeDespesas(req, res) {
  try {
    const quantidade = await Expense.count({
      where: { usuarioId: req.usuarioId },
    });

    return res.json({ quantidade });
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}

// GET /dashboard/expenses-by-category
async function gastosPorCategoria(req, res) {
  try {
    const resultado = await Expense.findAll({
      where: { usuarioId: req.usuarioId },
      attributes: [[fn("SUM", col("valor")), "total"]],
      include: {
        model: Category,
        attributes: ["nome"],
      },
      group: ["Category.id", "Category.nome"],
    });

    const resposta = resultado.map((item) => ({
      categoria: item.Category.nome,
      total: Number(item.dataValues.total),
    }));

    return res.json(resposta);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}

module.exports = { totalGastos, quantidadeDespesas, gastosPorCategoria };
