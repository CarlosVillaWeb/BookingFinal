package com.proyecto_Integrador.ProyectoG1.token.service;

import com.proyecto_Integrador.ProyectoG1.model.Roles;
import com.proyecto_Integrador.ProyectoG1.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class AuthenticationService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Optional<com.proyecto_Integrador.ProyectoG1.model.Usuarios> user = userRepository.findByEmail(userName);

        String password = user.get().getContrasena();
        System.out.println(user.get().getContrasena().substring(7) + " NO DA ESTA VAINA");


        Set<GrantedAuthority> autorizaciones = new HashSet<>();
        GrantedAuthority autorizacion = null;
        if (user.get().getRoles() != null) {
            autorizacion = new SimpleGrantedAuthority(user.get().getRoles().getNombre());
            autorizaciones.add(autorizacion);
        }
        User userDetail = new User(user.get().getEmail(), "{bcrypt}" + password.substring(8),true, true, true,true, autorizaciones);
        return userDetail;
    }


}
