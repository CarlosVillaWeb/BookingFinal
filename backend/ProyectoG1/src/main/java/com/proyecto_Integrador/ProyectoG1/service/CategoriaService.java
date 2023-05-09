package com.proyecto_Integrador.ProyectoG1.service;

import com.proyecto_Integrador.ProyectoG1.exception.ResourceNotFoundException;
import com.proyecto_Integrador.ProyectoG1.model.Categoria;
import com.proyecto_Integrador.ProyectoG1.repository.CategoriaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    private static final Logger LOGGER= Logger.getLogger(CategoriaService.class);
    private CategoriaRepository categoriaRepository;
    @Autowired
    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public Categoria agregarCategoria (Categoria categoria){
        LOGGER.info("Se inició el proceso de guardado, de la categoria "+ categoria.getTitulo());
        return categoriaRepository.save(categoria);
    }

    public List<Categoria> listarCategoria (){
        LOGGER.info("Se inició el proceso de listado, de categorias ");
        return categoriaRepository.findAll();
    }

    public Optional<Categoria> buscarCategoria(Long id){
        LOGGER.info("Se inició el proceso de busqueda, de la categoria con id: " + id);
        return categoriaRepository.findById(id);
    }

    public void editarCategoria (Categoria categoria){
        LOGGER.info("Se inició el proceso de edición, de la categoría "+ categoria.getTitulo());
        categoriaRepository.save(categoria);
    }

    public void eliminarCategoria (Long id) throws ResourceNotFoundException {
        Optional<Categoria> categoriaBuscada= buscarCategoria(id);
        if (categoriaBuscada.isPresent()){
            LOGGER.warn("Se eliminó la categoria con id "+ id);
            categoriaRepository.deleteById(id);
        }else {
            throw new ResourceNotFoundException("No se pudo eliminar la categoria, ya que no existe una " +
                    " con id= "+id +" en la base de datos.");
        }
    }
}
