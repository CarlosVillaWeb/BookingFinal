import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../module/BotonReserva.module.css";

export const BotonReserva = () => {
  const navigate = useNavigate();

  const iniciarReserva = () => {
    navigate("reserva");
  };

  return (
    <div className={styles.divbox}>
      <p>Agregá tus fechas de viaje para obtener precios exactos.</p>
      <button className={styles.buttonstyle} onClick={iniciarReserva}>
        {" "}
        Iniciar reserva{" "}
      </button>
    </div>
  );
};
