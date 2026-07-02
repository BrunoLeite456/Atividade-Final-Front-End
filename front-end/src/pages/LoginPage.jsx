import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AlertMessage from "../components/AlertMessage.jsx";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(evento) {
    evento.preventDefault();
    setErro(null);
    setCarregando(true);

    try {
      await login(email, senha);
      navigate("/dashboard");
    } catch (err) {
      setErro(err.response?.data?.erro || "Não foi possível fazer login");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5 mt-5">
          <div className="card card-body shadow-sm">
            <h3 className="mb-4 text-center">Entrar</h3>

            <AlertMessage mensagem={erro} />

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Senha</label>
                <input
                  type="password"
                  className="form-control"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={carregando}
              >
                {carregando ? "Entrando..." : "Entrar"}
              </button>
            </form>

            <p className="text-center mt-3 mb-0">
              Não tem conta? <Link to="/register">Cadastre-se</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
