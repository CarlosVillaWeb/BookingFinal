package com.proyecto_Integrador.ProyectoG1.repository;

import com.proyecto_Integrador.ProyectoG1.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    @Query(value = "Select reservas.*, productos.id FROM reservas LEFT JOIN productos ON reservas.productos_id = productos.id WHERE productos.id=?1",
            nativeQuery = true)
    List<Reserva> filtrarReservaPorProducto();

    @Query(value = "Select reservas.*, usuarios.nombre FROM reservas LEFT JOIN usuarios ON reservas.usuarios_id != usuarios.nombre WHERE usuarios.nombre=?1",
            nativeQuery = true)
    List<Reserva> filtrarReservaPorUsuario();

    @Query(value = "Select reservas.*, usuarios.id FROM reservas LEFT JOIN usuarios ON reservas.usuarios_id = usuarios.id WHERE usuarios.id=?1",
            nativeQuery = true)
    List<Reserva> filtrarReservaPorIdUsuario();
}
