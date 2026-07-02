import api from "./api";

async function listar() {
  const resposta = await api.get("/categories");
  return resposta.data;
}

async function buscarPorId(id) {
  const resposta = await api.get(`/categories/${id}`);
  return resposta.data;
}

async function criar(dados) {
  const resposta = await api.post("/categories", dados);
  return resposta.data;
}

async function atualizar(id, dados) {
  const resposta = await api.put(`/categories/${id}`, dados);
  return resposta.data;
}

async function remover(id) {
  await api.delete(`/categories/${id}`);
}

export default { listar, buscarPorId, criar, atualizar, remover };
