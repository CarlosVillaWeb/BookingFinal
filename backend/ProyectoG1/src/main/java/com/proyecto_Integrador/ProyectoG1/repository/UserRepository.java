package com.proyecto_Integrador.ProyectoG1.repository;

import com.proyecto_Integrador.ProyectoG1.model.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Usuarios, Long> {
    @Query("SELECT u FROM Usuarios u WHERE u.email = :email AND u.contrasena = :contrasena")
    Usuarios findByEmailAndPassword(@Param("email") String email,
                                    @Param("contrasena") String contrasena);

    @Query("SELECT u FROM Usuarios u WHERE u.email = :email")
    Optional<Usuarios> findByEmail(@Param("email") String email);

    @Query("SELECT u FROM Usuarios u WHERE u.contrasena = :contrasena")
    Usuarios findByContrasena(@Param("contrasena") String contrasena);

    @Query("SELECT u FROM Usuarios u WHERE u.id = :id")
    Optional<Usuarios> findById(@Param("id") Long id);

}
