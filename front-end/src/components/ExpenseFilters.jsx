import React, { useState } from "react";

const filtrosIniciais = {
  categoria: "",
  status: "",
  dataInicio: "",
  dataFim: "",
  valorMin: "",
  valorMax: "",
};

function ExpenseFilters({ categorias, onFiltrar }) {
  const [filtros, setFiltros] = useState(filtrosIniciais);

  function handleChange(evento) {
    const { name, value } = evento.target;
    setFiltros((atual) => ({ ...atual, [name]: value }));
  }

  function handleSubmit(evento) {
    evento.preventDefault();

    // Remove campos vazios antes de mandar pro backend
    const filtrosPreenchidos = Object.fromEntries(
      Object.entries(filtros).filter(([, valor]) => valor !== "")
    );

    onFiltrar(filtrosPreenchidos);
  }

  function handleLimpar() {
    setFiltros(filtrosIniciais);
    onFiltrar({});
  }

  return (
    <form onSubmit={handleSubmit} className="card card-body mb-4">
      <div className="row g-2 align-items-end">
        <div className="col-md-2">
          <label className="form-label small">Categoria</label>
          <select
            name="categoria"
            className="form-select form-select-sm"
            value={filtros.categoria}
            onChange={handleChange}
          >
            <option value="">Todas</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <label className="form-label small">Status</label>
          <select
            name="status"
            className="form-select form-select-sm"
            value={filtros.status}
            onChange={handleChange}
          >
            <option value="">Todos</option>
            <option value="PENDENTE">PENDENTE</option>
            <option value="PAGA">PAGA</option>
          </select>
        </div>

        <div className="col-md-2">
          <label className="form-label small">Data início</label>
          <input
            type="date"
            name="dataInicio"
            className="form-control form-control-sm"
            value={filtros.dataInicio}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <label className="form-label small">Data fim</label>
          <input
            type="date"
            name="dataFim"
            className="form-control form-control-sm"
            value={filtros.dataFim}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-1">
          <label className="form-label small">Valor mín.</label>
          <input
            type="number"
            name="valorMin"
            className="form-control form-control-sm"
            value={filtros.valorMin}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-1">
          <label className="form-label small">Valor máx.</label>
          <input
            type="number"
            name="valorMax"
            className="form-control form-control-sm"
            value={filtros.valorMax}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2 d-flex gap-2">
          <button type="submit" className="btn btn-primary btn-sm w-100">
            Filtrar
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm w-100"
            onClick={handleLimpar}
          >
            Limpar
          </button>
        </div>
      </div>
    </form>
  );
}

export default ExpenseFilters;
