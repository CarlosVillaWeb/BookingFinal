import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { AdvertenciasFormularioReserva } from "../advertenciasFormularioReserva/AdvertenciasFormularioReserva";
import { Spin } from "antd";
import styles from "../module/DetalleReserva.module.css";

export const DetalleReserva = ({
  producto,
  fechas,
  manejadorEnvioFormulario,
  errores,
  loadingEnvio,
  endPoint,
}) => {
  const [mensajesError, setMensajesError] = useState(false);

  function handleSubmit(evento) {
    if (Object.entries(errores).length !== 0) {
      setMensajesError(true);
    } else {
      setMensajesError(false);
    }
    manejadorEnvioFormulario(evento, endPoint);
  }

  return (
    <div className={styles.contenedor}>
      <h2>Detalle de la reserva</h2>
      <div className={styles.contenedorImagen}>
        <img src={producto.imagenes[0].url} />
      </div>
      <div className={styles.detalleReserva}>
        <h4>{producto.categoria.titulo}</h4>
        <h3>{producto.titulo}</h3>
        <p>
          <FontAwesomeIcon icon={faLocationDot} /> &nbsp;
          <span className={styles.ubicacion}>
            {producto.ubicacion.ciudad}, {producto.ubicacion.pais}
          </span>
        </p>
        <hr />
      </div>
      <div className={styles.check}>
        <span className={styles.checkSpan}>Check in:</span>
        <span>
          {fechas.fechaInicialDeLaReserva
            ? fechas.fechaInicialDeLaReserva
            : "Selecciona una fecha"}
        </span>
        <hr />
      </div>
      <div className={styles.check}>
        <span className={styles.checkSpan}>Check out</span>
        <span>
          {fechas.fechaFinalDeLaReserva
            ? fechas.fechaFinalDeLaReserva
            : "Selecciona una fecha"}
        </span>
        <hr />
      </div>
      <button onClick={handleSubmit} disabled={loadingEnvio}>
        {loadingEnvio ? <Spin /> : "Confirmar reserva"}
      </button>
      {mensajesError ? (
        <AdvertenciasFormularioReserva errores={errores} />
      ) : undefined}
    </div>
  );
};
