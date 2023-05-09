package com.proyecto_Integrador.ProyectoG1.service;

import com.proyecto_Integrador.ProyectoG1.exception.ResourceNotFoundException;
import com.proyecto_Integrador.ProyectoG1.model.Reserva;
import com.proyecto_Integrador.ProyectoG1.repository.ProductoRepository;
import com.proyecto_Integrador.ProyectoG1.repository.ReservaRepository;
import com.proyecto_Integrador.ProyectoG1.repository.UserRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    private static final Logger LOGGER = Logger.getLogger(ReservaService.class);

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    public ReservaService(ReservaRepository reservaRepository){
        this.reservaRepository = reservaRepository;
    }

    public Reserva crearReserva (Reserva reserva){
        LOGGER.info("Se inició la creación de la reserva " + reserva.getId());
        return reservaRepository.save(reserva);
    }

    public List<Reserva> listarReservas(){
        LOGGER.info("Inicia la búsqueda de las reservas.");
        return reservaRepository.findAll();
    }

    public Optional<Reserva> buscarReservaPorId (Long id){
        LOGGER.info("Se inicia la búsqueda de la reserva con id: " +id);
        return reservaRepository.findById(id);
    }

    public List<Reserva> buscarReservaPorProducto (String producto){
        LOGGER.info("Inicia la busqueda de reserva por el producto: " + producto);
        return reservaRepository.filtrarReservaPorProducto();
    }

    public List<Reserva> buscarReservaPorUsuario (String usuario){
        LOGGER.info("Inicia la busqueda de reserva por el usuario: " + usuario);
        return reservaRepository.filtrarReservaPorUsuario();
    }

    public List<Reserva> buscarReservaPorIdUsuario (Long idUsuario){
        LOGGER.info("Se inicia la busqueda de reserva por id de usuario: " + idUsuario);
        return reservaRepository.filtrarReservaPorIdUsuario();
    }

    public void editarReserva (Reserva reserva){
        LOGGER.info("Comienza el proceso de edición de la reserva con id: " + reserva.getId());
        reservaRepository.save(reserva);
    }

    public void eliminarReserva (Long id) throws ResourceNotFoundException{
        Optional<Reserva> reservaBuscada = buscarReservaPorId(id);
        if(reservaBuscada.isPresent()){
            LOGGER.warn("Se eliminó la reserva con id: " + id);
            reservaRepository.deleteById(id);
        }else{
            throw new ResourceNotFoundException("No se pudo eliminar la reserva con id: " + id + "pues no existe tal en la base de datos.");
        }
    }
}
