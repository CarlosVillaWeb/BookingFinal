import React from "react";
import Select from "react-select";
import styles from "../module/SeguridadPoliticasProducto.module.css";

export const PoliticasDeSeguridad = (props) => {
  const {
    array,
    indice,
    elemento,
    addPoliticaToPoliticasList,
    politicas,
    handleChanges,
  } = props;
  return (
    <div className={styles.contenedor}>
      <label htmlFor="politicasSeguridad">Descripción</label>
      <Select
        options={politicas
          ?.filter(
            (politica) => politica.tipoPolitica === "Politicas de Seguridad"
          )
          .map((elemento) => {
            return {
              label: elemento.descripcion,
              value: elemento.id,
            };
          })}
        onChange={(evento) =>
          handleChanges(evento, elemento.ref - 1, "Politicas de Seguridad")
        }
        defaultValue={{
          label: "Selecciona una opción",
          value: null,
        }}
      />
      {indice === array.length - 1 ? (
        <button
          name="Politicas de Seguridad"
          onClick={(evento) => addPoliticaToPoliticasList(evento)}
        >
          +
        </button>
      ) : undefined}
    </div>
  );
};
