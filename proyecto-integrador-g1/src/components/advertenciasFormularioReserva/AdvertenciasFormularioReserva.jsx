import React from "react";
import styles from "../module/AdvertenciasFormularioReserva.module.css";

export const AdvertenciasFormularioReserva = ({ errores }) => {
  return (
    <div className={styles.contenedor}>
      {Object.values(errores).map((error) => {
        return (
          <span className={styles.mensajeError} key={error}>
            *{error}
          </span>
        );
      })}
    </div>
  );
};
