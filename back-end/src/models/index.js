const sequelize = require("../config/database");
const User = require("./User");
const Category = require("./Category");
const Expense = require("./Expense");

// Um usuário possui várias despesas
User.hasMany(Expense, { foreignKey: "usuarioId" });
Expense.belongsTo(User, { foreignKey: "usuarioId" });

// Uma categoria possui várias despesas
Category.hasMany(Expense, { foreignKey: "categoriaId" });
Expense.belongsTo(Category, { foreignKey: "categoriaId" });

module.exports = {
  sequelize,
  User,
  Category,
  Expense,
};
