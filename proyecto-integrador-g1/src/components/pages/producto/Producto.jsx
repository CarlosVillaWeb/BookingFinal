import React, { useEffect, useState } from "react";
import { Titulo } from "../../titulo/Titulo";
import { GrillaImagenes } from "../../grillaImagenes/GrillaImagenes";
import { Outlet, useParams } from "react-router-dom";
import { DescripcionProducto } from "../../descripcionProducto/DescripcionProducto";
import { CaracteristicasProducto } from "../../caracteristicasProducto/CaracteristicasProducto";
import { PoliticasProducto } from "../../politicasProducto/PoliticasProducto";
import { getAPI } from "../../utils/services/peticionesFetch";
import { Spin } from "antd";
import { UbicacionProducto } from "../../ubicacionProducto/UbicacionProducto";
import { ImagenProvider } from "../../utils/context/imagenContext";
import { CalendarioProducto } from "../../calendarioProducto/CalendarioProducto";
import { BotonReserva } from "../../botonReserva/BotonReserva";
import styles from "../../module/Producto.module.css";

const productoPrueba = {
  titulo: "Hermitage Hotel",
  categoria: "HOTEL",
  ciudad: {
    nombre: "Buenos Aires",
    pais: "Argentina",
  },
  calificacion: 8,
  imagenes: [
    {
      id: 1,
      titulo: "Imagen1",
      url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      id: 2,
      titulo: "Imagen2",
      url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      id: 3,
      titulo: "Imagen3",
      url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      id: 4,
      titulo: "Imagen4",
      url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      id: 5,
      titulo: "Imagen5",
      url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      id: 6,
      titulo: "Imagen6",
      url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
    {
      id: 7,
      titulo: "Imagen7",
      url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      id: 8,
      titulo: "Imagen8",
      url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      id: 9,
      titulo: "Imagen9",
      url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      id: 10,
      titulo: "Imagen10",
      url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      id: 11,
      titulo: "Image 11",
      url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      id: 12,
      titulo: "Imagen12",
      url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
    {
      id: 13,
      titulo: "Imagen13",
      url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      id: 14,
      titulo: "Imagen14",
      url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      id: 15,
      titulo: "Imagen15",
      url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
  ],
  descripcion:
    "Está situado a solo unas calles de la avenida Alvear, de la avenida Quintana, del parque San Martín y del distrito de Recoleta. En las inmediaciones también hay varios lugares de interés, como la calle Florida, el centro comercial Galerías Pacífico, la zona de Puerto Madero, la plaza de Mayo y el palacio Municipal. Nuestros clientes dicen que esta parte de Buenos Aires es su favorita, según los comentarios independientes. El Hotel es un hotel sofisticado de 4 estrellas que goza de una ubicación tranquila, a poca distancia de prestigiosas galerías de arte, teatros, museos y zonas comerciales. Además, hay WiFi gratuita. El establecimiento sirve un desayuno variado de 07:00 a 10:30.",
  caracteristicas: [
    {
      id: 1,
      descripcion: "Cocina",
    },
    {
      id: 2,
      descripcion: "Estacionamiento gratuito",
    },
    {
      id: 3,
      descripcion: "Aire acondicionado",
    },
    {
      id: 4,
      descripcion: "Wifi",
    },
    {
      id: 5,
      descripcion: "Televisor",
    },
    {
      id: 6,
      descripcion: "Apto Mascotas",
    },
    {
      id: 7,
      descripcion: "Pileta",
    },
  ],
  politicas: [
    {
      id: 1,
      tipoPolitica: "Normas de la casa",
      descripcion: "Check-out:10:00",
    },
    {
      id: 2,
      tipoPolitica: "Salud y seguridad",
      descripcion:
        "Se aplicarn las pautas de distanciamiento y otras normas relacionadas con el coronavirus",
    },
    {
      id: 3,
      tipoPolitica: "Normas de la casa",
      descripcion: "No se permiten fiestas",
    },
    {
      id: 4,
      tipoPolitica: "Política de cancelación",
      descripcion:
        "Agrega las fechas de tu viaje para obtener los detalles de cancelación de esta estadía",
    },
    {
      id: 5,
      tipoPolitica: "Normas de la casa",
      descripcion: "No fumar",
    },
  ],
};

const reservas = [
  { checkIn: "2023-02-24", checkOut: "2023-02-28" },
  { checkIn: "2023-03-03", checkOut: "2023-03-06" },
  { checkIn: "2023-03-15", checkOut: "2023-03-18" },
];

const reservasFormateadas = reservas.map((reserva) => {
  return Object.values(reserva);
});

export const Producto = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);

  //AQUI SE AGREGA TODA LA LOGICA PARA EL CONSUMO DE DATOS DE UN PRODUCTO
  const [producto, setProducto] = useState();

  useEffect(() => {
    setLoading(true);
    async function getProducto() {
      const response = await getAPI(`productos/${params.id}`);
      if (response !== undefined) {
        setProducto(response);
      }
      setLoading(false);
    }
    if (params.id) {
      getProducto();
    }
  }, [params]);

  return loading ? (
    <div className={styles.spiner}>
      <Spin size="Large" />
    </div>
  ) : (
    <>
      {producto && (
        <div className={styles.contenedor}>
          <Titulo
            titulo={producto.titulo}
            categoria={producto.categoria.titulo}
          />
          <UbicacionProducto producto={producto} />
          <ImagenProvider>
            <GrillaImagenes imagenes={producto.imagenes} />
          </ImagenProvider>
          <DescripcionProducto descripcion={producto?.descripcion} />
          <CaracteristicasProducto
            caracteristicas={producto?.caracteristicas}
          />
          <PoliticasProducto politicas={producto?.politicas} />
          <section className={styles.seccionCalendario}>
            <h2 className={styles.titulo}>Fechas disponibles</h2>
            <div className={styles.contenedorCalendario}>
              <CalendarioProducto reservas={reservasFormateadas} />
              <BotonReserva />
            </div>
          </section>
        </div>
      )}
      <Outlet />
    </>
  );
};
