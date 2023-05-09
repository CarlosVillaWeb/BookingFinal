import React from "react";
import styles from "../module/CaracteristicasProducto.module.css";

export const CaracteristicasProducto = ({ caracteristicas }) => {
  return (
    <div className={styles.contenedor}>
      <h3 className={styles.titulo}>¿Que ofrece este lugar?</h3>
      <ul className={styles.listaCaracteristicas}>
        {caracteristicas.map((caracteristica) => {
          return <li key={caracteristica.id}>{caracteristica.descripcion}</li>;
        })}
      </ul>
    </div>
  );
};