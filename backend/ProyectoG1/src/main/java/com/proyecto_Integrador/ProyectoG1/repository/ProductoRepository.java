package com.proyecto_Integrador.ProyectoG1.repository;

import com.proyecto_Integrador.ProyectoG1.model.Producto;
import com.proyecto_Integrador.ProyectoG1.model.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


public interface ProductoRepository extends JpaRepository<Producto,Long> {


    @Query("FROM Producto p INNER JOIN p.ubicacion u WHERE u.ciudad=?1")

    List<Producto>  filtrarProductoPorCiudad (String ciudad);

    @Query("FROM Producto p INNER JOIN p.categoria c WHERE c.titulo=?1")

    List<Producto>  filtrarProductoPorCategoria (String categoria);

    @Query ("SELECT p FROM Producto p ORDER BY RAND()")

    List<Producto> productosAleatorios();

    @Query("SELECT p FROM Producto p WHERE p.id = :id")
    Optional<Producto> findById(@Param("id") Long id);

    @Query("SELECT p FROM Producto p JOIN p.ubicacion u WHERE p.id NOT IN (SELECT r.producto.id FROM Reserva r WHERE r.fechaInicialDeLaReserva >= :fechaInicialDeLaReserva AND r.fechaFinalDeLaReserva <= :fechaFinalDeLaReserva)")
    List<Producto> buscarProductosDisponiblesPorFecha(@Param("fechaInicialDeLaReserva") LocalDate fechaInicialDeLaReserva, @Param("fechaFinalDeLaReserva") LocalDate fechaFinalDeLaReserva);

    @Query("SELECT p FROM Producto p JOIN p.ubicacion u WHERE u.ciudad = :ciudad AND p.id NOT IN (SELECT r.producto.id FROM Reserva r WHERE r.fechaInicialDeLaReserva >= :fechaInicialDeLaReserva AND r.fechaFinalDeLaReserva <= :fechaFinalDeLaReserva)")
    List<Producto> buscarProductosDisponiblesPorCiudadYFecha(@Param("ciudad") String ciudad, @Param("fechaInicialDeLaReserva") LocalDate fechaInicialDeLaReserva, @Param("fechaFinalDeLaReserva") LocalDate fechaFinalDeLaReserva);

}
