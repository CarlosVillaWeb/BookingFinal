import React from "react";
import Select from "react-select";
import styles from "../module/NormasPoliticasProducto.module.css";

export const NormasDelLugar = (props) => {
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
      <label htmlFor="normasDelLugar">Descripción</label>
      <Select
        options={politicas
          ?.filter((politica) => politica.tipoPolitica === "Normas del lugar")
          .map((elemento) => {
            return {
              label: elemento.descripcion,
              value: elemento.id,
            };
          })}
        onChange={(evento) => handleChanges(evento, elemento.ref-1,  "Normas del lugar")}
        defaultValue={{
          label: "Selecciona una opción",
          value: null,
        }}
      />

      {indice === array.length - 1 ? (
        <button
          name="Normas del lugar"
          onClick={(evento) => addPoliticaToPoliticasList(evento)}
        >
          +
        </button>
      ) : undefined}
    </div>
  );
};
