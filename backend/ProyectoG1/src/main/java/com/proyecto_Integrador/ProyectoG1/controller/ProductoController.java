package com.proyecto_Integrador.ProyectoG1.controller;

import com.proyecto_Integrador.ProyectoG1.dto.ProductoDTO;
import com.proyecto_Integrador.ProyectoG1.exception.ResourceNotFoundException;
import com.proyecto_Integrador.ProyectoG1.model.*;
import com.proyecto_Integrador.ProyectoG1.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/productos")
@CrossOrigin
public class ProductoController {


    private ProductoService productoService;
    private CategoriaService categoriaService;
    private UbicacionService ubicacionService;
    private ImagenService imagenService;
    private CaracteristicaService caracteristicaService;
    private PoliticaService politicaService;

    @Autowired
    public ProductoController(ProductoService productoService, CategoriaService categoriaService, UbicacionService ubicacionService, ImagenService imagenService, CaracteristicaService caracteristicaService, PoliticaService politicaService) {
        this.productoService = productoService;
        this.categoriaService = categoriaService;
        this.ubicacionService = ubicacionService;
        this.imagenService = imagenService;
        this.caracteristicaService = caracteristicaService;
        this.politicaService = politicaService;
    }
// VERSION VIEJA
//    @PostMapping
//    public ResponseEntity<Producto> agregarProducto(@RequestBody Producto producto){
//        return ResponseEntity.ok(productoService.crearProducto(producto));
//    }

    @PostMapping
    public ResponseEntity<Producto> agregarProducto(@RequestBody ProductoDTO productoDTO) {
        try {
            Optional<Categoria> categoriaBuscada = categoriaService.buscarCategoria(productoDTO.getCategoria_id());
            Optional<Ubicacion> ubicacionBuscada = ubicacionService.buscarUbicacion(productoDTO.getUbicacion_id());
            Set<Imagen> imagenSet = new HashSet<>();
            Set<Caracteristica> caracteristicaSet = new HashSet<>();
            Set<Politica> politicaSet = new HashSet<>();

            // RECORRE LA LISTA DE IMAGENES Y LAS ASIGNA
            for (Imagen imagen : productoDTO.getImagenes()
            ) {
                Optional<Imagen> imagenBuscada = imagenService.filtroPorUrl(imagen.getUrl());

                imagenSet.add(imagenBuscada.get());
            }

            // RECORRE LA LISTA DE CARACTERISTICAS Y LAS ASIGNA
            for (Caracteristica caracteristica : productoDTO.getCaracteristicas()
            ) {
                Optional<Caracteristica> caracteristicaBuscada = caracteristicaService.buscarCaracteristica(caracteristica.getId());

                caracteristicaSet.add(caracteristicaBuscada.get());
            }

            // RECORRE LA LISTA DE POLITICAS Y LAS ASIGNA
            for (Politica politica : productoDTO.getPoliticas()
            ) {
                Optional<Politica> politicaBuscada = politicaService.buscarPolitica(politica.getId());

                politicaSet.add(politicaBuscada.get());
            }

            Producto producto = new Producto(productoDTO.getTitulo(),
                    productoDTO.getDescripcion(),
                    productoDTO.getDireccion(),
                    productoDTO.getCalificacion(),
                    productoDTO.getPrecio()
            );
            producto.setImagenes(imagenSet);
            producto.setPoliticas(politicaSet);
            producto.setCaracteristicas(caracteristicaSet);

            producto.setCategoria(categoriaBuscada.get());
            producto.setUbicacion(ubicacionBuscada.get());

//       Optional<Caracteristica> caracteristicaBuscada = caracteristicaService.buscarCaracteristica();
//        Optional<Politica> politicaBuscada = politicaService.buscarPolitica()
            if (categoriaBuscada.isPresent() &&
                    ubicacionBuscada.isPresent() &&
                    !imagenSet.isEmpty() &&
                    !caracteristicaSet.isEmpty() &&
                    !politicaSet.isEmpty()) {
                return ResponseEntity.ok(productoService.crearProducto(producto));
            } else {
                return ResponseEntity.badRequest().build();
//                    ("No se puede registrar el producto, revise si los demás atributos fueron registrados antes");
            }
        } catch (Exception exception){

                exception.printStackTrace();
                return ResponseEntity.badRequest().build();

            }

    }

    @GetMapping
    public ResponseEntity<List<Producto>> listarProductos(){
        return ResponseEntity.ok(productoService.listarProductos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> buscarProducto(@PathVariable Long id){
        Optional<Producto> productoBuscado= productoService.buscarProducto(id);
        if (productoBuscado.isPresent()){
            return ResponseEntity.ok(productoBuscado.get());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
//  VERSION VIEJA
//    @PutMapping
//    public ResponseEntity<String> modificarProducto(@RequestBody Producto producto){
//        Optional<Producto> productoBuscado = productoService.buscarProducto(producto.getId());
//        if (productoBuscado.isPresent()){
//            productoService.editarProducto(producto);
//            return ResponseEntity.ok("Se actualizó el producto con id "+ producto.getId());
//        }
//        else {
//            return ResponseEntity.badRequest().body("No se pudo actualizar el producto con id= " + producto.getId() +
//                    " ya que el mismo no existe en la base de datos.");
//        }
//    }
    @PutMapping
    public ResponseEntity<String> modificarProducto(@RequestBody ProductoDTO productoDTO) {
        Optional<Producto> productoSeleccionado = productoService.buscarProducto(productoDTO.getId());
        if (productoSeleccionado.isPresent()) {
            Optional<Categoria> categoriaBuscada = categoriaService.buscarCategoria(productoDTO.getCategoria_id());
            Optional<Ubicacion> ubicacionBuscada = ubicacionService.buscarUbicacion(productoDTO.getUbicacion_id());
            Set<Imagen> imagenSet = new HashSet<>();
            Set<Caracteristica> caracteristicaSet = new HashSet<>();
            Set<Politica> politicaSet = new HashSet<>();

            // RECORRE LA LISTA DE IMAGENES Y LAS ASIGNA
            for (Imagen imagen : productoDTO.getImagenes()
            ) {
                Optional<Imagen> imagenBuscada = imagenService.filtroPorUrl(imagen.getUrl());

                imagenSet.add(imagenBuscada.get());
            }

            // RECORRE LA LISTA DE CARACTERISTICAS Y LAS ASIGNA
            for (Caracteristica caracteristica : productoDTO.getCaracteristicas()
            ) {
                Optional<Caracteristica> caracteristicaBuscada = caracteristicaService.buscarCaracteristica(caracteristica.getId());

                caracteristicaSet.add(caracteristicaBuscada.get());
            }

            // RECORRE LA LISTA DE POLITICAS Y LAS ASIGNA
            for (Politica politica : productoDTO.getPoliticas()
            ) {
                Optional<Politica> politicaBuscada = politicaService.buscarPolitica(politica.getId());

                politicaSet.add(politicaBuscada.get());
            }

            Producto producto = new Producto(productoDTO.getTitulo(),
                    productoDTO.getDescripcion(),
                    productoDTO.getDireccion(),
                    productoDTO.getCalificacion(),
                    productoDTO.getPrecio()
            );
            producto.setImagenes(imagenSet);
            producto.setPoliticas(politicaSet);
            producto.setCaracteristicas(caracteristicaSet);

            producto.setCategoria(categoriaBuscada.get());
            producto.setUbicacion(ubicacionBuscada.get());

            if (categoriaBuscada.isPresent() &&
                    ubicacionBuscada.isPresent() &&
                    !imagenSet.isEmpty() &&
                    !caracteristicaSet.isEmpty() &&
                    !politicaSet.isEmpty()) {
                productoService.editarProducto(producto);
                return ResponseEntity.ok("Se actualizó el producto con id " + productoDTO.getId());

            } else {
                return ResponseEntity.badRequest().build();
            }
        }else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarProducto(@PathVariable Long id) throws ResourceNotFoundException {
        productoService.eliminarProducto(id);
        return ResponseEntity.ok("Se eliminó el producto con id "+ id);
    }


    @GetMapping("/ciudad/{ciudad}")
    public ResponseEntity<List<Producto>> productoPorCiudad (@PathVariable String ciudad){
        List<Producto> buscarProducto= productoService.productoPorCiudad(ciudad);
        return ResponseEntity.ok(buscarProducto);
    }

    @GetMapping("/categoria/{categoria}")
    public  ResponseEntity<List<Producto>> productoPorCategoria(@PathVariable String categoria){
        List<Producto> productoBuscado= productoService.productoPorCategoria(categoria);
        return ResponseEntity.ok(productoBuscado);
    }

    @GetMapping("/random")
    public ResponseEntity<List<Producto>> productosRandom (){
        List<Producto> productoBuscado= productoService.productoAleatorio();
        return ResponseEntity.ok(productoBuscado);
    }

    @GetMapping("/ciudad/{ciudad}/fechainicial/{fechaInicialDeLaReserva}/fechafinal/{fechaFinalDeLaReserva}")

    public ResponseEntity<List <Producto>> filtrarPorFechaYCiudad(@PathVariable String ciudad,
                                                                  @PathVariable String fechaInicialDeLaReserva,
                                                                  @PathVariable String fechaFinalDeLaReserva){
        LocalDate fechaInicial1 = java.time.LocalDate.parse(fechaInicialDeLaReserva);
        LocalDate fechaFinal1 = java.time.LocalDate.parse(fechaFinalDeLaReserva);
        List<Producto> filtroBuscado = productoService.filtrarPorFechaYCiudad(ciudad, fechaInicial1,
                fechaFinal1);
        return  ResponseEntity.ok(filtroBuscado);
    }

    @GetMapping("/fechainicial/{fechaInicialDeLaReserva}/fechafinal/{fechaFinalDeLaReserva}")

public ResponseEntity<List <Producto>> filtrarPorFecha(@PathVariable String fechaInicialDeLaReserva,
                                                       @PathVariable String fechaFinalDeLaReserva){
        LocalDate fechaInicial1 = java.time.LocalDate.parse(fechaInicialDeLaReserva);
        LocalDate fechaFinal1 = java.time.LocalDate.parse(fechaFinalDeLaReserva);
        List<Producto> filtroBuscado = productoService.filtrarPorFecha(fechaInicial1,
                fechaFinal1);
        return  ResponseEntity.ok(filtroBuscado);
    }

}
