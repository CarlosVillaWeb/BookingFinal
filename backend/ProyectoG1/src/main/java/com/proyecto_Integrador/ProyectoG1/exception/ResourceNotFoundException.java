package com.proyecto_Integrador.ProyectoG1.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    public  ResourceNotFoundException(String mensaje){
        super(mensaje);
    }
}