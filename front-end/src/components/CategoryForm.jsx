import React, { useState, useEffect } from "react";

const valoresIniciais = { nome: "", descricao: "" };

function CategoryForm({ categoriaEditando, onSalvar, onCancelar }) {
  const [form, setForm] = useState(valoresIniciais);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (categoriaEditando) {
      setForm({
        nome: categoriaEditando.nome || "",
        descricao: categoriaEditando.descricao || "",
      });
    } else {
      setForm(valoresIniciais);
    }
  }, [categoriaEditando]);

  function handleChange(evento) {
    const { name, value } = evento.target;
    setForm((atual) => ({ ...atual, [name]: value }));
  }

  async function handleSubmit(evento) {
    evento.preventDefault();
    setErro(null);

    if (!form.nome.trim()) {
      setErro("O nome da categoria é obrigatório");
      return;
    }

    try {
      await onSalvar(form);
      setForm(valoresIniciais);
    } catch (err) {
      const mensagem = err.response?.data?.erro;
      setErro(Array.isArray(mensagem) ? mensagem.join(", ") : mensagem || "Erro ao salvar categoria");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card card-body mb-4">
      <h5 className="mb-3">
        {categoriaEditando ? "Editar categoria" : "Nova categoria"}
      </h5>

      {erro && <div className="alert alert-danger py-2">{erro}</div>}

      <div className="mb-3">
        <label className="form-label">Nome</label>
        <input
          type="text"
          name="nome"
          className="form-control"
          value={form.nome}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descrição</label>
        <input
          type="text"
          name="descricao"
          className="form-control"
          value={form.descricao}
          onChange={handleChange}
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
        {categoriaEditando && (
          <button type="button" className="btn btn-secondary" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default CategoryForm;
