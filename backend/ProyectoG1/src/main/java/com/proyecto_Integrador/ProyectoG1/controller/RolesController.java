package com.proyecto_Integrador.ProyectoG1.controller;


import com.proyecto_Integrador.ProyectoG1.exception.ResourceNotFoundException;

import com.proyecto_Integrador.ProyectoG1.model.Roles;
import com.proyecto_Integrador.ProyectoG1.service.RolesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/roles")
@CrossOrigin
public class RolesController {

    private RolesService rolesService;
    @Autowired
    public RolesController(RolesService rolesService) {
        this.rolesService = rolesService;
    }

    @PostMapping
    public ResponseEntity<Roles> crearRol(@RequestBody Roles rol){
        return ResponseEntity.ok(rolesService.agregarRol(rol));
    }

    @GetMapping
    public ResponseEntity<List<Roles>> listarRoles(){
        return ResponseEntity.ok(rolesService.listarRoles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Roles> buscarRol(@PathVariable Long id){
        Optional<Roles> rolBuscado= rolesService.buscarRol(id);
        if (rolBuscado.isPresent()){
            return ResponseEntity.ok(rolBuscado.get());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping
    public ResponseEntity<String> modificarRol(@RequestBody Roles rol){
        Optional<Roles> rolBuscado = rolesService.buscarRol(rol.getId());
        if (rolBuscado.isPresent()){
            rolesService.editarRol(rol);
            return ResponseEntity.ok("Se actualizó el rol con id "+ rol.getId());
        }
        else {
            return ResponseEntity.badRequest().body("No se pudo actualizar el rol con id= " + rol.getId() +
                    " ya que el mismo no existe en la base de datos.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarRol(@PathVariable Long id) throws ResourceNotFoundException {
        rolesService.eliminarRol(id);
        return ResponseEntity.ok("Se eliminó el rol con id "+ id);
    }

}
