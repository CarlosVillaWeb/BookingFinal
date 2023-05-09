import React, { useEffect, useState } from "react";
import { NormasDelLugar } from "./NormasDelLugar";
import { PoliticasDeCancelacion } from "./PoliticasDeCancelacion";
import { PoliticasDeSeguridad } from "./PoliticasDeSeguridad";
import styles from "../module/PoliticasFormularioProducto.module.css";
import { productoActionTypes } from "../utils/reducers/productoReducer";

const politicaInicial = [
  { id: "", ref: 1, tipoPolitica: "Normas del lugar" },
  { id: "", ref: 2, tipoPolitica: "Politicas de Cancelación" },
  { id: "", ref: 3, tipoPolitica: "Politicas de Seguridad" },
];

export const PoliticasFormularioProducto = ({
  politicas,
  handleSelectArray,
}) => {
  const [politicasList, setPoliticasList] = useState(politicaInicial);

  useEffect(() => {
    let copiaPoliticas = politicasList.map((elemento) => {
      return { id: elemento.id };
    });
    handleSelectArray(productoActionTypes.politicas, copiaPoliticas);
  }, [politicasList]);

  const addPoliticaToPoliticasList = (evento) => {
    let nuevaPolitica = {
      id: "",
      ref: "",
      tipoPolitica: "",
    };
    nuevaPolitica.ref = politicasList.length + 1;
    nuevaPolitica.tipoPolitica = evento.target.name;
    setPoliticasList((prev) => [...prev, nuevaPolitica]);
  };

  const handleChanges = (evento, indice, tipoPolitica) => {
    const { value } = evento;
    let copiaPoliticasList = politicasList.map((elemento) => ({
      ...elemento,
    }));
    copiaPoliticasList[indice] = {
      id: value,
      ref: indice + 1,
      tipoPolitica: tipoPolitica,
    };
    setPoliticasList(copiaPoliticasList);
  };

  return (
    <div className={styles.contenedor}>
      <h2 className={styles.titulo}>Políticas del producto</h2>
      <div className={styles.contenedorGrilla}>
        <div className={styles.contenedorNormas}>
          <h3 className={styles.subtituloPoliticas}>Normas del lugar</h3>
          {politicasList
            .filter((politica) => politica.tipoPolitica === "Normas del lugar")
            .map((elemento, index, array) => {
              return (
                <NormasDelLugar
                  key={index}
                  elemento={elemento}
                  indice={index}
                  array={array}
                  addPoliticaToPoliticasList={addPoliticaToPoliticasList}
                  politicas={politicas}
                  handleChanges={handleChanges}
                />
              );
            })}
        </div>
        <div className={styles.contenedorCancelaciones}>
          <h3 className={styles.subtituloPoliticas}>
            Políticas de cancelación
          </h3>
          {politicasList
            .filter(
              (politica) => politica.tipoPolitica === "Politicas de Cancelación"
            )
            .map((elemento, index, array) => {
              return (
                <PoliticasDeCancelacion
                  key={index}
                  elemento={elemento}
                  indice={index}
                  array={array}
                  addPoliticaToPoliticasList={addPoliticaToPoliticasList}
                  politicas={politicas}
                  handleChanges={handleChanges}
                />
              );
            })}
        </div>
        <div className={styles.contenedorSeguridad}>
          <h3 className={styles.subtituloPoliticas}>Políticas de seguridad</h3>
          {politicasList
            .filter(
              (politica) => politica.tipoPolitica === "Politicas de Seguridad"
            )
            .map((elemento, index, array) => {
              return (
                <PoliticasDeSeguridad
                  key={index}
                  elemento={elemento}
                  indice={index}
                  array={array}
                  addPoliticaToPoliticasList={addPoliticaToPoliticasList}
                  politicas={politicas}
                  handleChanges={handleChanges}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};
