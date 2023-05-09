import React from "react";
import CardCategoria from "./CardCategoria";
import styles from "../module/CardsCategorias.module.css";

const Cards = ({ categorias }) => {

  return (
    <div className={styles.container}>
      {categorias?.map((objeto) => {
        return (
          <CardCategoria
            key={objeto.id}
            titulo={objeto.titulo}
            disponibilidad={objeto.descripcion}
            imagen={objeto.urlImagen}
          />
        );
      })}
    </div>
  );
};

export default Cards;
