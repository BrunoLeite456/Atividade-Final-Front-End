import React, { createContext, useState } from "react";
import authService from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [usuarioEmail, setUsuarioEmail] = useState(
    localStorage.getItem("usuarioEmail")
  );

  const isAuthenticated = Boolean(token);

  async function login(email, senha) {
    const dados = await authService.login(email, senha);

    localStorage.setItem("token", dados.token);
    localStorage.setItem("usuarioEmail", email);

    setToken(dados.token);
    setUsuarioEmail(email);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioEmail");
    setToken(null);
    setUsuarioEmail(null);
  }

  return (
    <AuthContext.Provider
      value={{ token, usuarioEmail, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
