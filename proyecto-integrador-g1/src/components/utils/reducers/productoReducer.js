export const formularioProductoInicial = {
  titulo: "",
  calificacion: "",
  categoria_id: "",
  direccion: "",
  ubicacion_id: "",
  descripcion: "",
  precio: "",
  caracteristicas: [{ id: "" }],
  politicas: [],
  imagenes: [{ url: "" }],
};

export const productoActionTypes = {
  titulo: "titulo",
  categoria_id: "categoria_id",
  direccion: "direccion",
  ubicacion_id: "ubicacion_id",
  descripcion: "descripcion",
  precio: "precio",
  calificacion: "calificacion",
  caracteristicas: "caracteristicas",
  politicas: "politicas",
  imagenes: "imagenes",
  reset: "reset",
};

export function formularioProductoReducer(state, action) {
  switch (action.type) {
    case productoActionTypes.titulo: {
      return { ...state, titulo: action.payload };
    }
    case productoActionTypes.categoria_id: {
      return { ...state, categoria_id: action.payload };
    }
    case productoActionTypes.direccion: {
      return { ...state, direccion: action.payload };
    }
    case productoActionTypes.ubicacion_id: {
      return { ...state, ubicacion_id: action.payload };
    }
    case productoActionTypes.descripcion: {
      return { ...state, descripcion: action.payload };
    }
    case productoActionTypes.precio: {
      return { ...state, precio: action.payload };
    }
    case productoActionTypes.calificacion: {
      return { ...state, calificacion: action.payload };
    }
    case productoActionTypes.caracteristicas: {
      return { ...state, caracteristicas: action.payload };
    }
    case productoActionTypes.politicas: {
      return { ...state, politicas: action.payload };
    }
    case productoActionTypes.imagenes: {
      return { ...state, imagenes: action.payload };
    }
    case productoActionTypes.reset: {
      return formularioInicial;
    }
    default:
      return formularioProductoInicial;
  }
}
