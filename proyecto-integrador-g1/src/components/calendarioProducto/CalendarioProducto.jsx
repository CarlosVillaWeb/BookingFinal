import React, { useState } from "react";
import {
  Calendar,
  DateObject,
  getAllDatesInRange,
} from "react-multi-date-picker";
import useMediaQuery from "../utils/useMediaQuery";
import { actionTypes } from "../utils/reducers/reservaReducer";
import styles from "../module/CalendarioProducto.module.css";

export const CalendarioProducto = ({ reservas, dispatchFormularioReserva }) => {
  const matches = useMediaQuery("(max-width:425px)");

  const [value, setValue] = useState([null, null]);

  function formatoFechasReservadas(rangoFechas) {
    const diasEnRangoReserva = getAllDatesInRange(
      rangoFechas.map((fecha) => {
        return new DateObject({
          date: fecha,
          format: "YYYY-MM-DD",
        });
      })
    );
    return diasEnRangoReserva.map((fecha) => {
      return fecha.format("YYYY-MM-DD");
    });
  }

  function calculoDiasReservados(array) {
    let resultado = [];
    array.forEach((elemento) => {
      resultado = resultado.concat(formatoFechasReservadas(elemento));
    });
    return resultado;
  }

  const manejadorCalendario = (fechasSeleccionadas) => {
    const fechasFormateadas = fechasSeleccionadas.map((fecha) =>
      fecha.format()
    );
    setValue(fechasFormateadas);
  };

  return (
    <div className={styles.divcalendar}>
      <Calendar
        value={value}
        onChange={(value) => {
          manejadorCalendario(value);
          if (dispatchFormularioReserva) {
            if (value[0]) {
              dispatchFormularioReserva({
                type: actionTypes.fechaInicialDeLaReserva,
                payload: value[0].format("YYYY-MM-DD"),
              });
            }
            if (value[1]) {
              dispatchFormularioReserva({
                type: actionTypes.fechaFinalDeLaReserva,
                payload: value[1].format("YYYY-MM-DD"),
              });
            }
          }
        }}
        className={styles.calendario}
        numberOfMonths={matches ? 1 : 2}
        range={true}
        format="YYYY-MM-DD"
        weekDays={["Dom", "Lun", "Mar", "Mier", "Juev", "Vier", "Sab"]}
        months={[
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ]}
        minDate={new Date()}
        rangeHover
        mapDays={({ date }) => {
          let isDisabledDate = calculoDiasReservados(reservas).includes(
            date.format("YYYY-MM-DD")
          );
          if (isDisabledDate) {
            return {
              title: "fecha no disponible",
              disabled: true,
              style: { color: "#FBC02D" },
            };
          }
        }}
      />
    </div>
  );
};
