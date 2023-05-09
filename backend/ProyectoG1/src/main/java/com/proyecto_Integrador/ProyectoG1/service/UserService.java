package com.proyecto_Integrador.ProyectoG1.service;

import com.proyecto_Integrador.ProyectoG1.model.Roles;
import com.proyecto_Integrador.ProyectoG1.model.Usuarios;

import java.util.List;
import java.util.Optional;

public interface UserService {

    String secretKey = "secretKey";
    long validityInMs = 3600000; // 1h

    public String createToken(String email);

    public Usuarios saveUser(Usuarios user);
    public Usuarios updateUser(Usuarios user);
    public Usuarios selectUser(Usuarios user);
    Usuarios findByEmailAndPassword(String email, String contrasena);
    public List<Usuarios> getAllUsers();

    Optional<Usuarios> findByEmail(String email);

    public Optional<Usuarios> asignarUsuario(String usuarioEmail);

    Usuarios findByContrasena(String contrasena);
}
