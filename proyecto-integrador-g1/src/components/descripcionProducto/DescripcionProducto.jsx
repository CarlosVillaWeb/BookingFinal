import React from "react";
import styles from "../module/DescripcionProducto.module.css";

export const DescripcionProducto = ({ descripcion }) => {

  const parrafos = descripcion.split(". ")
  return (
    <div className={styles.contenedor}>
      <p>{descripcion}</p>
    </div>
  );
};
