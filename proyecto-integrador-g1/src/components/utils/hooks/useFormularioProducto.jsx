import { useState, useReducer, useEffect } from "react";
import { postAPIProductos } from "../services/peticionesFetch";
import { useNavigate } from "react-router-dom";
import {
  formularioProductoInicial,
  formularioProductoReducer,
  productoActionTypes,
} from "../reducers/productoReducer";
import Swal from "sweetalert2";

// const validacionFormulario = (form) => {
//   let errores = {};
//   const regexCiudad = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

//   if (form.producto_id.length === 0) {
//     errores.producto = "No se tiene agregado ningún producto";
//   }
//   if (form.usuariosEmail.length === 0) {
//     errores.producto = "No se tiene agregado ningún email";
//   }
//   if (!form.usuariosCiudad.trim()) {
//     errores.usuario = "No se tiene agregado ninguna ciudad";
//   } else if (!regexCiudad.test(form.usuariosCiudad.trim())) {
//     errores.name = "La ciudad solo acepta letras";
//   }
//   if (!form.fechaInicialDeLaReserva?.trim()) {
//     errores.checkIn = "No se ha ingresado ninguna fecha de checkIn";
//   }
//   if (!form.fechaFinalDeLaReserva?.trim()) {
//     errores.checkOut = "No se ha ingresado ninguna fecha de checkOut";
//   }
//   if (!form.horaComienzoDeReserva?.trim()) {
//     errores.horaLlegada = "No se ha ingresado ninguna hora de llegada";
//   }
//   return errores;
// };

export const useFormularioProducto = () => {
  const [formularioProducto, dispatchFormularioProducto] = useReducer(
    formularioProductoReducer,
    formularioProductoInicial
  );

  const [errores, setErrores] = useState({});
  const [loadingEnvio, setLoadingEnvio] = useState(false);
  const [respuesta, setRespuesta] = useState(null);

  const navigate = useNavigate();

  const postFormularioProducto = async (formulario) => {
    const response = await postAPIProductos(`productos`, formulario);
    if (response.status == 200) {
      console.log(response);
      setRespuesta(response);
    }
  };

  useEffect(() => {
    // if (
    //   formularioReserva.producto_id != undefined &&
    //   formularioReserva.usuariosEmail != undefined
    // ) {
    //   setErrores(validacionFormulario(formularioReserva));
    // }

    if (!!respuesta) {
      if (respuesta.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Reserva exitosa",
          text: "Se ha creado el producto con éxito.",
          customClass: { actions: navigate("/") },
        });
      } else {
        Swal.fire({
          title: "Por favor, intente más tarde",
          icon: "error",
          text: "Lamentablemente el producto no ha podido crearse.",
        });
      }
    }
  }, [formularioProducto, respuesta]);

  const handleChanges = (evento) => {
    dispatchFormularioProducto({
      type: evento.target.name,
      payload: evento.target.value,
    });
  };

  const handleSelect = (evento, type) => {
    dispatchFormularioProducto({
      type: type,
      payload: evento.value,
    });
  };

  const handleSelectArray = (tipo, valor) => {
    dispatchFormularioProducto({
      type: tipo,
      payload: valor,
    });
  };

  const handleChangesImagenes = (imagenes) => {
    dispatchFormularioProducto({
      type: productoActionTypes.imagenes,
      payload: imagenes,
    });
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();
    // manejadorCambios();
    if (Object.keys(errores).length === 0) {
      setLoadingEnvio(true);
      postFormularioProducto(formularioProducto);
      setInterval(() => {
        setLoadingEnvio(false);
        setRespuesta(null);
        setErrores({});
      }, 4000);
    }
  };

  return {
    formularioProducto,
    dispatchFormularioProducto,
    errores,
    handleChanges,
    handleSelect,
    handleSubmit,
    handleSelectArray,
    handleChangesImagenes,
    loadingEnvio,
  };
};
