package com.example.projectmhbs.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "halls")
public class Hall {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getCapacity() {
		return capacity;
	}

	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public double getPricePerDay() {
		return pricePerDay;
	}

	public void setPricePerDay(double pricePerDay) {
		this.pricePerDay = pricePerDay;
	}

	public String getAmenities() {
		return amenities;
	}

	public void setAmenities(String amenities) {
		this.amenities = amenities;
	}

	public boolean isAvailable() {
		return available;
	}

	public void setAvailable(boolean available) {
		this.available = available;
	}

	private int capacity;
	private String location;
	private double pricePerDay;
	private String amenities;
	private boolean available=true;
	
	public Hall() {}
	
	public Hall(String name,
			int capacity,
			String location,
			double pricePerDay,
			String amenities,
			boolean available) {
		this.name = name;
		this.capacity = capacity;
		this.location = location;
		this.pricePerDay = pricePerDay;
		this.amenities = amenities;
		this.available = available;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	

}
