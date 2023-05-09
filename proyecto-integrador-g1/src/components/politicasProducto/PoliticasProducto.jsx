import React from "react";
import styles from "../module/PoliticasProducto.module.css";

export const PoliticasProducto = ({ politicas }) => {
  return (
    <div className={styles.contenedor}>
      <h3 className={styles.titulo}>Políticas del lugar</h3>
      <div className={styles.grillaPoliticas}>
        <ul>
          Normas del lugar
          {politicas
            .filter((politica) => politica.tipoPolitica === "Normas del lugar")
            .map((elemento) => {
              return <li key={elemento.id}>{elemento.descripcion}</li>;
            })}
        </ul>
        <ul>
          Politicas de Seguridad
          {politicas
            .filter(
              (politica) => politica.tipoPolitica === "Politicas de Seguridad"
            )
            .map((elemento) => {
              return <li key={elemento.id}>{elemento.descripcion}</li>;
            })}
        </ul>
        <ul>
          Politicas de Cancelación
          {politicas
            .filter(
              (politica) => politica.tipoPolitica === "Politicas de Cancelación"
            )
            .map((elemento) => {
              return <li key={elemento.id}>{elemento.descripcion}</li>;
            })}
        </ul>
      </div>
    </div>
  );
};
