import data from "../../data.json";
import styles from "../../module/Home.module.css";
//Importaciones Breisman
import { Buscador } from "../../buscador/Buscador";
import { Listado } from "../../listado/Listado";
import Categorias from "../../categorias/Categorias";
import { ListadoProvider } from "../../utils/context/ListadoContext";

const Home = () => {

  return (
    <div className={styles.container}>
      <ListadoProvider>
      <Buscador />
      <div className={styles.homeContainer}>
        <Categorias />
        <Listado />
      </div>
      </ListadoProvider>
    </div>
  );
};

export default Home;
