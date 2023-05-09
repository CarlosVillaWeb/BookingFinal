package com.proyecto_Integrador.ProyectoG1.token.security;

import com.proyecto_Integrador.ProyectoG1.model.Usuarios;
import com.proyecto_Integrador.ProyectoG1.repository.UserRepository;
import com.proyecto_Integrador.ProyectoG1.token.jwt.JwtRequestFilter;
import com.proyecto_Integrador.ProyectoG1.token.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.*;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(email -> {
            Optional<Usuarios> user = userRepository.findByEmail(email);
            if (user.isPresent()) {
                Set<GrantedAuthority> autorizaciones = new HashSet<>();
                GrantedAuthority autorizacion = null;
                if (user.get().getRoles() != null) {
                    autorizacion = new SimpleGrantedAuthority(user.get().getRoles().getNombre());
                    autorizaciones.add(autorizacion);
                }
                return new org.springframework.security.core.userdetails.User(
                        user.get().getEmail(), user.get().getContrasena(), true, true, true,true, autorizaciones);
            } else {
                throw new UsernameNotFoundException("User not found with email: " + email);
            }
        }).passwordEncoder(new BCryptPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests()
        .antMatchers("/bienvenido.html", "/api/**","/authenticate", "/user/**", "/styles/**", "/assets/**", "/scripts/**", "/productos/random", "/producto/**", "/productos/**","/categorias/**","/caracteristicas", "/politicas", "/ciudades", "/ciudades/**", "/ciudad", "/ciudad/**","/imagenes/**", "/roles/**", "endpoint de filtro de reservas")
        .permitAll().anyRequest().authenticated()
        .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

/*
    @Bean
    public PasswordEncoder delegatingPasswordEncoder() {
        Map<String, PasswordEncoder> encoders = new HashMap<>();
        encoders.put("bcrypt", new BCryptPasswordEncoder());
        DelegatingPasswordEncoder passwordEncoder = new DelegatingPasswordEncoder("bcrypt", encoders);
        passwordEncoder.setDefaultPasswordEncoderForMatches(new BCryptPasswordEncoder());
        return passwordEncoder;
    }*/
    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

}
