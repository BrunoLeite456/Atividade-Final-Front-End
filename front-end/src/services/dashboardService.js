import api from "./api";

async function getTotalGastos() {
  const resposta = await api.get("/dashboard/total-expenses");
  return resposta.data;
}

async function getQuantidadeDespesas() {
  const resposta = await api.get("/dashboard/expenses-count");
  return resposta.data;
}

async function getGastosPorCategoria() {
  const resposta = await api.get("/dashboard/expenses-by-category");
  return resposta.data;
}

export default { getTotalGastos, getQuantidadeDespesas, getGastosPorCategoria };
