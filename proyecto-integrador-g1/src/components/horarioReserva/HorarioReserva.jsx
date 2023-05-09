import React, { useState } from "react";
import Select from "react-select";
import styles from "../module/HorarioReserva.module.css";
import { actionTypes } from "../utils/reducers/reservaReducer";

const horasLlegada = [
  {
    label: "00:00 AM",
    value: "00:00:00",
  },
  {
    label: "01:00 AM",
    value: "01:00:00",
  },
  {
    label: "02:00 AM",
    value: "02:00:00",
  },
  {
    label: "03:00 AM",
    value: "03:00:00",
  },
  {
    label: "04:00 AM",
    value: "04:00:00",
  },
  {
    label: "05:00 AM",
    value: "05:00:00",
  },
  {
    label: "06:00 AM",
    value: "06:00:00",
  },
  {
    label: "07:00 AM",
    value: "07:00:00",
  },
  {
    label: "08:00 AM",
    value: "08:00:00",
  },
  {
    label: "09:00 AM",
    value: "09:00:00",
  },
  {
    label: "10:00 AM",
    value: "10:00:00",
  },
  {
    label: "11:00 AM",
    value: "11:00:00",
  },
  {
    label: "12:00 PM",
    value: "12:00:00",
  },
  {
    label: "01:00 PM",
    value: "13:00:00",
  },
  {
    label: "02:00 PM",
    value: "14:00:00",
  },
  {
    label: "03:00 PM",
    value: "15:00:00",
  },
  {
    label: "04:00 PM",
    value: "16:00:00",
  },
  {
    label: "05:00 PM",
    value: "17:00:00",
  },
  {
    label: "06:00 PM",
    value: "18:00:00",
  },
  {
    label: "07:00 PM",
    value: "19:00:00",
  },
  {
    label: "08:00 PM",
    value: "20:00:00",
  },
  {
    label: "09:00 PM",
    value: "21:00:00",
  },
  {
    label: "10:00 PM",
    value: "22:00:00",
  },
  {
    label: "11:00 PM",
    value: "23:00:00",
  },
];

export const HorarioReserva = ({ dispatchFormularioReserva }) => {
  return (
    <div className={styles.contenedor}>
      <h2>Tu horario de llegada</h2>
      <div className={styles.card}>
        <p>
          Tu habitación va a estar lista para el check-in entre las 10:00 AM y
          las 11:00 PM
        </p>
        <h4>Indica tu horario estimado de llegada</h4>
        <Select
          options={horasLlegada}
          onChange={(evento) =>
            dispatchFormularioReserva({
              type: actionTypes.horaComienzoDeReserva,
              payload: evento.value,
            })
          }
          defaultValue={{ label: "Selecciona una hora", value: null }}
        />
      </div>
    </div>
  );
};
