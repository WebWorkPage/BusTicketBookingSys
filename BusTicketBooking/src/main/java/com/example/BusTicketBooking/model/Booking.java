package com.example.BusTicketBooking.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="booking")
public class Booking {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name="user_id", nullable=false)
	private User user;
	
	@ManyToOne
	@JoinColumn(name="bus_id", nullable=false)
	private Bus bus;
	
	@Column(name="busNumber")
	private int busNumber;
	@Column(name="fromLoc")
	private String fromLoc;
	@Column(name="toLoc")
	private String toLoc;
	@Column(name="name")
	private String name;
	@Column(name="email")
	private String email;
	@Column(name="contact")
	private Long contact;
	@Column(name="noOfTickets")
	private int noOfTickets;
	@Column(name="totalPrice")
	private int totalPrice;
	
	public Booking() {
		super();
	}
	
	public Booking(Long id, User user, Bus bus, int busNumber, String fromLoc, String toLoc, String name, String email, Long contact,
			int noOfTickets, int totalPrice) {
		super();
		this.id = id;
		this.user = user;
		this.bus = bus;
		this.busNumber = busNumber;
		this.fromLoc = fromLoc;
		this.toLoc = toLoc;
		this.name = name;
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
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Bus getBus() {
		return bus;
	}

	public void setBus(Bus bus) {
		this.bus = bus;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public int getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(int totalPrice) {
		this.totalPrice = totalPrice;
	}
	
}
