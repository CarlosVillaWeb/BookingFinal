package com.proyecto_Integrador.ProyectoG1.controller;

import com.proyecto_Integrador.ProyectoG1.exception.ResourceNotFoundException;
import com.proyecto_Integrador.ProyectoG1.model.Categoria;
import com.proyecto_Integrador.ProyectoG1.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/categorias")
@CrossOrigin
public class CategoriaController {
    private CategoriaService categoriaService;

    @Autowired
    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @PostMapping
    public ResponseEntity<Categoria> registrarCategoria(@RequestBody Categoria categoria){
        return ResponseEntity.ok(categoriaService.agregarCategoria(categoria));
    }

    @GetMapping
    public ResponseEntity<List<Categoria>> listarCategorias (){
        return ResponseEntity.ok(categoriaService.listarCategoria());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> buscarCategoriaPorId(@PathVariable Long id){
        Optional<Categoria> categoriaBuscada = categoriaService.buscarCategoria(id);
        if(categoriaBuscada.isPresent()){
            return ResponseEntity.ok(categoriaBuscada.get());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping
    public ResponseEntity<String> actualizarCategoria(@RequestBody Categoria categoria) {
        Optional<Categoria> categoriaBuscada = categoriaService.buscarCategoria(categoria.getId());
        if (categoriaBuscada.isPresent()) {
            categoriaService.editarCategoria(categoria);
            return ResponseEntity.ok("Se actualizó la categoria con id= " + categoria.getId());
        } else {
            return ResponseEntity.badRequest().body("No se pudo actualizar la categoria con id= " + categoria.getId() +
                    " ya que el mismo no existe en la base de datos.");
        }
    }

    @DeleteMapping ("/{id}")
    public ResponseEntity<String> eliminarCategoria(@PathVariable Long id) throws ResourceNotFoundException {
        categoriaService.eliminarCategoria(id);
        return ResponseEntity.ok("Se eliminó la categoria con id "+ id);
    }

}
