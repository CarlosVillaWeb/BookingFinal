import React, { useState, useEffect, useContext } from "react";
import { UsuarioContext } from "../../utils/context/usuarioContext";
import { Alert } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import Form from "../../utils/LogInForm";

const logIn = () => {
  const { errorAutenticacion, editarErrorAutenticacion } =
    useContext(UsuarioContext);
  const [mensajeError, setMensajeError] = useState(false);

  useEffect(() => {
    setMensajeError(errorAutenticacion);
    if (mensajeError) editarErrorAutenticacion(false);
  }, [mensajeError]);

  // console.log("en login: ", errorAutenticacion);
  return (
    <div>
      {mensajeError ? (
        <Alert
          message="Para realizar una reserva necesitas estar logueado"
          type="error"
          showIcon
          icon={<FontAwesomeIcon icon={faCircleExclamation} />}
          closable
          style={{
            width: "25%",
            position: "absolute",
            top: "250px",
            left: "38%",
          }}
        />
      ) : undefined}
      <Form />
    </div>
  );
};

export default logIn;
