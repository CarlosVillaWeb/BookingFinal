import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "../module/Titulo.module.css";

export const Titulo = ({ titulo, categoria }) => {
  const navigate = useNavigate();

  const regresar = () => {
    navigate(-1);
  };

  return (
    <div className={styles.contenedorHeader}>
      <div className={styles.contenedorTitulo}>
        {categoria !== undefined ? (
          <h3 className={styles.categoria}>{categoria}</h3>
        ) : undefined}
        <h2 className={styles.titulo}>{titulo}</h2>
      </div>
      <button onClick={() => regresar()} className={styles.boton}>
        <LeftOutlined className={styles.iconoRegreso} />
      </button>
    </div>
  );
};
