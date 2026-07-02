"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("categorias", [
      {
        nome: "Alimentação",
        descricao: "Gastos com comida e mercado",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: "Transporte",
        descricao: "Gastos com transporte e combustível",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: "Lazer",
        descricao: "Gastos com lazer e entretenimento",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: "Saúde",
        descricao: "Gastos com saúde e remédios",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("categorias", null, {});
  },
};
