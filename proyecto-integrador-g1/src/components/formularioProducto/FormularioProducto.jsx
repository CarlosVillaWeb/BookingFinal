import React from "react";
import Select from "react-select";
import { productoActionTypes } from "../utils/reducers/productoReducer";
import { useFormularioProducto } from "../utils/hooks/useFormularioProducto";
import { useCategoria } from "../utils/hooks/useCategoria";
import { useCiudades } from "../utils/hooks/useCiudades";
import { useCaracteristicas } from "../utils/hooks/useCaracteristicas";
import { usePoliticas } from "../utils/hooks/usePoliticas";
import { AtributosProducto } from "../atributosProducto/AtributosProducto";
import { PoliticasFormularioProducto } from "../politicasFormularioProducto/PoliticasFormularioProducto";
import { ImagenesFormularioProducto } from "../imagenesFormularioProducto/ImagenesFormularioProducto";
import styles from "../module/formularioProducto.module.css";

export const FormularioProducto = () => {
  const {
    formularioProducto,
    handleChanges,
    handleSelect,
    handleSelectArray,
    handleChangesImagenes,
    handleSubmit,
  } = useFormularioProducto();

  const { categorias, loadingCategorias } = useCategoria();
  const { ciudades, loadingCiudades } = useCiudades();
  const { caracteristicas, loadingCaracteristicias } = useCaracteristicas();
  const { politicas, loadingPoliticas } = usePoliticas();

  return (
    <div className={styles.contenedor}>
      <h2 className={styles.titulo}>Crear producto</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={`${styles.nombreProducto} ${styles.contenedorInput}`}>
          <label htmlFor="nombreProducto" className={styles.label}>
            Nombre de producto
          </label>
          <input
            type="text"
            id="nombreProducto"
            name={productoActionTypes.titulo}
            value={FormularioProducto?.titulo}
            onChange={handleChanges}
            className={styles.input}
          />
        </div>
        <div
          className={`${styles.categoriaProducto} ${styles.contenedorInput}`}
        >
          <label className={styles.label}>Categoria</label>
          <Select
            options={categorias?.map((categoria) => {
              return {
                label: categoria.titulo,
                value: categoria.id,
              };
            })}
            onChange={(evento) =>
              handleSelect(evento, productoActionTypes.categoria_id)
            }
            defaultValue={{ label: "Selecciona una categoría", value: null }}
          />
        </div>
        <div
          className={`${styles.direccionProducto} ${styles.contenedorInput}`}
        >
          <label htmlFor="direccion" className={styles.label}>
            Dirección
          </label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={FormularioProducto?.direccion}
            onChange={handleChanges}
            className={styles.input}
          />
        </div>
        <div className={`${styles.ciudadProducto} ${styles.contenedorInput}`}>
          <label className={styles.label}>Ciudad</label>
          <Select
            options={ciudades?.map((ciudad) => {
              return {
                label: ciudad.ciudad,
                value: ciudad.id,
              };
            })}
            onChange={(evento) =>
              handleSelect(evento, productoActionTypes.ubicacion_id)
            }
            defaultValue={{ label: "Selecciona una ciudad", value: null }}
          />
        </div>
        <div
          className={`${styles.descripcionProducto} ${styles.contenedorInput}`}
        >
          <label htmlFor="descripcion" className={styles.label}>
            Descripción
          </label>
          <textarea
            className={styles.textArea}
            // rows={10}
            // cols={100}
            id="descripcion"
            name="descripcion"
            value={FormularioProducto?.descripcion}
            onChange={handleChanges}
          />
        </div>
        <AtributosProducto
          caracteristicas={caracteristicas}
          handleSelectArray={handleSelectArray}
        />
        <PoliticasFormularioProducto
          politicas={politicas}
          handleSelectArray={handleSelectArray}
        />
        <ImagenesFormularioProducto
          handleChangesImagenes={handleChangesImagenes}
        />
        <button onClick={(evento) => handleSubmit(evento)}>Crear</button>
      </form>
    </div>
  );
};
