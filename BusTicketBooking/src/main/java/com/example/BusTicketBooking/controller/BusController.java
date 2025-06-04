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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.BusTicketBooking.dto.BusDTO;
import com.example.BusTicketBooking.dto.RegisterDTO;
import com.example.BusTicketBooking.model.Booking;
import com.example.BusTicketBooking.model.Bus;
import com.example.BusTicketBooking.service.BusService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BusController {
	
	@Autowired
	private BusService busService;
	
	@PostMapping("/addbus")
	public ResponseEntity<Bus> addBus(@RequestBody BusDTO busDTO) {
		
		Bus bus = new Bus();
		bus.setBusName(busDTO.getBusName());
		bus.setBusNumber(busDTO.getBusNumber());
		bus.setFromLoc(busDTO.getFromLoc());
		bus.setToLoc(busDTO.getToLoc());
		bus.setTicketPrice(busDTO.getTicketPrice());
		bus.setNoOfSeats(busDTO.getNoOfSeats());
		
	    Bus busDetails = busService.saveBus(bus);
        return ResponseEntity.ok(busDetails);
	}
	
	@GetMapping("/buslist")
	public List<Bus> getAllBus(){
		return busService.getAllBusLists();
	}
	
	@PostMapping("/searchbus")
	public ResponseEntity<List<Bus>> searchBus(@RequestBody String fromLoc, String toLoc){
		List<Bus> buses = busService.findBuses(fromLoc, toLoc);
		System.out.println("Bus lists "+ buses);
		return ResponseEntity.ok(buses);
	}
	
	@GetMapping("/bus/{id}")
    public Bus getBusById(@PathVariable Long id) {
        return busService.getBusInfoById(id);
    }
	
	@PutMapping("/editbus/{id}")
	public Bus editBus(@PathVariable Long id, @RequestBody Bus updatebus) {
		return busService.updateBus(id, updatebus);
	}
	
	@DeleteMapping("/deletebus/{id}")
	public String deleteBus(@PathVariable Long id) {
        busService.removeBus(id);
        return "Bus "+id+" is deleted successfully";
    }
}
