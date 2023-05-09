import React, { useState, useEffect } from "react";
import { getAPI } from "../services/peticionesFetch";

export const useCategoria = () => {
  const [categorias, setCategorias] = useState();
  const [loadingCategorias, setLoadingCategorias] = useState(false);

  useEffect(() => {
    async function getCategorias() {
      setLoadingCategorias(true);
      const response = await getAPI("categorias");
      if (response !== undefined) {
        setCategorias(response);
        setLoadingCategorias(false);
      }
    }
    getCategorias();
  }, []);

  return {
    categorias,
    loadingCategorias,
  };
};
