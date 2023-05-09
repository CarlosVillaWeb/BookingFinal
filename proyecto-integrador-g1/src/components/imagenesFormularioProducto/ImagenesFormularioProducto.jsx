import React, { useEffect, useState } from "react";

const imagenInicial = {
  url: "",
};

export const ImagenesFormularioProducto = ({ handleChangesImagenes }) => {
  const [imagenesList, setImagenesList] = useState([imagenInicial]);

    useEffect(() => {
      handleChangesImagenes(imagenesList);
    }, [imagenesList]);

  const addImagenToImagenList = () => {
    setImagenesList((prev) => [...prev, imagenInicial]);
  };

  const handleChanges = (evento, indice) => {
    const { name, value } = evento.target;
    let copiaImagenesList = imagenesList.map((elemento) => ({
      ...elemento,
    }));
    copiaImagenesList[indice][name] = value;
    setImagenesList(copiaImagenesList);
  };

  return (
    <div>
      <h2>Cargar imágenes</h2>
      {imagenesList.map((imagen, index) => (
        <div key={index}>
          <input
            type="text"
						name="url"
						placeholder="Insertar https://"
            value={imagenesList[index].url}
            onChange={(evento) => {
              handleChanges(evento, index);
            }}
          />
          {index === imagenesList.length - 1 ? (
            <button onClick={addImagenToImagenList}>+</button>
          ) : undefined}
        </div>
      ))}
    </div>
  );
};
