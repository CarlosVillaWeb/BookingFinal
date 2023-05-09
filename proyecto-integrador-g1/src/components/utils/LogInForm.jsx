import React, { useState } from "react";
import axios from "axios";

import {
  Formulario,
  Columna,
  ColumnaCentral,
  Label,
  ContenedorTerminos,
  ContenedorBotonCentrado,
  Boton,
  MensajeExito,
  MensajeError,
} from "./_elementos/Formularios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Input from "./../_input/Input";

import "./logInForm.css";
import { URL_BASE } from "./services/peticionesFetch";

const LogInForm = () => {
  const [email, cambiarEmail] = useState({ campo: "", valido: null });
  const [contrasena, cambiarContrasena] = useState({ campo: "", valido: null });
  const [formularioValido, cambiarFormularioValido] = useState(null);

  const expresiones = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    contrasena: /^.{4,12}$/, // 4 a 12 digitos.
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (email.valido === "true" && contrasena.valido === "true") {
      cambiarFormularioValido(true);

      cambiarEmail({ campo: "", valido: null });
      cambiarContrasena({ campo: "", valido: null });

      try {
        const response = await axios.post(
          `${URL_BASE}/user/logIn`,
          {
            username: email.campo,
            password: contrasena.campo,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        console.log(response.data);
        localStorage.setItem("jwt", response.data.jwt);

        if (response.data.jwt != null) {
          window.location.href = "/";
        }
      } catch (error) {
        cambiarFormularioValido(false);
        console.error(error);
      }
    } else {
      cambiarFormularioValido(false);
    }
  };

  return (
    <>
      <h2>Iniciar Sesion</h2>
      <Formulario action="" onSubmit={onSubmit}>
        <ColumnaCentral>
          <Input
            estado={email}
            cambiarEstado={cambiarEmail}
            tipo="email"
            label="Correo Electrónico"
            placeholder="john@email.com"
            name="email"
            leyendaError="El email solo puede contener letras, numeros, puntos, guiones y guion bajo."
            expresionRegular={expresiones.email}
          />
        </ColumnaCentral>

        <ColumnaCentral>
          <Input
            estado={contrasena}
            cambiarEstado={cambiarContrasena}
            tipo="password"
            label="Contraseña"
            name="password1"
            leyendaError="La contraseña tiene que ser de 4 a 12 dígitos."
            expresionRegular={expresiones.contrasena}
          />
        </ColumnaCentral>

        <ColumnaCentral>
          {formularioValido === false && (
            <MensajeError>
              <p>
                <FontAwesomeIcon icon={faExclamationTriangle} />
                <b>Error:</b> Usuario ó Contraseña incorrecto.
              </p>
            </MensajeError>
          )}
        </ColumnaCentral>

        <ColumnaCentral>
          <ContenedorBotonCentrado>
            <Boton type="submit">Enviar</Boton>
            {formularioValido === true && (
              <MensajeExito>Formulario enviado exitosamente!</MensajeExito>
            )}
          </ContenedorBotonCentrado>
        </ColumnaCentral>
      </Formulario>
    </>
  );
};

export default LogInForm;
