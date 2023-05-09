package com.proyecto_Integrador.ProyectoG1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="politicas")
public class Politica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String tipoPolitica;

    @Column(nullable = false)
    private String descripcion;

    @ManyToMany(mappedBy = "politicas", fetch = FetchType.LAZY )
    @JsonIgnore
    private Set<Producto> productos = new HashSet<>();

    public Politica() {
    }

    public Politica(Long id, String tipoPolitica, String descripcion) {
        this.id = id;
        this.tipoPolitica = tipoPolitica;
        this.descripcion = descripcion;
    }

    public Politica(String tipoPolitica, String descripcion) {
        this.tipoPolitica = tipoPolitica;
        this.descripcion = descripcion;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipoPolitica() {
        return tipoPolitica;
    }

    public void setTipoPolitica(String tipoPolitica) {
        this.tipoPolitica = tipoPolitica;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Set<Producto> getProductos() {
        return productos;
    }

    public void setProductos(Set<Producto> productos) {
        this.productos = productos;
    }
}
