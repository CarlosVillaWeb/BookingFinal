import React from "react";
import { Image } from "antd";
import { ImagenContext } from "../utils/context/imagenContext";
import styles from "../module/Imagenes.module.css";

export const Imagenes = ({ imagenes, galeria }) => {
  const { visible, setVisible } = React.useContext(ImagenContext);

  return (
    <>
      {imagenes.map((imagen) => {
        return (
          <Image
            preview={{ visible: false }}
            onClick={() => setVisible(true)}
            src={imagen.url}
            key={imagen.id}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              border: "1px solid rgba(56, 56, 56, 0.5)",
              borderRadius: "10px",
            }}
          />
        );
      })}

      {visible ? (
        <div className={styles.galeriaImagenes}>
          <Image.PreviewGroup
            preview={{
              visible,
              onVisibleChange: (vis) => setVisible(vis),
            }}
          >
            {galeria.map((imagen) => {
              return (
                <Image src={imagen.url} key={`${imagen.id},${imagen.title}`} />
              );
            })}
          </Image.PreviewGroup>
        </div>
      ) : undefined}
    </>
  );
};
