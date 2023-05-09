package com.proyecto_Integrador.ProyectoG1.service;

import com.proyecto_Integrador.ProyectoG1.model.Roles;
import com.proyecto_Integrador.ProyectoG1.model.Usuarios;
import com.proyecto_Integrador.ProyectoG1.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplement implements UserService{

    private static final Logger LOGGER= Logger.getLogger(RolesService.class);

    @Autowired
    private UserRepository userRepository;
    @Autowired
    //private PasswordEncoder bcryptEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
    private PasswordEncoder bcryptEncoder;

    @Override
    public String createToken(String email) {

        Claims claims = Jwts.claims().setSubject(email);
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMs);
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    @Override
    public Usuarios saveUser(Usuarios user) {
        user.setContrasena(bcryptEncoder.encode(user.getContrasena()));

        return userRepository.save(user);
    }

    @Override
    public Usuarios updateUser(Usuarios user) {

        return userRepository.save(user);
    }

    @Override
    public Usuarios selectUser(Usuarios user) {
    return null;                //findBy(user.getEmail() && user.getPassword()));
    }

    @Override
    public Usuarios findByEmailAndPassword(String email, String contrasena) {
        Usuarios user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        System.out.println(user.getContrasena());
        boolean passwordMatches = bcryptEncoder.matches(contrasena, user.getContrasena());

        if (!passwordMatches) {
            throw new BadCredentialsException("Invalid username/password combination");
        }else {
            return userRepository.findByEmailAndPassword(email, user.getContrasena());
        }
    }

    @Override
    public List<Usuarios> getAllUsers() {
        return userRepository.findAll();
    }
    @Override
    public Optional<Usuarios> findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    @Override
    public Usuarios findByContrasena(String contrasena) {
        return userRepository.findByContrasena(contrasena);
    }

    public Optional<Usuarios> asignarUsuario(String usuarioEmail){
        LOGGER.info("Se inició el proceso de asignacion de usuario");
        return userRepository.findByEmail(usuarioEmail);
    }

}
