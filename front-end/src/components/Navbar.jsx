import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { isAuthenticated, usuarioEmail, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          Controle de Despesas
        </Link>

        <div className="navbar-nav me-auto">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
          <Link className="nav-link" to="/categories">
            Categorias
          </Link>
          <Link className="nav-link" to="/expenses">
            Despesas
          </Link>
        </div>

        <div className="d-flex align-items-center">
          {usuarioEmail && (
            <span className="text-light me-3 small">{usuarioEmail}</span>
          )}
          <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
