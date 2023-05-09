package com.proyecto_Integrador.ProyectoG1.dto;

public class PoliticaDTO {

    private Long id;
    private String tipoPolitica;
    private String descripcion;

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
}
