package com.example.BusTicketBooking.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="bus")
public class Bus {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="busName")
	private String busName;
	@Column(name="busNumber")
	private int busNumber;
	@Column(name="fromLoc")
	private String fromLoc;
	@Column(name="toLoc")
	private String toLoc;
	@Column(name="ticketPrice")
	private int ticketPrice;
	@Column(name="noOfSeats")
	private int noOfSeats;
	
	public Bus() {
		super();
	}
	
	public Bus(Long id, String busName, int busNumber, String fromLoc, String toLoc, int ticketPrice, int noOfSeats) {
		super();
		this.id = id;
		this.busName = busName;
		this.busNumber = busNumber;
		this.fromLoc = fromLoc;
		this.toLoc = toLoc;
		this.ticketPrice = ticketPrice;
		this.noOfSeats = noOfSeats;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
