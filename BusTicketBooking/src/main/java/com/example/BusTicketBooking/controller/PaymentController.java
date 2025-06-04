package com.example.BusTicketBooking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.BusTicketBooking.dto.PaymentDTO;
import com.example.BusTicketBooking.model.Booking;
import com.example.BusTicketBooking.model.Payment;
import com.example.BusTicketBooking.model.User;
import com.example.BusTicketBooking.service.PaymentService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {
	@Autowired
    private PaymentService paymentService;

    @PostMapping("/payment/{userId}/{bookingId}")
    public ResponseEntity<Payment> makePayment(@PathVariable("userId") Long userId, @PathVariable("bookingId") Long bookingId, @RequestBody PaymentDTO paymentDTO) {
    	
    	User user = paymentService.getUserById(userId);
    	Booking booking = paymentService.getBookingById(bookingId);
    	
        Payment payment = new Payment();
		
		payment.setCardNumber(paymentDTO.getCardNumber());
		payment.setAmount(paymentDTO.getAmount());
		payment.setPaymentStatus("Success");  
		payment.setPaymentDate(paymentDTO.getPaymentDate());
		payment.setUser(user);
		payment.setBooking(booking);
    	
        return ResponseEntity.ok(paymentService.processPayment(payment));
    }
    
    @GetMapping("/paymentslist")
	public List<Payment> getAllBookingHistory(){  //for admin
		return paymentService.getAllPaymentLists();
	}

//    @GetMapping("/{id}")
//    public ResponseEntity<Payment> getPaymentById(@PathVariable Long id) {
//        Optional<Payment> payment = paymentService.getPaymentById(id);
//        return payment.map(ResponseEntity::ok)
//                     .orElseGet(() -> ResponseEntity.notFound().build());
//    }
    
    @GetMapping("/payment/user/{userId}")
    public ResponseEntity<List<Payment>> getPaymentsByUserId(@PathVariable Long userId) {  //for user
		List<Payment> payments = paymentService.getPaymentsByUserId(userId);
        return ResponseEntity.ok(payments);  // ResponseEntity.ok(bookingService.getBookInfoByUserId(userId));
    }

//    @GetMapping("/booking/{bookingId}")
//    public ResponseEntity<List<Payment>> getPaymentsByBookingId(@PathVariable Long bookingId) {
//        return ResponseEntity.ok(paymentService.getPaymentsByBookingId(bookingId));
//    }

}
