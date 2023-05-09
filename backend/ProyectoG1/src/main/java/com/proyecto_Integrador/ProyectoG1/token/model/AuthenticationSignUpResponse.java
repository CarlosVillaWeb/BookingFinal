package com.proyecto_Integrador.ProyectoG1.token.model;

import com.proyecto_Integrador.ProyectoG1.model.Usuarios;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class AuthenticationSignUpResponse {

    private final String jwt;
    private final Usuarios usuarios;

    private Collection<? extends GrantedAuthority> authorities;

    public AuthenticationSignUpResponse(String jwt, Usuarios usuarios, Collection<? extends GrantedAuthority> authorities) {
        this.jwt = jwt;
        this.usuarios = usuarios;
        this.authorities = authorities;
    }

    public Usuarios getUsuarios() {
        return usuarios;
    }

    public String getJwt() {
        return jwt;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
        this.authorities = authorities;
    }
}
