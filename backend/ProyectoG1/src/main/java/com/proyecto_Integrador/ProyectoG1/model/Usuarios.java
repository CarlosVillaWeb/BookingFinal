package com.proyecto_Integrador.ProyectoG1.model;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "usuarios")
@Setter
@Getter
public class Usuarios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nombre;
    @Column(nullable = false)
    private String apellido;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String contrasena;
    @Column(nullable = false)
    private String ciudad;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "roles_id", referencedColumnName = "id")
    private Roles roles;

    public Usuarios(Long id) {
        this.id = id;
    }

    public Usuarios(){
        this.roles = new Roles(1L, "USER");
    }

    public void setPassword(String password) {
        this.contrasena = BCrypt.hashpw(password, BCrypt.gensalt());
    }

    public boolean checkPassword(String password) {
        return BCrypt.checkpw(password, this.contrasena);
    }

}
