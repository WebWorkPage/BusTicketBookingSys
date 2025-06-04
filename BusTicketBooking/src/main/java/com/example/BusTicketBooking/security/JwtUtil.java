package com.example.BusTicketBooking.security;

import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;

import javax.crypto.KeyGenerator;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
    //	private String secretKey = "my_secret_key";
    
//    private static String generateSecretKey() {
//        byte[] keyBytes = new byte[32]; // 256-bit key
//        new SecureRandom().nextBytes(keyBytes);
//        return Base64.getEncoder().encodeToString(keyBytes);
//    }
	
	public static String SecretKeyGenerator() throws NoSuchAlgorithmException{
	        KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
	        keyGen.init(256); // key size
	        byte[] secretKey = keyGen.generateKey().getEncoded();
	        String fixedSecretKey = Base64.getEncoder().encodeToString(secretKey);
	        System.out.println("Fixed Secret Key: " + fixedSecretKey);
	        return fixedSecretKey;
	}

    public static String generateToken(String email) throws NoSuchAlgorithmException {
        String secretKey = SecretKeyGenerator(); // Generate a new secret key
        return Jwts.builder()
            .setSubject(email)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1-day expiry   1000 * 60 * 60// 1-hr expiry
            .signWith(SignatureAlgorithm.HS256, secretKey)
            .compact();
    }
    
    public String validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(SecretKeyGenerator()).parseClaimsJws(token);
            return claims.getBody().getSubject();
        } catch (Exception e) {
            return null;
        }
    }

}