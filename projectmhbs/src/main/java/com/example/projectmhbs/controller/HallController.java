package com.example.projectmhbs.controller;

import com.example.projectmhbs.entity.Hall;
import com.example.projectmhbs.service.HallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/halls")
@CrossOrigin(origins = "http://localhost:4200")
public class HallController {
    
    @Autowired
    private HallService hallService;

    @GetMapping
    public List<Hall> getAll() { return hallService.getAllHalls(); }

    @GetMapping("/{id}")
    public ResponseEntity<Hall> getById(@PathVariable Long id) {
        Hall h = hallService.getHallById(id);
        return h == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(h);
    }

    @PostMapping
    public Hall create(@RequestBody Hall hall) { return hallService.addHall(hall); }

    @PutMapping("/{id}")
    public ResponseEntity<Hall> update(@PathVariable Long id, @RequestBody Hall hall) {
        Hall updated = hallService.updateHall(id, hall);
        return updated == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        hallService.deleteHall(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/available")
    public List<Hall> getAvailable() { return hallService.getAvailableHalls(); }

    @GetMapping("/capacity/{minCapacity}")
    public List<Hall> byCapacity(@PathVariable int minCapacity) { return hallService.getHallsByCapacity(minCapacity); }
}
