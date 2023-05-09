package com.proyecto_Integrador.ProyectoG1.model;

import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "roles")
@Setter
@Getter
public class Roles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    public Roles() {
    }

    public Roles(String nombre) {
        this.nombre = nombre;
    }

    public Roles(Long id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }
}
