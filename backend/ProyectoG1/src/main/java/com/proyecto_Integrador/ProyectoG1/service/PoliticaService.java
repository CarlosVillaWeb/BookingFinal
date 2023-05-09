package com.proyecto_Integrador.ProyectoG1.service;

import com.proyecto_Integrador.ProyectoG1.exception.ResourceNotFoundException;
import com.proyecto_Integrador.ProyectoG1.model.Imagen;
import com.proyecto_Integrador.ProyectoG1.model.Politica;
import com.proyecto_Integrador.ProyectoG1.repository.PoliticaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PoliticaService {

    private PoliticaRepository politicaRepository;

    @Autowired
    public PoliticaService(PoliticaRepository politicaRepository) {
        this.politicaRepository = politicaRepository;
    }

    private static final Logger LOGGER= Logger.getLogger(PoliticaService.class);

    public Politica agregarPolitica (Politica politica){
        LOGGER.info("Se inició el proceso de guardado, de la politica "+ politica.getTipoPolitica());
        return politicaRepository.save(politica);
    }

    public List<Politica> listarPolitica (){
        LOGGER.info("Se inició el proceso de listado, de politicas ");
        return politicaRepository.findAll();
    }

    public Optional<Politica> buscarPolitica(Long id){
        LOGGER.info("Se inició el proceso de busqueda, de la politica con id: " + id);
        return politicaRepository.findById(id);
    }

    public void editarPolitica (Politica politica){
        LOGGER.info("Se inició el proceso de edición, de la politica " + politica.getId());
        politicaRepository.save(politica);
    }

    public void eliminarPolitica (Long id) throws ResourceNotFoundException {
        Optional<Politica> politicaBuscada= buscarPolitica(id);
        if (politicaBuscada.isPresent()){
            LOGGER.warn("Se eliminó la politica con id "+ id);
            politicaRepository.deleteById(id);
        }else {
            throw new ResourceNotFoundException("No se pudo eliminar la politica, ya que no existe una " +
                    " con id= "+id +" en la base de datos.");
        }
    }
}
