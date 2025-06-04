package com.example.BusTicketBooking.controller;

import java.util.HashMap;
import java.util.List;
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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.BusTicketBooking.dto.LoginDTO;
import com.example.BusTicketBooking.dto.RegisterDTO;
import com.example.BusTicketBooking.model.Bus;
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
	
//	@PostMapping("/register")
//	public String register(@RequestBody User user) {
//		User existingUser = userService.findByEmail(user.getEmail());
//		if(existingUser != null) {
//			return "Email already exists";
//		}
//		user.setPassword(passwordEncoder.encode(user.getPassword()));
//		userService.saveUser(user);
//		return "User registered successfully";
//	}
	
	@PostMapping("/register")
	public ResponseEntity<Map<String, String>> register(@RequestBody RegisterDTO registerDTO) {
		if(userService.findByEmail(registerDTO.getEmail()) != null) {
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body(Map.of("error", "Email already exists"));
		}
		
		User user = new User();
		user.setName(registerDTO.getName());
	    user.setEmail(registerDTO.getEmail());
	    user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
	    user.setPhoneNo(registerDTO.getPhoneNo());
	    user.setRole(registerDTO.getRole()); 
	    userService.saveUser(user);
	    
	    return ResponseEntity.status(HttpStatus.CREATED)
	            .body(Map.of("message", "User registered successfully"));
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
            
            String token = jwtUtil.generateToken(user.getEmail());
            
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("user_name", user.getName());
            response.put("user_id", user.getId().toString()); //converted Long id to String id because of Map<String, String>
            response.put("role", user.getRole());
            
            return ResponseEntity.ok(response);
        } 
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
        }
    }
	
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Logout successful! Clear JWT on client side.");
    }
    
    
    @GetMapping("/userlist")
	public List<User> getAllUser(){  //for admin
		return userService.getAllUserLists();
	}
    
    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserInfoById(id);
    }
	
	@PutMapping("/edituser/{id}")
	public User editUser(@PathVariable Long id, @RequestBody RegisterDTO registerDTO) {
		return userService.updateUser(id, registerDTO);
	}
    
    @DeleteMapping("/deleteuser/{id}")
	public String deleteUser(@PathVariable Long id) {
        userService.removeUser(id);
        return "User "+id+" deleted successfully";
    }
}

