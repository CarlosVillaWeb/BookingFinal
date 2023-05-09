package com.proyecto_Integrador.ProyectoG1.repository;

import com.proyecto_Integrador.ProyectoG1.model.Roles;
import com.proyecto_Integrador.ProyectoG1.model.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RolesRepository extends JpaRepository<Roles,Long> {
    @Query("SELECT r FROM Roles r WHERE r.id = :id")
    Optional<Roles> findByRolId(@Param("id") Long id);
    @Query("SELECT r FROM Roles r WHERE r.nombre = :nombre")
    Roles findByRolName(@Param("nombre") String nombre);
}
