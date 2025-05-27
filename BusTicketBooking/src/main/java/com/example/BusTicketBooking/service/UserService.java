package com.example.BusTicketBooking.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}
	
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}
	
}
