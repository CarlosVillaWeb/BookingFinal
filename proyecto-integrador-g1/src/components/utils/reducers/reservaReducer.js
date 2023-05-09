export const actionTypes = {
  producto_id: "producto_id",
  usuariosEmail: "usuariosEmail",
  usuariosCiudad: "usuariosCiudad",
  fechaInicialDeLaReserva: "fechaInicialDeLaReserva",
  fechaFinalDeLaReserva: "fechaFinalDeLaReserva",
  horaComienzoDeReserva: "horaComienzoDeReserva",
};

export function formularioReducer(state, action) {
  switch (action.type) {
    case actionTypes.producto_id: {
      return { ...state, producto_id: action.payload };
    }
    case actionTypes.usuariosEmail: {
      return { ...state, usuariosEmail: action.payload };
    }
    case actionTypes.usuariosCiudad: {
      return { ...state, usuariosCiudad: action.payload };
    }
    case actionTypes.fechaInicialDeLaReserva: {
      return { ...state, fechaInicialDeLaReserva: action.payload };
    }
    case actionTypes.fechaFinalDeLaReserva: {
      return { ...state, fechaFinalDeLaReserva: action.payload };
    }
    case actionTypes.horaComienzoDeReserva: {
      return { ...state, horaComienzoDeReserva: action.payload };
    }
    default:
      return state;
  }
}
