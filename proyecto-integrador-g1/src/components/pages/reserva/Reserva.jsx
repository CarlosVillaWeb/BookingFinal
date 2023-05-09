import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAPI } from "../../utils/services/peticionesFetch";
import { Titulo } from "../../titulo/Titulo";
import { FormularioReserva } from "../../formularioReserva/FormularioReserva";
import { UsuarioContext } from "../../utils/context/usuarioContext";
import { DetalleReserva } from "../../detalleReserva/DetalleReserva";
import { CalendarioProducto } from "../../calendarioProducto/CalendarioProducto";
import { PoliticasProducto } from "../../politicasProducto/PoliticasProducto";
import { HorarioReserva } from "../../horarioReserva/HorarioReserva";
import { useFormularioReserva } from "../../utils/hooks/useFormularioReserva";
import { actionTypes } from "../../utils/reducers/reservaReducer";
import { Spin } from "antd";
import styles from "../../module/Reserva.module.css";

//PENDIENTE POR SACAR LAS RESERVAS DE LOS PRODUCTOS
const reservas = [
  { checkIn: "2023-02-24", checkOut: "2023-02-28" },
  { checkIn: "2023-03-03", checkOut: "2023-03-06" },
  { checkIn: "2023-03-15", checkOut: "2023-03-18" },
];

const reservasFormateadas = reservas.map((reserva) => {
  return Object.values(reserva);
});

const formularioInicial = {
  producto_id: "",
  usuariosEmail: "",
  usuariosCiudad: "",
  fechaInicialDeLaReserva: "",
  fechaFinalDeLaReserva: "",
  horaComienzoDeReserva: "",
};

export const Reserva = () => {
  const params = useParams();
  const { usuario, token } = useContext(UsuarioContext);

  const [producto, setProducto] = useState();
  const [loading, setLoading] = useState(false);

  const {
    formularioReserva,
    dispatchFormularioReserva,
    errores,
    manejadorCambios,
    manejadorEnvioFormulario,
    loadingEnvio,
  } = useFormularioReserva(formularioInicial, token);

  useEffect(() => {
    setLoading(true);
    async function getProducto() {
      const response = await getAPI(`productos/${params.id}`);
      if (response !== undefined) {
        setProducto(response);
        setLoading(false);
        dispatchFormularioReserva({
          type: actionTypes.producto_id,
          payload: response.id,
        });
        dispatchFormularioReserva({
          type: actionTypes.usuariosEmail,
          payload: usuario.email,
        });
        dispatchFormularioReserva({
          type: actionTypes.usuariosCiudad,
          payload: usuario.ciudad,
        });
      }
    }
    if (params.id) {
      getProducto();
    }
  }, []);

  return loading ? (
    <div className={styles.spin}>
      <Spin size="Large" />
    </div>
  ) : (
    producto && (
      <div className={styles.contenedor}>
        <Titulo
          titulo={producto.titulo}
          categoria={producto.categoria.titulo}
        />
        <div className={styles.contenedorGrilla}>
          <FormularioReserva
            dispatchFormularioReserva={dispatchFormularioReserva}
            ciudadUsuario={formularioReserva?.usuariosCiudad}
          />
          <DetalleReserva
            producto={producto}
            fechas={formularioReserva}
            manejadorCambios={manejadorCambios}
            manejadorEnvioFormulario={manejadorEnvioFormulario}
            errores={errores}
            loadingEnvio={loadingEnvio}
            endPoint={params.id}
          />
          <section className={styles.seccionCalendario}>
            <h2 className={styles.tituloSeccionCalendario}>
              Selecciona tu fecha de reserva
            </h2>
            <CalendarioProducto
              reservas={reservasFormateadas}
              dispatchFormularioReserva={dispatchFormularioReserva}
            />
          </section>
          <HorarioReserva
            dispatchFormularioReserva={dispatchFormularioReserva}
          />
        </div>
        <PoliticasProducto politicas={producto.politicas} />
      </div>
    )
  );
};
