import React, { useState, createContext, useMemo, useEffect } from "react";
import { getAPI } from "../services/peticionesFetch";

export const ListadoContext = createContext();

export const ListadoProvider = (props) => {
  const [llamadoAPIProductos, setLlamadoAPIProductos] =
    useState("productos/random");
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  function cargarProductos(datos) {
    setProductos(datos);
  }

  function llamadoAPI(endPoint) {
    setLlamadoAPIProductos(endPoint);
  }

  useEffect(() => {
    async function loadProductos() {
      setLoading(true);
      const response = await getAPI(llamadoAPIProductos);
      if (response !== undefined) {
        setProductos(response);
        setLoading(false);
      }
    }
    loadProductos();
  }, [llamadoAPIProductos]);

  const providerValue = useMemo(
    () => ({
      productos,
      loading,
      cargarProductos,
      llamadoAPI,
    }),
    [productos, cargarProductos, llamadoAPI]
  );

  return (
    <ListadoContext.Provider value={providerValue}>
      {props.children}
    </ListadoContext.Provider>
  );
};
