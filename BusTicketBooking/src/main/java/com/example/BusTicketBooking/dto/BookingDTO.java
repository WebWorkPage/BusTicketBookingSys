package com.example.BusTicketBooking.dto;

import jakarta.persistence.Column;

public class BookingDTO {
	
	private int busNumber;
	private String fromLoc;
	private String toLoc;
	private String userName;
	private String email;
	private Long contact;
	private int noOfTickets;
	private int ticketPrice;
	
	public BookingDTO(int busNumber, String fromLoc, String toLoc, String userName, String email, Long contact,
			int noOfTickets, int ticketPrice) {
		super();
		this.busNumber = busNumber;
		this.fromLoc = fromLoc;
		this.toLoc = toLoc;
		this.userName = userName;
		this.email = email;
		this.contact = contact;
		this.noOfTickets = noOfTickets;
		this.ticketPrice = ticketPrice;
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

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Long getContact() {
		return contact;
	}

	public void setContact(Long contact) {
		this.contact = contact;
	}

	public int getNoOfTickets() {
		return noOfTickets;
	}

	public void setNoOfTickets(int noOfTickets) {
		this.noOfTickets = noOfTickets;
	}

	public int getTicketPrice() {
		return ticketPrice;
	}

	public void setTicketPrice(int ticketPrice) {
		this.ticketPrice = ticketPrice;
	}
	
}
