import React, { useState, useEffect } from "react";
import { getAPI } from "../services/peticionesFetch";

export const useCiudades = () => {
  const [ciudades, setCiudades] = useState();
  const [loadingCiudades, setLoadingCiudades] = useState(false);

  useEffect(() => {
    async function getCiudades() {
      setLoadingCiudades(true);
      const response = await getAPI("ciudades");
      if (response !== undefined) {
        setCiudades(response);
        setLoadingCiudades(false);
      }
    }
    getCiudades();
  }, []);

  return {
    ciudades,
    loadingCiudades,
  };
};
