package com.example.projectmhbs.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name ="hall_id")
	private Hall hall;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name ="user_id")
	private User user;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Hall getHall() {
		return hall;
	}
	public void setHall(Hall hall) {
		this.hall = hall;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getCustomerEmail() {
		return customerEmail;
	}
	public void setCustomerEmail(String customerEmail) {
		this.customerEmail = customerEmail;
	}
	public String getCustomerPhone() {
		return customerPhone;
	}
	public void setCustomerPhone(String customerPhone) {
		this.customerPhone = customerPhone;
	}
	public LocalDate getEventDate() {
		return eventDate;
	}
	public void setEventDate(LocalDate eventDate) {
		this.eventDate = eventDate;
	}
	public String getEventType() {
		return eventType;
	}
	public void setEventType(String eventType) {
		this.eventType = eventType;
	}
	public int getNumberOfGuests() {
		return numberOfGuests;
	}
	public void setNumberOfGuests(int numberOfGuests) {
		this.numberOfGuests = numberOfGuests;
	}
	public double getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}
	public String getBookingStatus() {
		return bookingStatus;
	}
	public void setBookingStatus(String bookingStatus) {
		this.bookingStatus = bookingStatus;
	}
	public LocalDateTime getBookingDate() {
		return bookingDate;
	}
	public void setBookingDate(LocalDateTime bookingDate) {
		this.bookingDate = bookingDate;
	}
	private String customerName;
	private String customerEmail;
	private String customerPhone;
	private LocalDate eventDate;
	private String eventType;
	private int numberOfGuests;
	private double totalAmount;
	private String bookingStatus;
	private LocalDateTime bookingDate;
	
	public Booking() {}
	
	public Booking(String customerName ,
			String customerEmail, 
			String customerPhone,
			LocalDate eventDate,
			String eventType,
			 int numberOfGuests,
			 double totalAmount,
			 String bookingStatus,
			 LocalDateTime bookingDate) {
		this.setCustomerName(customerName);
		this.customerEmail = customerEmail;
		this.customerPhone = customerPhone;
		this.eventDate = eventDate;
		this.eventType = eventType;
		this.numberOfGuests = numberOfGuests;
		this.totalAmount = totalAmount;
		this.bookingStatus = bookingStatus;
		this.bookingDate = bookingDate;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	
	
	
}
