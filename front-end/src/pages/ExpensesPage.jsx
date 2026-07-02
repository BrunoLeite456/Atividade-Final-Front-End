import React, { useState } from "react";
import useExpenses from "../hooks/useExpenses";
import useCategories from "../hooks/useCategories";
import expenseService from "../services/expenseService";
import ExpenseForm from "../components/ExpenseForm.jsx";
import ExpenseFilters from "../components/ExpenseFilters.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import AlertMessage from "../components/AlertMessage.jsx";

function ExpensesPage() {
  const { categorias } = useCategories();
  const { despesas, setFiltros, carregando, erro, recarregar } = useExpenses();
  const [despesaEditando, setDespesaEditando] = useState(null);
  const [erroAcao, setErroAcao] = useState(null);

  async function handleSalvar(dados) {
    if (despesaEditando) {
      await expenseService.atualizar(despesaEditando.id, dados);
    } else {
      await expenseService.criar(dados);
    }
    setDespesaEditando(null);
    recarregar();
  }

  async function handleRemover(id) {
    if (!window.confirm("Tem certeza que deseja remover esta despesa?")) {
      return;
    }
    setErroAcao(null);
    try {
      await expenseService.remover(id);
      recarregar();
    } catch (err) {
      setErroAcao(
        err.response?.data?.erro || "Não foi possível remover a despesa"
      );
    }
  }

  return (
    <div className="container">
      <h3 className="mb-4">Despesas</h3>

      <ExpenseForm
        despesaEditando={despesaEditando}
        categorias={categorias}
        onSalvar={handleSalvar}
        onCancelar={() => setDespesaEditando(null)}
      />

      <ExpenseFilters categorias={categorias} onFiltrar={setFiltros} />

      <AlertMessage mensagem={erro} />
      <AlertMessage mensagem={erroAcao} />

      {carregando ? (
        <LoadingSpinner />
      ) : (
        <table className="table table-striped bg-white">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Status</th>
              <th>Categoria</th>
              <th style={{ width: 160 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {despesas.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-muted">
                  Nenhuma despesa encontrada
                </td>
              </tr>
            )}
            {despesas.map((despesa) => (
              <tr key={despesa.id}>
                <td>{despesa.descricao}</td>
                <td>
                  {Number(despesa.valor).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>{despesa.data}</td>
                <td>
                  <span
                    className={`badge ${
                      despesa.status === "PAGA" ? "bg-success" : "bg-warning text-dark"
                    }`}
                  >
                    {despesa.status}
                  </span>
                </td>
                <td>{despesa.Category?.nome || "-"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => setDespesaEditando(despesa)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleRemover(despesa.id)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExpensesPage;
