import React, { useState } from "react";
import { Imagenes } from "./Imagenes";
import useMediaQuery from "../utils/useMediaQuery";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ImagenContext } from "../utils/context/imagenContext";
import styles from "../module/GrillaImagenes.module.css";

export const GrillaImagenes = ({ imagenes }) => {
  const [fotoActual, setFotoActual] = useState(1);
  const { abrirGaleria } = React.useContext(ImagenContext);

  const matches = useMediaQuery("(max-width:768px)");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => (
      <span style={{ color: "#263238", fontWeight: "700" }}>
        {fotoActual}/{imagenes.length}
      </span>
    ),
    beforeChange: (actual, siguiente) => setFotoActual(siguiente + 1),
  };

  return (
      <div className={styles.contenedor}>
        {matches ? (
          <Slider {...settings}>
            {imagenes.map((imagen, indice) => {
              return (
                <Imagenes
                  imagenes={imagenes.slice(indice, indice + 1)}
                  galeria={imagenes}
                  key={imagen.id}
                />
              );
            })}
          </Slider>
        ) : (
          <div className={styles.contenedorGrilla}>
            <Imagenes imagenes={imagenes.slice(0, 5)} galeria={imagenes} />
          </div>
        )}
        <span className={styles.modal} onClick={() => abrirGaleria(true)}>
          Ver más
        </span>
      </div>
  );
};

// function agruparArray(array) {
//   let arrayAgrupado = [];
//   let arrayAux = [];
//   for (let i = 0; i < array.length; i++) {
//     if (arrayAgrupado.length === 0 && arrayAux.length === 0) {
//       arrayAux.push(array[i]);
//     } else {
//       if (i % 5 !== 0) {
//         arrayAux.push(array[i]);
//       } else {
//         arrayAgrupado.push(arrayAux);
//         arrayAux = [];
//         arrayAux.push(array[i]);
//       }
//     }
//   }
// }
