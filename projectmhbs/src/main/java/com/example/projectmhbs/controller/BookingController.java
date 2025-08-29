package com.example.projectmhbs.controller;

import com.example.projectmhbs.entity.Booking;
import com.example.projectmhbs.dto.BookingDto;
import com.example.projectmhbs.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:4200")
public class BookingController {
    
    @Autowired
    private BookingService bookingService;

    @GetMapping
    public List<BookingDto> all() { 
        return bookingService.convertToDtoList(bookingService.getAllBookings()); 
    }

    @GetMapping("/user/{userId}")
    public List<BookingDto> userBookings(@PathVariable Long userId) {
        return bookingService.convertToDtoList(bookingService.getBookingsByUser(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingDto> getById(@PathVariable Long id) {
        Booking b = bookingService.getBookingById(id);
        return b == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(bookingService.convertToDto(b));
    }

    @PostMapping
    public Booking create(@RequestBody Booking booking) { return bookingService.createBooking(booking); }

    @PutMapping("/{id}")
    public ResponseEntity<Booking> update(@PathVariable Long id, @RequestBody Booking booking) {
        Booking updated = bookingService.updateBooking(id, booking);
        return updated == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancel(@PathVariable Long id) {
        bookingService.cancelBooking(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/hall/{hallId}")
    public List<BookingDto> byHall(@PathVariable Long hallId) {
        return bookingService.convertToDtoList(bookingService.getBookingsByHall(hallId));
    }
}
