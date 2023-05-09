import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faWifi,
  faShower,
  faTv,
  // faAirConditioner,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../module/Card.module.css";

export const Card = ({
  id,
  imagenes,
  categoria,
  caracteristicas,
  titulo,
  ubicacion,
  descripcion,
}) => {
  const navigate = useNavigate();

  function onClickProducto(idProducto) {
    navigate(`/producto/${idProducto}`);
  }
  return (
    <div className={`${styles.contenedor}`}>
      <div className={`${styles.contenedorImagen}`}>
        <img src={imagenes[1]?.url} alt="Imagen" title="imagen" />
      </div>
      <div className={`${styles.contenedorDetalles}`}>
        <div className={`${styles.contendorCategoriaNombre}`}>
          <h4 className={`${styles.categoria}`}>{categoria.titulo}</h4>
          <h3 className={`${styles.nombre}`}>{titulo}</h3>
        </div>
        <h4 className={`${styles.ubicacion}`}>
          <FontAwesomeIcon icon={faLocationDot} />
          <span>{ubicacion.ciudad}</span>
        </h4>
        <p className={`${styles.descripcion}`}>
          {descripcion.slice(0, 75)}{" "}
          <span onClick={() => onClickProducto(id)}>más...</span>
        </p>
        <button
          className={`${styles.boton}`}
          onClick={() => onClickProducto(id)}
        >
          Ver más
        </button>
      </div>
    </div>
  );
};
