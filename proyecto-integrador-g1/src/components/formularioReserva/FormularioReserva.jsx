import React, { useContext, useState } from "react";
import { UsuarioContext } from "../utils/context/usuarioContext";
import styles from "../module/FormularioReserva.module.css";
import { actionTypes } from "../utils/reducers/reservaReducer";

export const FormularioReserva = ({
  dispatchFormularioReserva,
  ciudadUsuario,
}) => {
  const { usuario } = useContext(UsuarioContext);

  return (
    <>
      <h2 className={styles.tituloReserva}>Completa tus datos</h2>
      <form className={styles.formulario}>
        <div id="info-form">
          <label htmlFor="Nombre">Nombre</label>
          <input placeholder="Nombre" value={usuario.nombre} disabled />
        </div>
        <div id="info-form">
          <label htmlFor="Apellido">Apellido</label>
          <input placeholder="Apellido" value={usuario.apellido} disabled />
        </div>
        <div id="info-form">
          <label htmlFor="Correo electronico">Correo electrónico</label>
          <input
            placeholder="Correo electrónico"
            value={usuario.email}
            disabled
          />
        </div>
        <div id="info-form">
          <label htmlFor="ciudad">Ciudad</label>
          <input
            type="text"
            placeholder="Ciudad"
            value={ciudadUsuario}
            required
            onChange={(evento) => {
              dispatchFormularioReserva({
                type: actionTypes.usuariosCiudad,
                payload: evento.target.value.trim(),
              });
            }}
          />
        </div>
      </form>
    </>
  );
};
