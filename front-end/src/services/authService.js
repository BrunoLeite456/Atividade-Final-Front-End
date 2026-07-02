import api from "./api";

// POST /users
async function cadastrar(nome, email, senha) {
  const resposta = await api.post("/users", { nome, email, senha });
  return resposta.data;
}

// POST /auth/login
async function login(email, senha) {
  const resposta = await api.post("/auth/login", { email, senha });
  return resposta.data;
}

export default { cadastrar, login };
