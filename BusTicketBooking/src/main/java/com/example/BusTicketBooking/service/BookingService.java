package com.example.BusTicketBooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BusTicketBooking.model.Booking;
import com.example.BusTicketBooking.model.Bus;
import com.example.BusTicketBooking.model.User;
import com.example.BusTicketBooking.repository.BookingRepository;
import com.example.BusTicketBooking.repository.BusRepository;
import com.example.BusTicketBooking.repository.UserRepository;

@Service
public class BookingService {
	
	@Autowired
	private BookingRepository bookingRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BusRepository busRepository;
	
	public Booking saveBookingDetails(Booking book) {
		return bookingRepository.save(book);
	}

	public List<Booking> getAllBookingLists() {
		return bookingRepository.findAll();
	}

	public User getUserById(Long id) { //Find User by Id to create booking with reference to User
		return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User with "+id+" is not found") );
	}
	
//	your custom repository method findByUserId(userId) returns a List<Booking>, which doesn’t have orElseThrow()
//  JpaRepository methods like findById() return an Optional<T>, allowing you to use orElseThrow()
//  Since List is always returned as an object (either empty or populated), it doesn't have the concept of being "absent" like Optional
//	If you want to throw an exception when there are no bookings for the user, you should check whether the list is empty
	public List<Booking> getBookInfoByUserId(Long userId) {
//		return bookingRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("Booking history for user is not found"));
		List<Booking> bookings = bookingRepository.findByUserId(userId);
		if(bookings.isEmpty()) {
			throw new RuntimeException("Booking history for user " + userId + " is not found");
		}
		return bookings;
	}
	
	public void deleteBooking(Long id) {
		if(!bookingRepository.existsById(id)) {
			throw new RuntimeException("Booking with id "+id+" is not found");
		}
		bookingRepository.deleteById(id);
	}

	public Bus getBusById(Long busId) { //to find available seats in the bus - so get the bus details (bus obj) by Id
		return busRepository.findById(busId).orElseThrow(() -> new RuntimeException("Bus not found"));
	}

	public void saveBusDetails(Bus bus) { //update only available seats when BookedTicket 
		busRepository.save(bus);
	}
	
}
