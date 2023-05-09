import React from "react";
import { AutoComplete } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faWifi } from "@fortawesome/free-solid-svg-icons";
import { useCiudades } from "../utils/hooks/useCiudades";
import styles from "../module/InputAutocomplete.module.css";

function buscadorCities(array) {
  return array?.map((element) => {
    return {
      label: (
        <div className={styles.contenedorLabel}>
          <FontAwesomeIcon
            icon={faLocationDot}
            className={styles.icon}
            style={{
              color: "#263238",
              fontSize: "1.3rem",
            }}
          />
          <div className={styles.contenedorDescripcionLabel}>
            <span className={styles.tituloLabel}>{element.ciudad}</span>
            <span className={styles.subtituloLabel}>{element.pais}</span>
          </div>
        </div>
      ),
      value: element.ciudad,
    };
  });
}

export const InputAutcomplete = ({ manejadorDeEstadoBuscador }) => {
  const { ciudades } = useCiudades();

  return (
    <AutoComplete
      className={`${styles.inputAutcomplete}`}
      placeholder="¿A dónde vamos?"
      allowClear={true}
      options={buscadorCities(ciudades)}
      filterOption={true}
      onSelect={(value) => {
        manejadorDeEstadoBuscador(value);
      }}
      onChange={(value) => manejadorDeEstadoBuscador(value)}
    />
  );
};
