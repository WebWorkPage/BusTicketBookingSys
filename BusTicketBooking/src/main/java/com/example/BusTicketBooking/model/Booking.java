package com.example.BusTicketBooking.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="booking")
public class Booking {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="busNumber")
	private int busNumber;
	@Column(name="fromLoc")
	private String fromLoc;
	@Column(name="toLoc")
	private String toLoc;
	@Column(name="username")
	private String userName;
	@Column(name="email")
	private String email;
	@Column(name="contact")
	private int contact;
	@Column(name="noOfTickets")
	private int noOfTickets;
	@Column(name="totalPrice")
	private int totalPrice;
	
	public Booking(Long id, int busNumber, String fromLoc, String toLoc, String userName, String email, int contact,
			int noOfTickets, int totalPrice) {
		super();
		this.id = id;
		this.busNumber = busNumber;
		this.fromLoc = fromLoc;
		this.toLoc = toLoc;
		this.userName = userName;
		this.email = email;
		this.contact = contact;
		this.noOfTickets = noOfTickets;
		this.totalPrice = totalPrice;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public int getContact() {
		return contact;
	}

	public void setContact(int contact) {
		this.contact = contact;
	}

	public int getNoOfTickets() {
		return noOfTickets;
	}

	public void setNoOfTickets(int noOfTickets) {
		this.noOfTickets = noOfTickets;
	}

	public int getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(int totalPrice) {
		this.totalPrice = totalPrice;
	}
	
}
