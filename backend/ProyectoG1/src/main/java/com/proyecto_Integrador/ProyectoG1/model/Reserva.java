package com.proyecto_Integrador.ProyectoG1.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "Reservas")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalTime horaComienzoDeReserva;

    @Column(nullable = false)
    private LocalDate fechaInicialDeLaReserva;

    @Column(nullable = false)
    private LocalDate fechaFinalDeLaReserva;

    @ManyToOne
    @JoinColumn(name = "productos_id", referencedColumnName = "id")
    private Producto producto;

    @ManyToOne
    @JoinColumn(name = "usuarios_id", referencedColumnName = "id")
    private Usuarios usuarios;

    public Reserva() {
    }

    public Reserva(Long id, LocalTime horaComienzoDeReserva, LocalDate fechaInicialDeLaReserva, LocalDate fechaFinalDeLaReserva, Producto producto) {
        this.id = id;
        this.horaComienzoDeReserva = horaComienzoDeReserva;
        this.fechaInicialDeLaReserva = fechaInicialDeLaReserva;
        this.fechaFinalDeLaReserva = fechaFinalDeLaReserva;
        this.producto = producto;
    }

    public Reserva(LocalTime horaComienzoDeReserva, LocalDate fechaInicialDeLaReserva, LocalDate fechaFinalDeLaReserva, Producto producto, Usuarios usuarios) {
        this.horaComienzoDeReserva = horaComienzoDeReserva;
        this.fechaInicialDeLaReserva = fechaInicialDeLaReserva;
        this.fechaFinalDeLaReserva = fechaFinalDeLaReserva;
        this.producto = producto;
        this.usuarios = usuarios;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public Usuarios getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(Usuarios usuarios) {
        this.usuarios = usuarios;
    }
}
