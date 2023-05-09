import React from "react";
import { Card } from "./Card";
import { Spin } from "antd";
import { ListadoContext } from "../utils/context/ListadoContext";
import styles from "../module/Listado.module.css";

export const Listado = () => {
  const { productos, loading } = React.useContext(ListadoContext);

  return (
    <section className={`${styles.contenedor}`}>
      <h2 className={`${styles.titulo}`}>Recomendaciones</h2>
      {loading ? (
        <div className={styles.loading}>
          <Spin size="medium" />
        </div>
      ) : (
        <div className={`${styles.contenedorLista}`}>
          {productos.map((elemento) => (
            <Card {...elemento} key={elemento.id} />
          ))}
        </div>
      )}
    </section>
  );
};
