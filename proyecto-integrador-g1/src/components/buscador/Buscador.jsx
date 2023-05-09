import React, { useEffect, useState } from "react";
import { InputAutcomplete } from "./InputAutcomplete";
import { Calendar } from "./Calendar";
import { ListadoContext } from "../utils/context/ListadoContext";
import styles from "../module/Buscador.module.css";

export const Buscador = () => {
  const { llamadoAPI } = React.useContext(ListadoContext);
  const [estadoBuscador, setEstadoBuscador] = useState();
  const [estadoCalendario, setEstadoCalendario] = useState();
  const [endPoint, setEndPoint] = useState();

  function manejadorDeEstadoBuscador(valor) {
    setEstadoBuscador(valor);
  }

  function manejadorDeEstadoCalendario(valor) {
    setEstadoCalendario(valor);
  }

  function validacionInputBuscador() {
    if (estadoBuscador && estadoBuscador !== "") {
      setEstadoBuscador((prev) => prev.trim());
    } else {
      setEstadoBuscador(undefined);
      setEstadoCalendario(undefined);
    }
  }

  useEffect(() => {
    if (estadoBuscador && estadoCalendario) {
      setEndPoint(
        `${estadoBuscador}/fechainicial/${estadoCalendario[0]}/fechafinal/${estadoCalendario[1]}`
      );
    } else if (estadoBuscador && !estadoCalendario) {
      setEndPoint(`${estadoBuscador}`);
    } else if (!estadoBuscador && estadoCalendario) {
      setEndPoint(
        `fechainicial/${estadoCalendario[0]}/fechafinal/${estadoCalendario[1]}`
      );
    } else if (!estadoBuscador && !estadoCalendario) {
      console.error("Error no hay datos para enviar");
    }
  }, [estadoBuscador, estadoCalendario]);

  function envioFormulario(evento) {
    evento.preventDefault();
    validacionInputBuscador();
    llamadoAPI(`productos/ciudad/${endPoint}`);
  }

  return (
    <div className={`${styles.contenedor}`}>
      <h1 className={styles.h1}>Encuentra tu próxima estancia</h1>
      <p className={styles.p}>Busca ofertas en hoteles, casas y mucho más...</p>
      <form className={`${styles.form}`}>
        <div className={styles.contendorInput}>
          <InputAutcomplete
            manejadorDeEstadoBuscador={manejadorDeEstadoBuscador}
          />
        </div>
        <Calendar manejadorDeEstadoCalendario={manejadorDeEstadoCalendario} />
        <button
          className={`${styles.buttonForm}`}
          onClick={(evento) => envioFormulario(evento)}
        >
          Buscar
        </button>
      </form>
    </div>
  );
};
