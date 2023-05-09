package com.proyecto_Integrador.ProyectoG1.controller;

import com.proyecto_Integrador.ProyectoG1.dto.CaracteristicaDTO;
import com.proyecto_Integrador.ProyectoG1.exception.ResourceNotFoundException;
import com.proyecto_Integrador.ProyectoG1.model.Caracteristica;
import com.proyecto_Integrador.ProyectoG1.service.CaracteristicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/caracteristicas")
@CrossOrigin
public class CaracteristicaController {

    private CaracteristicaService caracteristicaService;

    @Autowired
    public CaracteristicaController(CaracteristicaService caracteristicaService) {
        this.caracteristicaService = caracteristicaService;
    }

    @PostMapping
    public ResponseEntity<CaracteristicaDTO> crearCaracteristica(@RequestBody CaracteristicaDTO caracteristicaDTO){
        return ResponseEntity.ok(caracteristicaService.crearCaracteristica(caracteristicaDTO));
    }

    @GetMapping
    public ResponseEntity<List<Caracteristica>> listarCaracteristicas(){
        return ResponseEntity.ok(caracteristicaService.listarCaracteristica());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Caracteristica> buscarCaracteristicas(@PathVariable Long id){
        Optional<Caracteristica> caracteristicaBuscada= caracteristicaService.buscarCaracteristica(id);
        if (caracteristicaBuscada.isPresent()){
            return ResponseEntity.ok(caracteristicaBuscada.get());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping
    public ResponseEntity<String> modificarCaracteristica(@RequestBody CaracteristicaDTO caracteristicaDTO) {
        caracteristicaService.editarCaracteristica(caracteristicaDTO);
        return ResponseEntity.ok("Se actualizó el caracteristica con id " + caracteristicaDTO.getId());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarCaracteristicas(@PathVariable Long id) throws ResourceNotFoundException {
        caracteristicaService.eliminarCaracteristica(id);
        return ResponseEntity.ok("Se eliminó la caracteristica con id "+ id);
    }
}
