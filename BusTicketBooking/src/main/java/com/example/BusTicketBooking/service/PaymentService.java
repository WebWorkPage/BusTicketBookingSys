package com.example.BusTicketBooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BusTicketBooking.model.Booking;
import com.example.BusTicketBooking.model.Payment;
import com.example.BusTicketBooking.model.User;
import com.example.BusTicketBooking.repository.BookingRepository;
import com.example.BusTicketBooking.repository.PaymentRepository;
import com.example.BusTicketBooking.repository.UserRepository;

@Service
public class PaymentService {
	
	@Autowired
	private PaymentRepository paymentRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BookingRepository bookingRepository;

	public User getUserById(Long Id) {
		return userRepository.findById(Id).orElseThrow(() -> new RuntimeException("User with "+Id+" is not found") );
	}

	public Booking getBookingById(Long Id) {
		return bookingRepository.findById(Id).orElseThrow(() -> new RuntimeException("Booking with "+Id+" is not found") );
	}

	public Payment processPayment(Payment payment) {
		return paymentRepository.save(payment);
	}

	public List<Payment> getAllPaymentLists() {
		return paymentRepository.findAll();
	}

	public List<Payment> getPaymentsByUserId(Long userId) {
		List<Payment> payments = paymentRepository.findByUserId(userId);
		if(payments.isEmpty()) {
			throw new RuntimeException("Payment for user " + userId + " is not found");
		}
		return payments;
	}

}
