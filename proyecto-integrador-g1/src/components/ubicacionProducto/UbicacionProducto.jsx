import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import styles from "../module/UbicacionProducto.module.css";

export const UbicacionProducto = ({ producto }) => {
  return (
    <div className={styles.contenedorUbicacion}>
      <span className={styles.ubicacion}>
        <FontAwesomeIcon icon={faLocationDot} />
        &nbsp;
        {producto.ubicacion.ciudad}, {producto.ubicacion.pais}
      </span>
      <div className={styles.contenedorCalificacion}>
        <span>Muy bueno</span>
        &nbsp;
        <span className={styles.calificacion}>{producto?.calificacion}</span>
      </div>
    </div>
  );
};
