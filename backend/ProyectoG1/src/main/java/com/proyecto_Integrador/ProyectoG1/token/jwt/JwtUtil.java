package com.proyecto_Integrador.ProyectoG1.token.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "secret";
/*
    // Crear un objeto Map con los datos adicionales
    private Map<String, Object> additionalData = new HashMap<>();

    public Map<String, Object> getAdditionalData() {
        return additionalData;
    }

    public void setAdditionalData(String campo, Object value) {
        this.additionalData.put(campo, value);
    }
*/
    public String extractUserName(String token) {
        return extractClaimUsername(token);
    }

    public Date extractExpiration(String token) {
        return extractClaimDate(token);
    }

    public Date extractClaimDate(String token){
        Claims claims = extractAllClaims(token);
        return claims.getExpiration();
    }

    public String extractClaimUsername(String token){
        Claims claims = extractAllClaims(token);
        return claims.getSubject();
    }
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    public String generateToken(UserDetails userDetails, Map<String, Object> additionalData) {
        Map<String, Object> claims = new HashMap<>();
        claims.putAll(additionalData);
        return createToken(claims, userDetails.getUsername());
    }
    public String generateToken(Authentication authentication, Map<String, Object> additionalData) {
        Map<String, Object> claims = new HashMap<>();
        claims.putAll(additionalData);
        return createToken(claims, authentication.getName());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000000 * 60 +60 * 100))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUserName(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }



}
