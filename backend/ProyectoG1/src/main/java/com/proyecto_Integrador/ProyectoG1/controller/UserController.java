package com.proyecto_Integrador.ProyectoG1.controller;

import com.proyecto_Integrador.ProyectoG1.exception.ResourceNotFoundException;
import com.proyecto_Integrador.ProyectoG1.model.Roles;
import com.proyecto_Integrador.ProyectoG1.model.Usuarios;
import com.proyecto_Integrador.ProyectoG1.service.RolesService;
import com.proyecto_Integrador.ProyectoG1.service.UserService;
import com.proyecto_Integrador.ProyectoG1.token.jwt.JwtUtil;
import com.proyecto_Integrador.ProyectoG1.token.model.AuthenticationRequest;
import com.proyecto_Integrador.ProyectoG1.token.model.AuthenticationResponse;
import com.proyecto_Integrador.ProyectoG1.token.model.AuthenticationSignUpResponse;
import com.proyecto_Integrador.ProyectoG1.token.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RolesService rolesService;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private JwtUtil jwtUtils;

    @PostMapping(value = "/signUp")
    public ResponseEntity<?> addUser(@Validated @RequestBody Usuarios user) {
        try{
            System.out.println(user.getRoles() + "Mira AQUI");

            Roles roles = rolesService.asignarRol((Roles)user.getRoles()).orElseThrow(() -> new ResourceNotFoundException("Rol no encontrado"));
            System.out.println(roles.getId());
            System.out.println(user.getContrasena());
            String userPassword = user.getContrasena();
            Usuarios savedUser = userService.saveUser(user);

            try {
                try {
                    Thread.sleep(1000); // espera 5 segundos (5000 milisegundos)
                } catch (InterruptedException e) {
                    // manejo de excepciones
                }

                 Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(user.getEmail(), userPassword));

                SecurityContextHolder.getContext().setAuthentication(authentication);

                // Crear un objeto Map con los datos adicionales
                Map<String, Object> additionalData = new HashMap<>();
                additionalData.put("id", savedUser.getId());
                additionalData.put("nombre", savedUser.getNombre());
                additionalData.put("apellido", savedUser.getApellido());
                additionalData.put("ciudad", savedUser.getCiudad());
                additionalData.put("email", savedUser.getEmail());
                additionalData.put("roles", savedUser.getRoles());
                System.out.println(savedUser.getNombre());
                System.out.println(savedUser.getContrasena());

                String jwt = jwtUtils.generateToken(authentication, additionalData);
                UserDetails userDetails = (UserDetails) authentication.getPrincipal();

                URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                        .path("/{id}")
                        .buildAndExpand(savedUser.getId())
                        .toUri();

                return ResponseEntity.status(HttpStatus.CREATED).body(new AuthenticationSignUpResponse(jwt, savedUser, userDetails.getAuthorities()));


            } catch (Exception exception){
                System.out.println(user.getEmail());

                System.out.println(user.getNombre());
                System.out.println(user.getContrasena());

                exception.printStackTrace();
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se pudo autenticar el usuario registrado. Lamentablemente no ha podido registrarse. Por favor intente más tarde.");

            }
        } catch (Exception e){
            e.printStackTrace();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Lamentablemente no ha podido registrarse. Por favor intente más tarde.");

        }

    }
/*
    @PostMapping(value = "/signUp")
    public ResponseEntity<Usuarios> addUser(@RequestBody Usuarios user) {
        Roles roles = rolesService.asignarRol((Roles)user.getRoles()).orElseThrow(() -> new ResourceNotFoundException("Rol no encontrado"));
        System.out.println(roles);
        Usuarios savedUser = userService.saveUser(user);
        System.out.println("New User is Added");
        return ResponseEntity.ok(savedUser);
    }
*/
    @PostMapping("/logIn")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthenticationRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            Usuarios usuarioCargado = userService.findByEmailAndPassword(loginRequest.getUsername(), loginRequest.getPassword());
            System.out.println(usuarioCargado.getRoles());

            // Crear un objeto Map con los datos adicionales
            Map<String, Object> additionalData = new HashMap<>();
            additionalData.put("id", usuarioCargado.getId());
            additionalData.put("nombre", usuarioCargado.getNombre());
            additionalData.put("apellido", usuarioCargado.getApellido());
            additionalData.put("ciudad", usuarioCargado.getCiudad());
            additionalData.put("email", usuarioCargado.getEmail());
            additionalData.put("roles", usuarioCargado.getRoles());
            System.out.println(usuarioCargado.getNombre());
            System.out.println(usuarioCargado.getContrasena());

            String jwt = jwtUtils.generateToken(authentication, additionalData);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            return ResponseEntity.ok(new AuthenticationResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities()));
        } catch (Exception exception){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Lamentablemente no ha podido iniciar sesión. Por favor intente más tarde");

        }
    }
/*
    @PostMapping(value = "/logIn")
    public ResponseEntity<AuthenticationResponse> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception{
        Usuarios usuarioCargado = userService.findByEmailAndPassword(authenticationRequest.getUsername(),authenticationRequest.getPassword());

        // Crear un objeto Map con los datos adicionales
        Map<String, Object> additionalData = new HashMap<>();
        additionalData.put("nombre", usuarioCargado.getNombre());
        additionalData.put("apellido", usuarioCargado.getApellido());
        System.out.println(usuarioCargado.getNombre());
        System.out.println(usuarioCargado.getContrasena());

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), usuarioCargado.getContrasena()));

//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        }catch (BadCredentialsException e) {
            throw new Exception("Incorrect", e);
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(usuarioCargado.getEmail());

        final String jwt = jwtUtil.generateToken(userDetails, additionalData);

        return ResponseEntity.ok(new AuthenticationResponse((jwt)));


    }*/

}
