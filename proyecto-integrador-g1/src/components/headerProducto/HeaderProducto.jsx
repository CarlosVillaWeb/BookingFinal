import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "../module/HeaderProducto.module.css";

export const HeaderProducto = ({ producto }) => {
  const navigate = useNavigate();

  const regresar = () => {
    navigate(-1);
  };

  return (
    <div className={styles.contenedorHeader}>
      <div className={styles.contenedorTitulo}>
        <h3 className={styles.categoria}>{producto.categoria.titulo}</h3>
        <h2 className={styles.titulo}>{producto.titulo}</h2>
      </div>
      <button onClick={() => regresar()} className={styles.boton}>
        <LeftOutlined className={styles.iconoRegreso} />
      </button>
    </div>
  );
};
