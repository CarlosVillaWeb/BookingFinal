package com.proyecto_Integrador.ProyectoG1.controller;

import com.proyecto_Integrador.ProyectoG1.dto.ImagenDTO;
import com.proyecto_Integrador.ProyectoG1.exception.ResourceNotFoundException;
import com.proyecto_Integrador.ProyectoG1.model.Imagen;
import com.proyecto_Integrador.ProyectoG1.service.ImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/imagenes")
@CrossOrigin
public class ImagenController {

    private ImagenService imagenService;

    @Autowired
    public ImagenController(ImagenService imagenService) {
        this.imagenService = imagenService;
    }

    @PostMapping
    public ResponseEntity<ImagenDTO> crearImagen(@RequestBody ImagenDTO imagenDTO){
        return ResponseEntity.ok(imagenService.agregarImagen(imagenDTO));
    }

    @GetMapping
    public ResponseEntity<List<Imagen>> listarImagen(){
        return ResponseEntity.ok(imagenService.listarImagen());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Imagen> buscarImagen(@PathVariable Long id){
        Optional<Imagen> imagenBuscada= imagenService.buscarImagen(id);
        if (imagenBuscada.isPresent()){
            return ResponseEntity.ok(imagenBuscada.get());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping
    public ResponseEntity<String> modificarImagen(@RequestBody ImagenDTO imagenDTO){
        Optional<Imagen> imagenBuscada = imagenService.buscarImagen(imagenDTO.getId());
        if (imagenBuscada.isPresent()){
            imagenService.editarImagen(imagenDTO);
            return ResponseEntity.ok("Se actualizó la imagen con id "+ imagenDTO.getId());
        }
        else {
            return ResponseEntity.badRequest().body("No se pudo actualizar la imagen con id= " + imagenDTO.getId() +
                    " ya que el mismo no existe en la base de datos.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarImagen(@PathVariable Long id) throws ResourceNotFoundException {
        imagenService.eliminarImagen(id);
        return ResponseEntity.ok("Se eliminó la imagen con id "+ id);
    }

    @GetMapping("/url/{url}")
    public ResponseEntity<Imagen> busquedaPorUrl (@PathVariable String url){
        Optional<Imagen> imagenBuscada= imagenService.filtroPorUrl(url);
        if (imagenBuscada.isPresent()){
            return ResponseEntity.ok(imagenBuscada.get());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
}
