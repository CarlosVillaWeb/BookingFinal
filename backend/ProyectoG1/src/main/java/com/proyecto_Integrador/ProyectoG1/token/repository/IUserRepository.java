package com.proyecto_Integrador.ProyectoG1.token.repository;

import com.proyecto_Integrador.ProyectoG1.model.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<Usuarios, Long> {

    @Query("from Usuarios u where u.email =:email")
    Optional<Usuarios> getUserByName(@Param("email") String email);
}
