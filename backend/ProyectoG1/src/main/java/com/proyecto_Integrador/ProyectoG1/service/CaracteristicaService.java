package com.proyecto_Integrador.ProyectoG1.service;

import com.proyecto_Integrador.ProyectoG1.dto.CaracteristicaDTO;
import com.proyecto_Integrador.ProyectoG1.dto.ProductoDTO;
import com.proyecto_Integrador.ProyectoG1.exception.ResourceNotFoundException;
import com.proyecto_Integrador.ProyectoG1.model.*;
import com.proyecto_Integrador.ProyectoG1.repository.CaracteristicaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CaracteristicaService {

    private static final Logger LOGGER= Logger.getLogger(CaracteristicaService.class);
    private CaracteristicaRepository caracteristicaRepository;

    @Autowired
    public CaracteristicaService(CaracteristicaRepository caracteristicaRepository) {
        this.caracteristicaRepository = caracteristicaRepository;
    }

    //    public Caracteristica agregarCaracteristica (Caracteristica caracteristica){
//        return caracteristicaRepository.save(caracteristica);
//    }
    public CaracteristicaDTO crearCaracteristica(CaracteristicaDTO caracteristicaDTO){
        Caracteristica caracteristicaGuardada= caracteristicaRepository.save(caracteristicaDTOACaracteristica(caracteristicaDTO));
        return  caracteristicaACaracteristicaDTO(caracteristicaGuardada);
    }

    public List<Caracteristica> listarCaracteristica (){
        return caracteristicaRepository.findAll();
    }

    public Optional<Caracteristica> buscarCaracteristica(Long id){
        return caracteristicaRepository.findById(id);
    }

//    public void editarCaracteristica (Caracteristica caracteristica){
//        caracteristicaRepository.save(caracteristica);
//    }

    public void editarCaracteristica(CaracteristicaDTO caracteristicaDTO){
        Optional<Caracteristica> caracteristicactualizada = caracteristicaRepository.findById(caracteristicaDTO.getId());
        if (caracteristicactualizada.isPresent()){
            caracteristicaRepository.save(caracteristicaDTOACaracteristica(caracteristicaDTO));
        }else {
            ResponseEntity.badRequest().body("No se pudo actualizar el caracteristica con id= " + caracteristicaDTO.getId() +
                    " ya que el mismo no existe en la base de datos.");
        }
    }

    public void eliminarCaracteristica (Long id) throws ResourceNotFoundException {
        Optional<Caracteristica> caracteristicaBuscada= buscarCaracteristica(id);
        if (caracteristicaBuscada.isPresent()){
            LOGGER.warn("Se eliminó la caracteristica con id "+ id);
            caracteristicaRepository.deleteById(id);
        }else {
            throw new ResourceNotFoundException("No se pudo eliminar la caracteristica, ya que no existe una " +
                    " con id= "+id +" en la base de datos.");
        }
    }


//    public Optional<Caracteristica> filtroPorName (String descripcionU){
//        return  caracteristicaRepository.findByDescripcion(descripcionU);
//    }

    public Optional<Caracteristica> filtroName(String nombre){
        return caracteristicaRepository.findByDescripcion(nombre);

    }


    private CaracteristicaDTO caracteristicaACaracteristicaDTO(Caracteristica caracteristica) {
        CaracteristicaDTO respuesta = new CaracteristicaDTO();

        respuesta.setId(caracteristica.getId());
        respuesta.setDescripcion(caracteristica.getDescripcion());
        respuesta.setIcono(caracteristica.getIcono());

        return respuesta;
    }

    private Caracteristica caracteristicaDTOACaracteristica (CaracteristicaDTO caracteristicaDTO){
        Caracteristica respuesta = new Caracteristica();

        respuesta.setId(caracteristicaDTO.getId());
        respuesta.setDescripcion(caracteristicaDTO.getDescripcion());
        respuesta.setIcono(caracteristicaDTO.getIcono());

        return respuesta;
    }
}
