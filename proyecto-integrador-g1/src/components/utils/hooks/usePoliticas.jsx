import React, { useState, useEffect } from "react";
import { getAPI } from "../services/peticionesFetch";

export const usePoliticas = () => {
  const [politicas, setPoliticas] = useState();
  const [loadingPoliticas, setLoadingPoliticas] = useState(false);

  useEffect(() => {
    async function getPoliticas() {
      setLoadingPoliticas(true);
      const response = await getAPI("politicas");
      if (response !== undefined) {
        setPoliticas(response);
        setLoadingPoliticas(false);
      }
    }
    getPoliticas();
  }, []);

  return {
    politicas,
    loadingPoliticas,
  };
};
