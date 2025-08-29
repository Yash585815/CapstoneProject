package com.example.projectmhbs.service;

import com.example.projectmhbs.entity.Booking;
import com.example.projectmhbs.dto.BookingDto;
import com.example.projectmhbs.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }
    
    public Booking createBooking(Booking booking) {
        booking.setBookingDate(LocalDateTime.now());
        booking.setBookingStatus("CONFIRMED");
        return bookingRepository.save(booking);
    }
    
    public Booking updateBooking(Long id, Booking booking) {
        Optional<Booking> existing = bookingRepository.findById(id);
        if (existing.isPresent()) {
            Booking existingBooking = existing.get();
            existingBooking.setCustomerName(booking.getCustomerName());
            existingBooking.setCustomerEmail(booking.getCustomerEmail());
            existingBooking.setCustomerPhone(booking.getCustomerPhone());
            existingBooking.setEventDate(booking.getEventDate());
            existingBooking.setEventType(booking.getEventType());
            existingBooking.setNumberOfGuests(booking.getNumberOfGuests());
            existingBooking.setTotalAmount(booking.getTotalAmount());
            existingBooking.setBookingStatus(booking.getBookingStatus());
            return bookingRepository.save(existingBooking);
        }
        return null;
    }
    
    public void cancelBooking(Long id) {
        bookingRepository.deleteById(id);
    }
    
    public List<Booking> getBookingsByHall(Long hallId) {
        return bookingRepository.findByHallId(hallId);
    }
    
    public List<Booking> getBookingsByUser(Long userId) {
        return bookingRepository.findByUserId(userId);
    }
    
    public List<Booking> getBookingsByCustomerEmail(String email) {
        return bookingRepository.findByCustomerEmail(email);
    }
    
    public BookingDto convertToDto(Booking booking) {
        return new BookingDto(booking.getId(), 
                             booking.getHall() != null ? booking.getHall().getId() : null,
                             booking.getHall() != null ? booking.getHall().getName() : null,
                             booking.getUser() != null ? booking.getUser().getId() : null,
                             booking.getCustomerName(), booking.getCustomerEmail(), 
                             booking.getCustomerPhone(), booking.getEventDate(), 
                             booking.getEventType(), booking.getNumberOfGuests(), 
                             booking.getTotalAmount(), booking.getBookingStatus(), 
                             booking.getBookingDate());
    }
    
    public List<BookingDto> convertToDtoList(List<Booking> bookings) {
        return bookings.stream().map(this::convertToDto).collect(Collectors.toList());
    }
}
