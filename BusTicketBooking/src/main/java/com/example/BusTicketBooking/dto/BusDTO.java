package com.example.BusTicketBooking.dto;

import jakarta.persistence.Column;

public class BusDTO {
	
	private String busName;
	private int busNumber;
	private String fromLoc;
	private String toLoc;
	private int ticketPrice;
	private int noOfSeats;
	
	public BusDTO(String busName, int busNumber, String fromLoc, String toLoc, int ticketPrice, int noOfSeats) {
		super();
		this.busName = busName;
		this.busNumber = busNumber;
		this.fromLoc = fromLoc;
		this.toLoc = toLoc;
		this.ticketPrice = ticketPrice;
		this.noOfSeats = noOfSeats;
	}
	public String getBusName() {
		return busName;
	}
	public void setBusName(String busName) {
		this.busName = busName;
	}
	public int getBusNumber() {
		return busNumber;
	}
	public void setBusNumber(int busNumber) {
		this.busNumber = busNumber;
	}
	public String getFromLoc() {
		return fromLoc;
	}
	public void setFromLoc(String fromLoc) {
		this.fromLoc = fromLoc;
	}
	public String getToLoc() {
		return toLoc;
	}
	public void setToLoc(String toLoc) {
		this.toLoc = toLoc;
	}
	public int getTicketPrice() {
		return ticketPrice;
	}
	public void setTicketPrice(int ticketPrice) {
		this.ticketPrice = ticketPrice;
	}
	public int getNoOfSeats() {
		return noOfSeats;
	}
	public void setNoOfSeats(int noOfSeats) {
		this.noOfSeats = noOfSeats;
	}
	
	
}
