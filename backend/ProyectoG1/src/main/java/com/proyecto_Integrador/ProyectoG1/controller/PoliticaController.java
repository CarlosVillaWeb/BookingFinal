package com.proyecto_Integrador.ProyectoG1.controller;

import com.proyecto_Integrador.ProyectoG1.exception.ResourceNotFoundException;
import com.proyecto_Integrador.ProyectoG1.model.Imagen;
import com.proyecto_Integrador.ProyectoG1.model.Politica;
import com.proyecto_Integrador.ProyectoG1.service.PoliticaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/politicas")
@CrossOrigin
public class PoliticaController {

    private PoliticaService politicaService;

    @Autowired
    public PoliticaController(PoliticaService politicaService) {
        this.politicaService = politicaService;
    }

    @PostMapping
    public ResponseEntity<Politica> crearPolitica(@RequestBody Politica politica){
        return ResponseEntity.ok(politicaService.agregarPolitica(politica));
    }

    @GetMapping
    public ResponseEntity<List<Politica>> listarPolitica(){
        return ResponseEntity.ok(politicaService.listarPolitica());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Politica> buscarPolitica(@PathVariable Long id){
        Optional<Politica> politicaBuscada= politicaService.buscarPolitica(id);
        if (politicaBuscada.isPresent()){
            return ResponseEntity.ok(politicaBuscada.get());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping
    public ResponseEntity<String> modificarPolitica(@RequestBody Politica politica){
        Optional<Politica> politicaBuscada = politicaService.buscarPolitica(politica.getId());
        if (politicaBuscada.isPresent()){
            politicaService.editarPolitica(politica);
            return ResponseEntity.ok("Se actualizó la politica con id "+ politica.getId());
        }
        else {
            return ResponseEntity.badRequest().body("No se pudo actualizar la politica con id= " + politica.getId() +
                    " ya que el mismo no existe en la base de datos.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarPolitica(@PathVariable Long id) throws ResourceNotFoundException {
        politicaService.eliminarPolitica(id);
        return ResponseEntity.ok("Se eliminó la politica con id "+ id);
    }
}

