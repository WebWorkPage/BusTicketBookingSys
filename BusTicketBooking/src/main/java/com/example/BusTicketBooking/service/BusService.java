package com.example.BusTicketBooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BusTicketBooking.model.Bus;
import com.example.BusTicketBooking.repository.BusRepository;

@Service
public class BusService {
	
	@Autowired
	private BusRepository busRepository;
	
	public Bus saveBus(Bus bus) {
		return busRepository.save(bus);  //in built method
	}
	
	public List<Bus> getAllBusLists(){
		return busRepository.findAll();  //in built method
	}
	
	public List<Bus> findBuses(String fromLoc, String toLoc){
		return busRepository.findByFromLocAndToLoc(fromLoc, toLoc); //custom query method
	}
	
	public Bus getBusInfoById(Long id) {
		return busRepository.findById(id).orElseThrow(() -> new RuntimeException("Bus with id "+id+" is not found") );
	}
	
	public Bus updateBus(Long id, Bus updatebus) {
		return busRepository.findById(id)
				.map(bus -> {
					bus.setBusName(updatebus.getBusName());
					bus.setBusNumber(updatebus.getBusNumber());
					bus.setFromLoc(updatebus.getFromLoc());
					bus.setToLoc(updatebus.getToLoc());
					bus.setTicketPrice(updatebus.getTicketPrice());
					bus.setNoOfSeats(updatebus.getNoOfSeats());
					return busRepository.save(bus);
				})
				.orElseThrow(() -> new RuntimeException("Bus not found"));
	}
	
	public void removeBus(Long id) {
		if(!busRepository.existsById(id)) {
			throw new RuntimeException("Bus with id "+id+" is not found");
		}
		busRepository.deleteById(id);
	}
}
