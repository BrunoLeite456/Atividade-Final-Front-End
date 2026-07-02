import api from "./api";

// filtros: { categoria, status, dataInicio, dataFim, valorMin, valorMax }
async function listar(filtros = {}) {
  const resposta = await api.get("/expenses", { params: filtros });
  return resposta.data;
}

async function buscarPorId(id) {
  const resposta = await api.get(`/expenses/${id}`);
  return resposta.data;
}

async function criar(dados) {
  const resposta = await api.post("/expenses", dados);
  return resposta.data;
}

async function atualizar(id, dados) {
  const resposta = await api.put(`/expenses/${id}`, dados);
  return resposta.data;
}

async function remover(id) {
  await api.delete(`/expenses/${id}`);
}

export default { listar, buscarPorId, criar, atualizar, remover };
