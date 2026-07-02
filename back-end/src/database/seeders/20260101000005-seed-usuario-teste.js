"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface) => {
    const senhaCriptografada = await bcrypt.hash("123456", 10);

    await queryInterface.bulkInsert("usuarios", [
      {
        nome: "Usuário Teste",
        email: "teste@teste.com",
        senha: senhaCriptografada,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("usuarios", { email: "teste@teste.com" }, {});
  },
};
