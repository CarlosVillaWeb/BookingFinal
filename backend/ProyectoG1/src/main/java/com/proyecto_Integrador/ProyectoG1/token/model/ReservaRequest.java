package com.proyecto_Integrador.ProyectoG1.token.model;

import com.proyecto_Integrador.ProyectoG1.model.Producto;
import com.proyecto_Integrador.ProyectoG1.model.Usuarios;

import java.time.LocalDate;
import java.time.LocalTime;

public class ReservaRequest {
    private LocalTime horaComienzoDeReserva;
    private LocalDate fechaInicialDeLaReserva;
    private LocalDate fechaFinalDeLaReserva;
    private Long producto_id;
    private String usuariosEmail;

    private String usuariosCiudad;

    public ReservaRequest() {
    }

    public ReservaRequest(LocalTime horaComienzoDeReserva, LocalDate fechaInicialDeLaReserva, LocalDate fechaFinalDeLaReserva, Long producto_id, String usuariosEmail, String usuariosCiudad) {
        this.horaComienzoDeReserva = horaComienzoDeReserva;
        this.fechaInicialDeLaReserva = fechaInicialDeLaReserva;
        this.fechaFinalDeLaReserva = fechaFinalDeLaReserva;
        this.producto_id = producto_id;
        this.usuariosEmail = usuariosEmail;
        this.usuariosCiudad = usuariosCiudad;
    }

    public LocalTime getHoraComienzoDeReserva() {
        return horaComienzoDeReserva;
    }

    public void setHoraComienzoDeReserva(LocalTime horaComienzoDeReserva) {
        this.horaComienzoDeReserva = horaComienzoDeReserva;
    }

    public LocalDate getFechaInicialDeLaReserva() {
        return fechaInicialDeLaReserva;
    }

    public void setFechaInicialDeLaReserva(LocalDate fechaInicialDeLaReserva) {
        this.fechaInicialDeLaReserva = fechaInicialDeLaReserva;
    }

    public LocalDate getFechaFinalDeLaReserva() {
        return fechaFinalDeLaReserva;
    }

    public void setFechaFinalDeLaReserva(LocalDate fechaFinalDeLaReserva) {
        this.fechaFinalDeLaReserva = fechaFinalDeLaReserva;
    }

    public Long getProducto_id() {
        return producto_id;
    }

    public void setProducto_id(Long producto_id) {
        this.producto_id = producto_id;
    }

    public String getUsuariosEmail() {
        return usuariosEmail;
    }

    public void setUsuariosEmail(String usuariosEmail) {
        this.usuariosEmail = usuariosEmail;
    }

    public String getUsuariosCiudad() {
        return usuariosCiudad;
    }

    public void setUsuariosCiudad(String usuariosCiudad) {
        this.usuariosCiudad = usuariosCiudad;
    }
}
