import { useState, useEffect } from "react";
import { getAPI } from "../services/peticionesFetch";

export const useCaracteristicas = () => {
  const [caracteristicas, setCaracteristicas] = useState();
  const [loadingCaracteristicas, setLoadingCaracteristicas] = useState(false);

  useEffect(() => {
    async function getCaracteristicas() {
      setLoadingCaracteristicas(true);
      const response = await getAPI("caracteristicas");
      if (response !== undefined) {
        setCaracteristicas(response);
        setLoadingCaracteristicas(false);
      }
    }
    getCaracteristicas();
  }, []);

  return {
    caracteristicas,
    loadingCaracteristicas,
  };
};
