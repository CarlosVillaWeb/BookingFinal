package com.proyecto_Integrador.ProyectoG1.controller;

import com.proyecto_Integrador.ProyectoG1.exception.ResourceNotFoundException;
import com.proyecto_Integrador.ProyectoG1.model.Producto;
import com.proyecto_Integrador.ProyectoG1.model.Reserva;
import com.proyecto_Integrador.ProyectoG1.model.Roles;
import com.proyecto_Integrador.ProyectoG1.model.Usuarios;
import com.proyecto_Integrador.ProyectoG1.service.ProductoService;
import com.proyecto_Integrador.ProyectoG1.service.ReservaService;
import com.proyecto_Integrador.ProyectoG1.service.UserService;
import com.proyecto_Integrador.ProyectoG1.token.model.ReservaRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
//@RequestMapping("/reservas")
@RequestMapping("/producto")
@CrossOrigin
public class ReservaController {
    @Autowired
    private ReservaService reservaService;
    @Autowired
    private UserService userService;
    @Autowired
    private ProductoService productoService;

    @Autowired
    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    @PostMapping(value="/{id}/reserva")
    public ResponseEntity<Reserva> agregarReservas(@RequestBody ReservaRequest reservaRequest){
        Usuarios usuarios = userService.asignarUsuario(reservaRequest.getUsuariosEmail()).orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        System.out.println(usuarios);
        usuarios.setCiudad(reservaRequest.getUsuariosCiudad());
        userService.updateUser(usuarios); // *** ACA TE ACTUALIZA LA CIUDAD *** Lo que pide la Issue
        Producto producto = productoService.buscarProducto(reservaRequest.getProducto_id()).orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));
        System.out.println(producto);
        Reserva reservaNueva = new Reserva(reservaRequest.getHoraComienzoDeReserva(),
                                            reservaRequest.getFechaInicialDeLaReserva(),
                                            reservaRequest.getFechaFinalDeLaReserva(),
                                            producto,
                                            usuarios
                                            );
        reservaService.crearReserva(reservaNueva);

        return ResponseEntity.ok(reservaNueva);
    }

    @GetMapping
    public ResponseEntity<List<Reserva>> listarReservas(){
        return ResponseEntity.ok(reservaService.listarReservas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reserva> buscarReserva (@PathVariable Long id){
        Optional<Reserva> reservaBuscada = reservaService.buscarReservaPorId(id);
        if (reservaBuscada.isPresent()){
            return ResponseEntity.ok(reservaBuscada.get());
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/producto/{producto}")
    public ResponseEntity<List<Reserva>> reservaPorProducto (@PathVariable String producto){
        List<Reserva> reservaBuscada = reservaService.buscarReservaPorProducto(producto);
        return ResponseEntity.ok(reservaBuscada);
    }

    @GetMapping("/usuario/{usuario}")
    public ResponseEntity<List<Reserva>> reservaPorUsuario (@PathVariable String usuario){
        List<Reserva> reservaBuscada = reservaService.buscarReservaPorUsuario(usuario);
        return ResponseEntity.ok(reservaBuscada);
    }

    @GetMapping("/reservaPorId/{idUsuario}")
    public ResponseEntity<List<Reserva>> reservaPorIdUsuario (@PathVariable Long idUsuario){
        List<Reserva> reservaBuscada = reservaService.buscarReservaPorIdUsuario(idUsuario);
        return ResponseEntity.ok(reservaBuscada);
    }

    @PutMapping
    public ResponseEntity<String> editarReserva(@RequestBody Reserva reserva){
        Optional<Reserva> reservaBuscada = reservaService.buscarReservaPorId(reserva.getId());
        if (reservaBuscada.isPresent()){
            reservaService.editarReserva(reserva);
            return ResponseEntity.ok("Se actualizó la reserva con id: " + reserva.getId());
        }else{
            return ResponseEntity.badRequest().body("No se pudo actualizar la reserva con id: " + reserva.getId() + " pues no existe en la base de datos.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarReserva(@PathVariable Long id) throws ResourceNotFoundException{
        reservaService.eliminarReserva(id);
        return ResponseEntity.ok("Se ha eliminado la reserva con id " + id);
    }
}
