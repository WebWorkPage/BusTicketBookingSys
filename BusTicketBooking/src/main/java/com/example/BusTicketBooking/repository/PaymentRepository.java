package com.example.BusTicketBooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.BusTicketBooking.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long>{
	List<Payment> findByUserId(Long userId);
}
