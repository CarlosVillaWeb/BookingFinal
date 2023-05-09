import { useState, useReducer, useEffect } from "react";
import { formularioReducer } from "../reducers/reservaReducer";
import { postAPI } from "../services/peticionesFetch";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const validacionFormulario = (form) => {
  let errores = {};
  const regexCiudad = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

  if (form.producto_id.length === 0) {
    errores.producto = "No se tiene agregado ningún producto";
  }
  if (form.usuariosEmail.length === 0) {
    errores.producto = "No se tiene agregado ningún email";
  }
  if (!form.usuariosCiudad.trim()) {
    errores.usuario = "No se tiene agregado ninguna ciudad";
  } else if (!regexCiudad.test(form.usuariosCiudad.trim())) {
    errores.name = "La ciudad solo acepta letras";
  }
  if (!form.fechaInicialDeLaReserva?.trim()) {
    errores.checkIn = "No se ha ingresado ninguna fecha de checkIn";
  }
  if (!form.fechaFinalDeLaReserva?.trim()) {
    errores.checkOut = "No se ha ingresado ninguna fecha de checkOut";
  }
  if (!form.horaComienzoDeReserva?.trim()) {
    errores.horaLlegada = "No se ha ingresado ninguna hora de llegada";
  }
  return errores;
};

export const useFormularioReserva = (formularioInicial, token) => {
  const [formularioReserva, dispatchFormularioReserva] = useReducer(
    formularioReducer,
    formularioInicial
  );
  const [errores, setErrores] = useState({});
  const [loadingEnvio, setLoadingEnvio] = useState(false);
  const [respuesta, setRespuesta] = useState();
  const navigate = useNavigate();

  const postFormularioReserva = async (endPoint, formulario, token) => {
    const response = await postAPI(
      `producto/${endPoint}/reserva`,
      formulario,
      token
    );
    if (response.status == 200) {
      console.log(response);
      setRespuesta(response);
    }
  };

  useEffect(() => {
    if (
      formularioReserva.producto_id != undefined &&
      formularioReserva.usuariosEmail != undefined
    ) {
      setErrores(validacionFormulario(formularioReserva));
    }

    if (!!respuesta) {
      if (respuesta.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Reserva exitosa",
          text: "Se ha realizado su reserva exitosamente.",
          customClass: { actions: navigate("/") },
        });
      } else {
        Swal.fire({
          title: "Por favor, intente más tarde",
          icon: "error",
          text: "Lamentablemente la reserva no ha podido realizarse.",
        });
      }
    }
  }, [formularioReserva, respuesta]);

  const manejadorCambios = () => {
    setErrores(validacionFormulario(formularioReserva));
  };

  const manejadorEnvioFormulario = (evento, endPoint) => {
    evento.preventDefault();
    manejadorCambios();

    if (Object.keys(errores).length === 0) {
      setLoadingEnvio(true);
      postFormularioReserva(endPoint, formularioReserva, token);
      setInterval(() => {
        setLoadingEnvio(false);
        setRespuesta(null);
        setErrores({});
      }, 2000);
    }
  };

  return {
    formularioReserva,
    dispatchFormularioReserva,
    errores,
    manejadorCambios,
    manejadorEnvioFormulario,
    loadingEnvio,
  };
};
