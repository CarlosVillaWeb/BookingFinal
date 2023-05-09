package com.proyecto_Integrador.ProyectoG1.controller;

import com.proyecto_Integrador.ProyectoG1.exception.ResourceNotFoundException;

import com.proyecto_Integrador.ProyectoG1.model.Ubicacion;
import com.proyecto_Integrador.ProyectoG1.service.UbicacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ciudades")
@CrossOrigin
public class UbicacionController {

    private UbicacionService ubicacionService;

    @Autowired
    public UbicacionController(UbicacionService ubicacionService) {
        this.ubicacionService = ubicacionService;
    }


    @PostMapping
    public ResponseEntity<Ubicacion> crearUbicacion(@RequestBody Ubicacion ubicacion){
        return ResponseEntity.ok(ubicacionService.agregarUbicacion(ubicacion));
    }

    @GetMapping
    public ResponseEntity<List<Ubicacion>> listarUbicacion(){
        return ResponseEntity.ok(ubicacionService.listarUbicacion());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ubicacion> buscarUbicacion(@PathVariable Long id){
        Optional<Ubicacion> ubicacionBuscada= ubicacionService.buscarUbicacion(id);
        if (ubicacionBuscada.isPresent()){
            return ResponseEntity.ok(ubicacionBuscada.get());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping
    public ResponseEntity<String> modificarUbicacion(@RequestBody Ubicacion ubicacion){
        Optional<Ubicacion> ubicacionBuscada = ubicacionService.buscarUbicacion(ubicacion.getId());
        if (ubicacionBuscada.isPresent()){
            ubicacionService.editarUbicacion(ubicacion);
            return ResponseEntity.ok("Se actualizó la ubicación con id "+ ubicacion.getId());
        }
        else {
            return ResponseEntity.badRequest().body("No se pudo actualizar la ubicación con id= " + ubicacion.getId() +
                    " ya que el mismo no existe en la base de datos.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarUbicacion(@PathVariable Long id) throws ResourceNotFoundException {
        ubicacionService.eliminarUbicacion(id);
        return ResponseEntity.ok("Se eliminó la ubicación con id "+ id);
    }
}
