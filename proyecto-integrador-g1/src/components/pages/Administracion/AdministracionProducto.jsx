import React, { useContext, useEffect } from "react";
import { UsuarioContext } from "../../utils/context/usuarioContext";
import { useNavigate } from "react-router-dom";
import { FormularioProducto } from "../../formularioProducto/FormularioProducto";
import { Titulo } from "../../titulo/Titulo";
import styles from "../../module/AdministracionProducto.module.css";

export const AdministracionProducto = () => {
  // const { usuario, token } = useContext(UsuarioContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (token !== undefined && usuario.rol !== "ADMIN") {
  //     navigate(-1);
  //   }
  // }, []);

  return (
    <div className={styles.contenedor}>
      <Titulo titulo="Administracion de productos" />
      <FormularioProducto />
    </div>
  );
};
