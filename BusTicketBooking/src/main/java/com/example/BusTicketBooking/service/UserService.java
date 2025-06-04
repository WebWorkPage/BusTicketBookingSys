package com.example.BusTicketBooking.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.BusTicketBooking.dto.RegisterDTO;
import com.example.BusTicketBooking.model.Bus;
import com.example.BusTicketBooking.model.User;
import com.example.BusTicketBooking.repository.UserRepository;

@Service
public class UserService{
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
//	private BCryptPasswordEncoder passwordEncoder;
	
	public User saveUser(User user) { //Register user
		user.setEmail(user.getEmail());
//		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setPassword(user.getPassword());
		return userRepository.save(user);
	}
	
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}
	
	public List<User> getAllUserLists(){
		return userRepository.findAll();
	}
	
	public void removeUser(Long id) {
		if(!userRepository.existsById(id)) {
			throw new RuntimeException("User "+id+" is not found");
		}
		userRepository.deleteById(id);
	}
	
	public User getUserInfoById(Long id) {
		return userRepository.findById(id).orElseThrow(() -> new RuntimeException("user "+id+" not found") );
	}
	
	public User updateUser(Long id, RegisterDTO registerDTO) {
		return userRepository.findById(id)
				.map(user -> {
					user.setName(registerDTO.getName());
					user.setEmail(registerDTO.getEmail());
					user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
				    user.setPhoneNo(registerDTO.getPhoneNo());
				    user.setRole(registerDTO.getRole()); 
					return userRepository.save(user);
				})
				.orElseThrow(() -> new RuntimeException("User "+id+" not found"));	
	}

}
