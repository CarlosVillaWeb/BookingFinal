import React, { useEffect, useState } from "react";
import Select from "react-select";
import styles from "../module/AtributosProducto.module.css";
import { productoActionTypes } from "../utils/reducers/productoReducer";

const caracteristicaInicial = {
  id: "",
};

export const AtributosProducto = ({
  caracteristicas,
  handleSelectArray,
}) => {
  const [caracteristicasList, setCaracteristicasList] = useState([
    caracteristicaInicial,
  ]);

  useEffect(() => {
    handleSelectArray(productoActionTypes.caracteristicas, caracteristicasList);
  }, [caracteristicasList]);

  const addCarateristicaToCaracteristicaList = () => {
    setCaracteristicasList((prev) => [...prev, caracteristicaInicial]);
  };

  return (
    <div className={styles.contenedor}>
      <h2 className={styles.titulo}>Agregar atributos</h2>
      {caracteristicasList.map((caracteristica, index) => (
        <div key={index} className={styles.contenedorGrilla}>
          <label
            htmlFor="nombreCaracteristica"
            className={`${styles.label} ${styles.tituloNombre}`}
          >
            Nombre
          </label>
          <Select
            options={caracteristicas?.map((caracteristica) => {
              return {
                label: caracteristica.descripcion,
                value: caracteristica.id,
              };
            })}
            onChange={(evento) => {
              let copiaCaracteristicasList = caracteristicasList.map(
                (elemento) => ({ ...elemento })
              );
              copiaCaracteristicasList[copiaCaracteristicasList.length - 1] = {
                id: evento.value,
              };
              setCaracteristicasList(copiaCaracteristicasList);
            }}
            defaultValue={{
              label: "Selecciona una caracteristica",
              value: null,
            }}
          />

          <label
            htmlFor="iconoCaracteristica"
            className={`${styles.label} ${styles.tituloIcono}`}
          >
            Ícono
          </label>
          <input
            type="text"
            id="iconoCaracteristica"
            name="icono"
            value={
              caracteristicas?.find((elemento) => {
                return elemento.id === caracteristicasList.at(index).id;
              })?.icono
            }
            readOnly
          />
          {index === caracteristicasList.length - 1 ? (
            <button
              onClick={addCarateristicaToCaracteristicaList}
              className={styles.boton}
            >
              +
            </button>
          ) : undefined}
        </div>
      ))}
    </div>
  );
};
