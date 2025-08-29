package com.example.projectmhbs.config;

import com.example.projectmhbs.entity.Booking;
import com.example.projectmhbs.entity.Hall;
import com.example.projectmhbs.entity.User;
import com.example.projectmhbs.repository.BookingRepository;
import com.example.projectmhbs.repository.HallRepository;
import com.example.projectmhbs.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seed(UserRepository userRepository, HallRepository hallRepository, BookingRepository bookingRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                User admin = new User("admin", "admin@example.com", "admin123", "ADMIN", "Admin", "User", "9999999999", LocalDateTime.now(), true);
                User user = new User("user", "user@example.com", "user123", "USER", "Normal", "User", "8888888888", LocalDateTime.now(), true);
                userRepository.save(admin);
                userRepository.save(user);
            }

            if (hallRepository.count() == 0) {
                Hall h1 = new Hall("Royal Banquet", 300, "Downtown", 15000.0, "AC,Projector,Parking", true);
                Hall h2 = new Hall("Garden View", 150, "Uptown", 9000.0, "Garden,AC,Stage", true);
                hallRepository.save(h1);
                hallRepository.save(h2);

                Booking b = new Booking();
                b.setHall(h1);
                User u = userRepository.findByUsername("user").orElse(null);
                b.setUser(u);
                b.setCustomerName("Alice");
                b.setCustomerEmail("alice@example.com");
                b.setCustomerPhone("7777777777");
                b.setEventDate(LocalDate.now().plusDays(15));
                b.setEventType("Wedding");
                b.setNumberOfGuests(200);
                b.setTotalAmount(15000.0);
                b.setBookingStatus("CONFIRMED");
                b.setBookingDate(LocalDateTime.now());
                bookingRepository.save(b);
            }
        };
    }
}