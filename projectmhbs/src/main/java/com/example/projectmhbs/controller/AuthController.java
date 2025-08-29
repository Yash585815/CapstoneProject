package com.example.projectmhbs.controller;

import com.example.projectmhbs.entity.User;
import com.example.projectmhbs.dto.LoginRequest;
import com.example.projectmhbs.dto.LoginResponse;
import com.example.projectmhbs.dto.UserDto;
import com.example.projectmhbs.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // Check if user already exists
        if (userService.getUserByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest()
                .body(new LoginResponse(false, "Username already exists"));
        }
        if (userService.getUserByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest()
                .body(new LoginResponse(false, "Email already exists"));
        }
        
        user.setCreatedDate(LocalDateTime.now());
        user.setEnabled(true);
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }
        
        User created = userService.registerUser(user);
        UserDto userDto = userService.convertToDto(created);
        
        return ResponseEntity.ok(new LoginResponse(created.getId(), created.getUsername(), 
                                                  created.getEmail(), created.getRole(),
                                                  created.getFirstName(), created.getLastName(),
                                                  true, "Registration successful"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = userService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());
        
        if (user == null) {
            return ResponseEntity.badRequest()
                .body(new LoginResponse(false, "Invalid username or password"));
        }
        
        if (!user.isEnabled()) {
            return ResponseEntity.badRequest()
                .body(new LoginResponse(false, "Account is disabled"));
        }
        
        return ResponseEntity.ok(new LoginResponse(user.getId(), user.getUsername(), 
                                                  user.getEmail(), user.getRole(),
                                                  user.getFirstName(), user.getLastName(),
                                                  true, "Login successful"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok(new LoginResponse(true, "Logout successful"));
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<?> profile(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userService.convertToDto(user));
    }
}
