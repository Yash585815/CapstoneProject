package com.example.projectmhbs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.projectmhbs.entity.Booking;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking , Long>{
	List<Booking> findByHallId(Long hallId);
	List<Booking> findByUserId(Long userId);
	List<Booking> findByCustomerEmail(String Email);
	List<Booking> findByEventDateBetween(LocalDate start, LocalDate end);
}
