import React, { useState, createContext, useMemo, useEffect } from "react";

export const UsuarioContext = createContext();

const cargarDatosUsuario = (token) => {
  const usuario = {};
  usuario.nombre = JSON.parse(atob(token.split(".")[1])).nombre;
  usuario.apellido = JSON.parse(atob(token.split(".")[1])).apellido;
  usuario.email = JSON.parse(atob(token.split(".")[1])).email;
  usuario.ciudad = JSON.parse(atob(token.split(".")[1])).ciudad;
  usuario.rol = JSON.parse(atob(token.split(".")[1])).roles.nombre;
  return usuario;
};

export const UsuarioProvider = (props) => {
  const [usuario, setUsuario] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [errorAutenticacion, setErrorAutenticacion] = useState(false);

  function agregarTokenLocalStorage(valor) {
    localStorage.setItem("jwt", valor);
    setToken(valor);
  }

  function removerTokenLocalStorage() {
    localStorage.removeItem("jwt");
    setToken(undefined);
  }

  function editarErrorAutenticacion(valor) {
    setErrorAutenticacion(valor);
  }

  useEffect(() => {
    if (token) {
      const datos = cargarDatosUsuario(token);
      setUsuario(datos);
    } else {
      setUsuario(undefined);
    }
  }, [token]);

  const providerValue = {
    loading,
    token,
    usuario,
    agregarTokenLocalStorage,
    removerTokenLocalStorage,
    errorAutenticacion,
    editarErrorAutenticacion,
  };

  return (
    <UsuarioContext.Provider value={providerValue}>
      {props.children}
    </UsuarioContext.Provider>
  );
};
