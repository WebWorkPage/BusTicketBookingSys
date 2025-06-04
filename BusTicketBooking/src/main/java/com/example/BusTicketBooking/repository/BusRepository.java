package com.example.BusTicketBooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.BusTicketBooking.model.Bus;


public interface BusRepository extends JpaRepository<Bus, Long>{
	//custom query methods - converts the method name into sql query
	List<Bus> findByFromLocAndToLoc(String fromLoc, String toLoc);
}
