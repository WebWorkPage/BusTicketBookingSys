package com.example.BusTicketBooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.BusTicketBooking.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
	User findByEmail(String email);
}
