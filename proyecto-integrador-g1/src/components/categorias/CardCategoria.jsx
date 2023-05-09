import React from "react";
import { ListadoContext } from "../utils/context/ListadoContext";
import styles from "../module/CardCategoria.module.css";

const CardCategoria = (props) => {
  const { llamadoAPI } = React.useContext(ListadoContext);

  function envioCategoria(categoria) {
    llamadoAPI(`productos/categoria/${categoria}`);
  }

  return (
    <div className={styles.posteo} onClick={() => envioCategoria(props.titulo)}>
      <img src={props.imagen} className={styles.imagen}></img>
      <h4>{props.titulo}</h4>
      <p>{props.disponibilidad}</p>
    </div>
  );
};

export default CardCategoria;
