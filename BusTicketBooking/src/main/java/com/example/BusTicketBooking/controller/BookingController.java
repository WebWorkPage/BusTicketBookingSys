package com.example.BusTicketBooking.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.BusTicketBooking.dto.BookingDTO;
import com.example.BusTicketBooking.model.Booking;
import com.example.BusTicketBooking.model.Bus;
import com.example.BusTicketBooking.model.User;
import com.example.BusTicketBooking.service.BookingService;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {
	
	@Autowired
	private BookingService bookingService;
	
	@PostMapping("/bookbus/{busId}/{userId}")
	public ResponseEntity<Booking> createBooking(@PathVariable("busId") Long busId, @PathVariable("userId") Long userId, @RequestBody BookingDTO bookingDTO) {
		
		User user = bookingService.getUserById(userId);  //Find the user from User table by Id to create booking with reference to User(ie to create a column with user_id from user table when new booking row is created)
		Bus bus = bookingService.getBusById(busId); //Bus reference is added for updating available seats in DB when booked
				
		Booking book = new Booking();
		
		book.setUser(user);
		book.setBus(bus);
		book.setBusNumber(bookingDTO.getBusNumber());
		book.setFromLoc(bookingDTO.getFromLoc());
		book.setToLoc(bookingDTO.getToLoc());
		book.setName(bookingDTO.getUserName());
		book.setEmail(bookingDTO.getEmail());
		book.setContact(bookingDTO.getContact());
		book.setNoOfTickets(bookingDTO.getNoOfTickets());
		book.setTotalPrice(bookingDTO.getTicketPrice() * bookingDTO.getNoOfTickets());
		
		//After Booked, reduce the available seats based on Tickets booked
		bus.setNoOfSeats(bus.getNoOfSeats() - bookingDTO.getNoOfTickets());
		bookingService.saveBusDetails(bus);
		
	    Booking booking = bookingService.saveBookingDetails(book);
        return ResponseEntity.ok(booking);
//	    return ResponseEntity.status(HttpStatus.CREATED)
//	            .body(Map.of("message", "Bus booked successfully"));
	}
	
	@GetMapping("/bookinghistory")
	public List<Booking> getAllBookingHistory(){  //for admin
		return bookingService.getAllBookingLists();
	}
	
	@GetMapping("/bookinghistory/user/{userId}")
    public ResponseEntity<List<Booking>> getBookingHistoryByUserId(@PathVariable Long userId) {  //for user
		List<Booking> bookings = bookingService.getBookInfoByUserId(userId);
        return ResponseEntity.ok(bookings);  // ResponseEntity.ok(bookingService.getBookInfoByUserId(userId));
    }
	
	@DeleteMapping("/cancelbooking/{id}")
	public String cancelBooking(@PathVariable Long id) {
		bookingService.deleteBooking(id);
        return "Booking Id "+id+" is cancelled successfully";
    }
}
