package com.proyecto_Integrador.ProyectoG1.service;

import com.proyecto_Integrador.ProyectoG1.exception.ResourceNotFoundException;
import com.proyecto_Integrador.ProyectoG1.model.Roles;
import com.proyecto_Integrador.ProyectoG1.repository.RolesRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RolesService {

    private static final Logger LOGGER= Logger.getLogger(RolesService.class);
    private RolesRepository rolesRepository;
    @Autowired
    public RolesService(RolesRepository rolesRepository) {
        this.rolesRepository = rolesRepository;
    }

    public Roles agregarRol (Roles rol){
        LOGGER.info("Se inició el proceso de guardado, del rol "+ rol.getNombre());
        return rolesRepository.save(rol);
    }

    public List<Roles> listarRoles (){
        LOGGER.info("Se inició el proceso de listado, de roles ");
        return rolesRepository.findAll();
    }

    public Optional<Roles> buscarRol(Long id){
        LOGGER.info("Se inició el proceso de busqueda, del rol con id: " + id);
        return rolesRepository.findById(id);
    }

    public Optional<Roles> asignarRol(Roles roles){
        LOGGER.info("Se inició el proceso de asignacion de rol");
        return rolesRepository.findById(roles.getId());
    }

    public void editarRol (Roles rol){
        LOGGER.info("Se inició el proceso de edición, del rol "+ rol.getNombre());
        rolesRepository.save(rol);
    }

    public void eliminarRol (Long id) throws ResourceNotFoundException {
        Optional<Roles> rolBuscado = buscarRol(id);
        if (rolBuscado.isPresent()){
            LOGGER.warn("Se eliminó el rol con id "+ id);
            rolesRepository.deleteById(id);
        }else {
            throw new ResourceNotFoundException("No se pudo eliminar el rol, ya que no existe uno " +
                    " con id= "+id +" en la base de datos.");
        }
    }
}
