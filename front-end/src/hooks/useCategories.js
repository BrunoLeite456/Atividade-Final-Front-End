import { useCallback, useEffect, useState } from "react";
import categoryService from "../services/categoryService";

function useCategories() {
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await categoryService.listar();
      setCategorias(dados);
    } catch (err) {
      setErro("Não foi possível carregar as categorias");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { categorias, carregando, erro, recarregar: carregar };
}

export default useCategories;
