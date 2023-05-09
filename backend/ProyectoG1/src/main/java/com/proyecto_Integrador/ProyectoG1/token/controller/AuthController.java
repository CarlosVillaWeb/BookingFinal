package com.proyecto_Integrador.ProyectoG1.token.controller;

import com.proyecto_Integrador.ProyectoG1.model.Usuarios;
import com.proyecto_Integrador.ProyectoG1.repository.UserRepository;
import com.proyecto_Integrador.ProyectoG1.service.UserService;
import com.proyecto_Integrador.ProyectoG1.service.UserServiceImplement;
import com.proyecto_Integrador.ProyectoG1.token.jwt.JwtUtil;
import com.proyecto_Integrador.ProyectoG1.token.model.AuthenticationRequest;
import com.proyecto_Integrador.ProyectoG1.token.model.AuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthenticationRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        Usuarios usuarioCargado = userService.findByEmailAndPassword(loginRequest.getUsername(),loginRequest.getPassword());

        // Crear un objeto Map con los datos adicionales
        Map<String, Object> additionalData = new HashMap<>();
        additionalData.put("nombre", usuarioCargado.getNombre());
        additionalData.put("apellido", usuarioCargado.getApellido());
        System.out.println(usuarioCargado.getNombre());
        System.out.println(usuarioCargado.getContrasena());

        String jwt = jwtUtils.generateToken(authentication, additionalData);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        return ResponseEntity.ok(new AuthenticationResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities()));
    }
}
