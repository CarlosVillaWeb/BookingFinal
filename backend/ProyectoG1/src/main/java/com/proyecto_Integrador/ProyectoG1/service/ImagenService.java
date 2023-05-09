package com.proyecto_Integrador.ProyectoG1.service;

import com.proyecto_Integrador.ProyectoG1.dto.ImagenDTO;
import com.proyecto_Integrador.ProyectoG1.dto.ProductoDTO;
import com.proyecto_Integrador.ProyectoG1.exception.ResourceNotFoundException;
import com.proyecto_Integrador.ProyectoG1.model.*;
import com.proyecto_Integrador.ProyectoG1.repository.ImagenRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ImagenService {

    private ImagenRepository imagenRepository;

    @Autowired
    public ImagenService(ImagenRepository imagenRepository) {
        this.imagenRepository = imagenRepository;
    }

    private static final Logger LOGGER= Logger.getLogger(ImagenService.class);

//    public Imagen agregarImagen (Imagen imagen){
//        return imagenRepository.save(imagen);
//    }

    public ImagenDTO agregarImagen (ImagenDTO imagenDTO){
        Imagen imagenGuardada= imagenRepository.save(imagenDTOAImagen(imagenDTO));
        return  imagenAImagenDTO(imagenGuardada);
    }


    public List<Imagen> listarImagen (){
        return imagenRepository.findAll();
    }

    public Optional<Imagen> buscarImagen(Long id){
        return imagenRepository.findById(id);
    }

    public Optional<Imagen> filtroPorUrl (String url){
        return imagenRepository.findByUrl(url);

    }

//    public void editarImagen (Imagen imagen){
//        imagenRepository.save(imagen);
//    }

    public void editarImagen(ImagenDTO imagenDTO){
        Optional<Imagen> imagenActualizada = imagenRepository.findById(imagenDTO.getId());
        if (imagenActualizada.isPresent()){
            imagenRepository.save(imagenDTOAImagen(imagenDTO));
        }else {
            ResponseEntity.badRequest().body("No se pudo actualizar el producto con id= " + imagenDTO.getId() +
                    " ya que el mismo no existe en la base de datos.");
        }
    }

    public void eliminarImagen (Long id) throws ResourceNotFoundException {
        Optional<Imagen> imagenBuscada= buscarImagen(id);
        if (imagenBuscada.isPresent()){
            LOGGER.warn("Se eliminó la imagen con id "+ id);
            imagenRepository.deleteById(id);
        }else {
            throw new ResourceNotFoundException("No se pudo eliminar la imagen, ya que no existe una " +
                    " con id= "+id +" en la base de datos.");
        }
    }

    private ImagenDTO imagenAImagenDTO(Imagen imagen) {
        ImagenDTO respuesta = new ImagenDTO();

        respuesta.setId(imagen.getId());
        respuesta.setTitulo(imagen.getTitulo());
        respuesta.setUrl(imagen.getUrl());

        return respuesta;
    }

    private Imagen imagenDTOAImagen (ImagenDTO imagenDTO){
        Imagen respuesta = new Imagen();

        respuesta.setId(imagenDTO.getId());
        respuesta.setTitulo(imagenDTO.getTitulo());
        respuesta.setUrl(imagenDTO.getUrl());

        return respuesta;

    }

}
