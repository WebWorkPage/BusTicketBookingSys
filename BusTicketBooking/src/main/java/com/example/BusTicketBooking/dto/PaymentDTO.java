package com.example.BusTicketBooking.dto;

import java.time.LocalDateTime;

import jakarta.persistence.Column;

public class PaymentDTO {
	
	private Long cardNumber;
    private Double amount;
    private LocalDateTime paymentDate;
    
	public PaymentDTO(Long cardNumber, Double amount, LocalDateTime paymentDate) {
		super();
		this.cardNumber = cardNumber;
		this.amount = amount;
		this.paymentDate = paymentDate;
	}
	
	public Long getCardNumber() {
		return cardNumber;
	}
	public void setCardNumber(Long cardNumber) {
		this.cardNumber = cardNumber;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public LocalDateTime getPaymentDate() {
		return paymentDate;
	}
	public void setPaymentDate(LocalDateTime paymentDate) {
		this.paymentDate = paymentDate;
	}
    
    
}
