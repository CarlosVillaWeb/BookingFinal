package com.proyecto_Integrador.ProyectoG1.service;

import com.proyecto_Integrador.ProyectoG1.exception.ResourceNotFoundException;
import com.proyecto_Integrador.ProyectoG1.model.Ubicacion;
import com.proyecto_Integrador.ProyectoG1.repository.UbicacionRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UbicacionService {

    private UbicacionRepository ubicacionRepository;

    @Autowired
    public UbicacionService(UbicacionRepository ubicacionRepository) {
        this.ubicacionRepository = ubicacionRepository;
    }

    private static final Logger LOGGER= Logger.getLogger(UbicacionService.class);

    public Ubicacion agregarUbicacion (Ubicacion ubicacion){
        LOGGER.info("Se inició el proceso de guardado, de la ubicación " + ubicacion.getCiudad() + "" + ubicacion.getPais());
        return ubicacionRepository.save(ubicacion);
    }

    public List<Ubicacion> listarUbicacion (){
        LOGGER.info("Se inició el proceso de listado, de las ubicaciones ");
        return ubicacionRepository.findAll();
    }

    public Optional<Ubicacion> buscarUbicacion(Long id){
        LOGGER.info("Se inició el proceso de busqueda, de la ubicación con id: " + id);
        return ubicacionRepository.findById(id);
    }

    public void editarUbicacion (Ubicacion ubicacion){
        LOGGER.info("Se inició el proceso de edición, de la ubicación " + ubicacion.getCiudad());
        ubicacionRepository.save(ubicacion);
    }

    public void eliminarUbicacion (Long id) throws ResourceNotFoundException {
        Optional<Ubicacion> ubicacionBuscada= buscarUbicacion(id);
        if (ubicacionBuscada.isPresent()){
            LOGGER.warn("Se eliminó la ubicación con id "+ id);
            ubicacionRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("No se pudo eliminar la ubicación, ya que no existe una " +
                    " con id= "+id +" en la base de datos.");
        }
    }
}
