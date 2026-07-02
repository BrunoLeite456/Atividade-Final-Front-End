import React, { useState } from "react";
import useCategories from "../hooks/useCategories";
import categoryService from "../services/categoryService";
import CategoryForm from "../components/CategoryForm.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import AlertMessage from "../components/AlertMessage.jsx";

function CategoriesPage() {
  const { categorias, carregando, erro, recarregar } = useCategories();
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [erroAcao, setErroAcao] = useState(null);

  async function handleSalvar(dados) {
    if (categoriaEditando) {
      await categoryService.atualizar(categoriaEditando.id, dados);
    } else {
      await categoryService.criar(dados);
    }
    setCategoriaEditando(null);
    recarregar();
  }

  async function handleRemover(id) {
    if (!window.confirm("Tem certeza que deseja remover esta categoria?")) {
      return;
    }
    setErroAcao(null);
    try {
      await categoryService.remover(id);
      recarregar();
    } catch (err) {
      setErroAcao(
        err.response?.data?.erro || "Não foi possível remover a categoria"
      );
    }
  }

  return (
    <div className="container">
      <h3 className="mb-4">Categorias</h3>

      <CategoryForm
        categoriaEditando={categoriaEditando}
        onSalvar={handleSalvar}
        onCancelar={() => setCategoriaEditando(null)}
      />

      <AlertMessage mensagem={erro} />
      <AlertMessage mensagem={erroAcao} />

      {carregando ? (
        <LoadingSpinner />
      ) : (
        <table className="table table-striped bg-white">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th style={{ width: 160 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categorias.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center text-muted">
                  Nenhuma categoria cadastrada
                </td>
              </tr>
            )}
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.nome}</td>
                <td>{categoria.descricao}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => setCategoriaEditando(categoria)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleRemover(categoria.id)}
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

export default CategoriesPage;
