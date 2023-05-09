import React from "react";
import Media from "react-media";
import Cards from "./Cards";
import CardCategoria from "./CardCategoria";
import { Carousel, Spin } from "antd";
import { useCategoria } from "../utils/hooks/useCategoria";
import styles from "../module/Categorias.module.css";

const Categorias = () => {
  const { categorias, loadingCategorias } = useCategoria();

  return (
    <div className={styles.bodytemplate}>
      <h2 className={styles.homeTitle}>Categorías</h2>
      {loadingCategorias ? (
        <div className={styles.spiner}>
          <Spin size="medium" />
        </div>
      ) : (
        <Media query="(max-width:425px)">
          {(matches) => {
            return matches ? (
              <Carousel
                dotPosition="bottom"
                autoplay
                effect="fade"
                className={styles.carousel}
              >
                {categorias?.map((categoria) => {
                  return (
                    <CardCategoria
                      key={categoria.id}
                      titulo={categoria.titulo}
                      disponibilidad={categoria.descripcion}
                      imagen={categoria.urlImagen}
                    />
                  );
                })}
              </Carousel>
            ) : (
              <Cards categorias={categorias} />
            );
          }}
        </Media>
      )}
    </div>
  );
};

export default Categorias;
