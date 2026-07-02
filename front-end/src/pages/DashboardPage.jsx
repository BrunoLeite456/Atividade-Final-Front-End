import React, { useEffect, useState } from "react";
import dashboardService from "../services/dashboardService";
import expenseService from "../services/expenseService";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import AlertMessage from "../components/AlertMessage.jsx";

function DashboardPage() {
  const [total, setTotal] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [gastosPorCategoria, setGastosPorCategoria] = useState([]);
  const [ultimasDespesas, setUltimasDespesas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      setCarregando(true);
      setErro(null);
      try {
        const [totalResp, quantidadeResp, categoriaResp, despesasResp] =
          await Promise.all([
            dashboardService.getTotalGastos(),
            dashboardService.getQuantidadeDespesas(),
            dashboardService.getGastosPorCategoria(),
            expenseService.listar(),
          ]);

        setTotal(totalResp.total);
        setQuantidade(quantidadeResp.quantidade);
        setGastosPorCategoria(categoriaResp);

        const ultimas = [...despesasResp]
          .sort((a, b) => b.id - a.id)
          .slice(0, 5);
        setUltimasDespesas(ultimas);
      } catch (err) {
        setErro("Não foi possível carregar o dashboard");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  if (carregando) return <LoadingSpinner />;

  return (
    <div className="container">
      <h3 className="mb-4">Dashboard</h3>

      <AlertMessage mensagem={erro} />

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h6 className="card-title">Total de gastos</h6>
              <p className="fs-3 mb-0">
                {Number(total).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h6 className="card-title">Quantidade de despesas</h6>
              <p className="fs-3 mb-0">{quantidade}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">Gastos por categoria</div>
            <ul className="list-group list-group-flush">
              {gastosPorCategoria.length === 0 && (
                <li className="list-group-item text-muted">
                  Nenhum gasto registrado ainda
                </li>
              )}
              {gastosPorCategoria.map((item) => (
                <li
                  key={item.categoria}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span>{item.categoria}</span>
                  <strong>
                    {Number(item.total).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">Últimas despesas cadastradas</div>
            <ul className="list-group list-group-flush">
              {ultimasDespesas.length === 0 && (
                <li className="list-group-item text-muted">
                  Nenhuma despesa cadastrada ainda
                </li>
              )}
              {ultimasDespesas.map((despesa) => (
                <li
                  key={despesa.id}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span>{despesa.descricao}</span>
                  <strong>
                    {Number(despesa.valor).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
