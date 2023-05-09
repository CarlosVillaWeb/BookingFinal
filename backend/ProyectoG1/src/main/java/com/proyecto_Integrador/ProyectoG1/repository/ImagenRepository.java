package com.proyecto_Integrador.ProyectoG1.repository;

import com.proyecto_Integrador.ProyectoG1.model.Imagen;
import com.proyecto_Integrador.ProyectoG1.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ImagenRepository extends JpaRepository<Imagen,Long> {

    //    @Query("SELECT * FROM imagenes i WHERE i.url=?1")
    Optional<Imagen> findByUrl (String url);

//    @Query("SELECT i FROM imagenes i WHERE i.producto_id = :producto_id")
//    Optional<Imagen> findByImagenesIdProducto(@Param("producto_id") Long producto_id);
}
