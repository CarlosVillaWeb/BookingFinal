import React, { Children, createContext, useMemo, useState } from "react";

export const ImagenContext = createContext();

export const ImagenProvider = (props) => {
  const [visible, setVisible] = useState(false);

  function abrirGaleria(valor) {
    setVisible(valor);
  }

  const providerValue = useMemo(
    () => ({
      visible,
      setVisible,
      abrirGaleria,
    }),
    [visible, setVisible, abrirGaleria]
  );

  return (
    <ImagenContext.Provider value={providerValue}>
      {props.children}
    </ImagenContext.Provider>
  );
};
