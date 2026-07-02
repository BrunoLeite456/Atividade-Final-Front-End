const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Expense = sequelize.define(
  "Expense",
  {
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "A descrição é obrigatória" },
      },
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: {
          args: [0.01],
          msg: "O valor deve ser maior que zero",
        },
      },
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: { msg: "Data inválida", args: true },
      },
    },
    status: {
      type: DataTypes.ENUM("PENDENTE", "PAGA"),
      allowNull: false,
      defaultValue: "PENDENTE",
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "despesas",
  }
);

module.exports = Expense;
