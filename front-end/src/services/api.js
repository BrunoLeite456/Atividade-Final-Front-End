import axios from "axios";

// URL da API do backend (o projeto do Node/Express/MySQL que fizemos antes)
// Se o backend estiver rodando em outra porta, mude aqui.
const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Antes de cada requisição, adiciona o token JWT no header, se existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Se o token estiver inválido/expirado, o backend responde 401.
// Nesse caso, limpamos a sessão e mandamos o usuário de volta pro login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("usuarioEmail");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
