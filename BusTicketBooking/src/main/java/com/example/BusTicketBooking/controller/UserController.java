package com.example.BusTicketBooking.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.BusTicketBooking.dto.LoginDTO;
import com.example.BusTicketBooking.model.User;
import com.example.BusTicketBooking.security.JwtUtil;
import com.example.BusTicketBooking.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	private final UserService userService;
	private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;
	
	@Autowired
	public UserController(UserService userService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager,JwtUtil jwtUtil) {
	    this.userService = userService;
	    this.passwordEncoder = passwordEncoder;
	    this.authenticationManager = authenticationManager;
	    this.jwtUtil = jwtUtil;
	}
	
	@PostMapping("/register")
	public String register(@RequestBody User user) {
		User existingUser = userService.findByEmail(user.getEmail());
		if(existingUser != null) {
			return "Email already exists";
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userService.saveUser(user);
		return "User registered successfully";
	}
	
//	@PostMapping("/page/login")
//	public String loginUser(@RequestBody User user) {
//		User existingUser  = userService.findByEmail(user.getEmail());
//		if(existingUser != null && passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
//			return "Login successful "+ existingUser.getRole();
//		}
//		else {
//			return "Invalid credentials";
//		}
//	}
	@PostMapping("/page/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginDTO userDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDTO.getEmail(), userDTO.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            User user = userService.findByEmail(userDTO.getEmail());
            System.out.println("login user -----------"+user.toString());
            String token = jwtUtil.generateToken(user.getName());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("user", user.getName());
            response.put("role", user.getRole());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
        }
    }
	
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Logout successful! Clear JWT on client side.");
    }
}
