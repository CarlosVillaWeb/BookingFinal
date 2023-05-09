package com.proyecto_Integrador.ProyectoG1.repository;

import com.proyecto_Integrador.ProyectoG1.model.Caracteristica;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CaracteristicaRepository extends JpaRepository<Caracteristica,Long> {
    Optional<Caracteristica> findByDescripcion (String nombre);

}
