import React from "react";
import Select from "react-select";
import styles from "../module/CancelacionPoliticasProductos.module.css";

export const PoliticasDeCancelacion = (props) => {
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
      <label htmlFor="politicasCancelacion">Descripción</label>
      <Select
        options={politicas
          ?.filter(
            (politica) => politica.tipoPolitica === "Politicas de Cancelación"
          )
          .map((elemento) => {
            return {
              label: elemento.descripcion,
              value: elemento.id,
            };
          })}
        onChange={(evento) =>
          handleChanges(evento, elemento.ref - 1, "Politicas de Cancelación")
        }
        defaultValue={{
          label: "Selecciona una opción",
          value: null,
        }}
      />
      {indice === array.length - 1 ? (
        <button
          name="Politicas de Cancelación"
          onClick={(evento) => addPoliticaToPoliticasList(evento)}
        >
          +
        </button>
      ) : undefined}
    </div>
  );
};
