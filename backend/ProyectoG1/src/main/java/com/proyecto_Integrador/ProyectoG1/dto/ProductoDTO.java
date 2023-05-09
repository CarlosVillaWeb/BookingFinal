package com.proyecto_Integrador.ProyectoG1.dto;

import com.proyecto_Integrador.ProyectoG1.model.Caracteristica;
import com.proyecto_Integrador.ProyectoG1.model.Imagen;
import com.proyecto_Integrador.ProyectoG1.model.Politica;

import java.util.HashSet;
import java.util.Set;

public class ProductoDTO {

    private Long id;
    private String titulo;
    private String descripcion;
    private String direccion;
    private int calificacion;
    private float precio;
    private Long categoria_id;
    private Long ubicacion_id;
    private Set<Imagen> imagenes = new HashSet<>();
    private Set<Caracteristica> caracteristicas = new HashSet<>();
    private Set<Politica> politicas = new HashSet<>();

    public Set<Imagen> getImagenes() {
        return imagenes;
    }

    public void setImagenes(Set<Imagen> imagenes) {
        this.imagenes = imagenes;
    }

    public Set<Caracteristica> getCaracteristicas() {
        return caracteristicas;
    }

    public void setCaracteristicas(Set<Caracteristica> caracteristicas) {
        this.caracteristicas = caracteristicas;
    }

    public Set<Politica> getPoliticas() {
        return politicas;
    }

    public void setPoliticas(Set<Politica> politicas) {
        this.politicas = politicas;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public int getCalificacion() {
        return calificacion;
    }

    public void setCalificacion(int calificacion) {
        this.calificacion = calificacion;
    }

    public float getPrecio() {
        return precio;
    }

    public void setPrecio(float precio) {
        this.precio = precio;
    }

    public Long getCategoria_id() {
        return categoria_id;
    }

    public void setCategoria_id(Long categoria_id) {
        this.categoria_id = categoria_id;
    }

    public Long getUbicacion_id() {
        return ubicacion_id;
    }

    public void setUbicacion_id(Long ubicacion_id) {
        this.ubicacion_id = ubicacion_id;
    }
}
