import { useCallback, useEffect, useState } from "react";
import expenseService from "../services/expenseService";

function useExpenses(filtrosIniciais = {}) {
  const [despesas, setDespesas] = useState([]);
  const [filtros, setFiltros] = useState(filtrosIniciais);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await expenseService.listar(filtros);
      setDespesas(dados);
    } catch (err) {
      setErro("Não foi possível carregar as despesas");
    } finally {
      setCarregando(false);
    }
  }, [filtros]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { despesas, filtros, setFiltros, carregando, erro, recarregar: carregar };
}

export default useExpenses;
