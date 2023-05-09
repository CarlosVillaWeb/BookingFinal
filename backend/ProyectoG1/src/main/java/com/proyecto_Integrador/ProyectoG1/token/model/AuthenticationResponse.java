package com.proyecto_Integrador.ProyectoG1.token.model;

import com.proyecto_Integrador.ProyectoG1.model.Usuarios;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class AuthenticationResponse {

    private final String jwt;
    private final String email;
    private Collection<? extends GrantedAuthority> authorities;

    public AuthenticationResponse(String jwt, String email, Collection<? extends GrantedAuthority> authorities) {
        this.jwt = jwt;
        this.email = email;
        this.authorities = authorities;
    }


    public String getJwt() {
        return jwt;
    }

    public String getEmail() {
        return email;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
        this.authorities = authorities;
    }
}
