import React, { useState, useEffect } from "react";

const valoresIniciais = {
  descricao: "",
  valor: "",
  data: "",
  status: "PENDENTE",
  categoriaId: "",
};

function ExpenseForm({ despesaEditando, categorias, onSalvar, onCancelar }) {
  const [form, setForm] = useState(valoresIniciais);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (despesaEditando) {
      setForm({
        descricao: despesaEditando.descricao || "",
        valor: despesaEditando.valor || "",
        data: despesaEditando.data || "",
        status: despesaEditando.status || "PENDENTE",
        categoriaId: despesaEditando.categoriaId || "",
      });
    } else {
      setForm(valoresIniciais);
    }
  }, [despesaEditando]);

  function handleChange(evento) {
    const { name, value } = evento.target;
    setForm((atual) => ({ ...atual, [name]: value }));
  }

  async function handleSubmit(evento) {
    evento.preventDefault();
    setErro(null);

    if (!form.descricao.trim() || !form.valor || !form.data || !form.categoriaId) {
      setErro("Preencha todos os campos obrigatórios");
      return;
    }

    if (Number(form.valor) <= 0) {
      setErro("O valor deve ser maior que zero");
      return;
    }

    try {
      await onSalvar({ ...form, valor: Number(form.valor) });
      setForm(valoresIniciais);
    } catch (err) {
      const mensagem = err.response?.data?.erro;
      setErro(Array.isArray(mensagem) ? mensagem.join(", ") : mensagem || "Erro ao salvar despesa");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card card-body mb-4">
      <h5 className="mb-3">
        {despesaEditando ? "Editar despesa" : "Nova despesa"}
      </h5>

      {erro && <div className="alert alert-danger py-2">{erro}</div>}

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Descrição</label>
          <input
            type="text"
            name="descricao"
            className="form-control"
            value={form.descricao}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3 mb-3">
          <label className="form-label">Valor (R$)</label>
          <input
            type="number"
            step="0.01"
            name="valor"
            className="form-control"
            value={form.valor}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3 mb-3">
          <label className="form-label">Data</label>
          <input
            type="date"
            name="data"
            className="form-control"
            value={form.data}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Categoria</label>
          <select
            name="categoriaId"
            className="form-select"
            value={form.categoriaId}
            onChange={handleChange}
          >
            <option value="">Selecione...</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            className="form-select"
            value={form.status}
            onChange={handleChange}
          >
            <option value="PENDENTE">PENDENTE</option>
            <option value="PAGA">PAGA</option>
          </select>
        </div>
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
        {despesaEditando && (
          <button type="button" className="btn btn-secondary" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default ExpenseForm;
