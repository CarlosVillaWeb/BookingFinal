package com.proyecto_Integrador.ProyectoG1.service;

import com.proyecto_Integrador.ProyectoG1.dto.CaracteristicaDTO;
import com.proyecto_Integrador.ProyectoG1.dto.ProductoDTO;
import com.proyecto_Integrador.ProyectoG1.exception.ResourceNotFoundException;
import com.proyecto_Integrador.ProyectoG1.model.*;
import com.proyecto_Integrador.ProyectoG1.repository.ProductoRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.persistence.Id;
import java.time.LocalDate;
import java.util.*;

@Service
public class ProductoService {
    private static final Logger LOGGER = Logger.getLogger(ProductoService.class);

    private ProductoRepository productoRepository;

    @Autowired
    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public Producto crearProducto(Producto producto){
        Producto productoGuardado= productoRepository.save(producto);
        return  productoGuardado;
    }

    public List<Producto> listarProductos(){
        LOGGER.info("Se inició el proceso de listado de productos ");
        return productoRepository.findAll();
    }

    public Optional<Producto> buscarProducto(Long id){
        LOGGER.info("Se inició el proceso de busqueda, del producto con id: " + id);
        return productoRepository.findById(id);
    }

//    public void editarProducto(Producto producto){
//        LOGGER.info("Se inició el proceso de edición, del producto "+ producto.getTitulo());
//        productoRepository.save(producto);
//    }

    public void editarProducto(Producto producto){
        LOGGER.info("Inicio el proceso de actualizacion del producto con id: " + producto.getId());
        productoRepository.save(producto);

    }

    public void eliminarProducto (Long id)throws ResourceNotFoundException {
        Optional<Producto> productoBuscado= buscarProducto(id);
        if (productoBuscado.isPresent()){
            LOGGER.warn("Se eliminó el producto con id "+ id);
            productoRepository.deleteById(id);
        }
        else {
            throw new ResourceNotFoundException("No se pudo eliminar el producto, ya que no existe uno " +
                    " con id= "+id +" en la base de datos.");
        }
    }

    public List<Producto> productoPorCiudad (String ciudad){
        LOGGER.info("Se inició el proceso de busqueda de producto por ciudad " + ciudad);
        return productoRepository.filtrarProductoPorCiudad(ciudad);
    }

    public List<Producto> productoPorCategoria (String  categoria){
        LOGGER.info("Se inició el proceso de busqueda de producto por categoria " + categoria);
        return productoRepository.filtrarProductoPorCategoria(categoria);
    }

    public List<Producto> productoAleatorio (){
        LOGGER.info("Se inició el proceso de busqueda de productos aleatorios ");
        return productoRepository.productosAleatorios();
    }

    public List<Producto> filtrarPorFecha(LocalDate fechaInicial, LocalDate fechaFinal){
        LOGGER.info("Se inició el proceso de busqueda de productos aleatorios ");
        return productoRepository.buscarProductosDisponiblesPorFecha(fechaInicial, fechaFinal);
    }

    public List<Producto> filtrarPorFechaYCiudad(String ciudad, LocalDate fechaInicial, LocalDate fechaFinal){
        LOGGER.info("Se inició el proceso de busqueda de productos aleatorios ");
        return productoRepository.buscarProductosDisponiblesPorCiudadYFecha(ciudad, fechaInicial, fechaFinal);
    }
}
