package com.example.projectmhbs.controller;

import com.example.projectmhbs.entity.User;
import com.example.projectmhbs.dto.UserDto;
import com.example.projectmhbs.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    
    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserDto> all() { 
        return userService.convertToDtoList(userService.getAllUsers()); 
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getById(@PathVariable Long id) {
        User u = userService.getUserById(id);
        return u == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(userService.convertToDto(u));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> update(@PathVariable Long id, @RequestBody User user) {
        User updated = userService.updateUser(id, user);
        return updated == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(userService.convertToDto(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}