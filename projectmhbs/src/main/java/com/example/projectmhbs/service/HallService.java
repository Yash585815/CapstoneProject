package com.example.projectmhbs.service;

import com.example.projectmhbs.entity.Hall;
import com.example.projectmhbs.repository.HallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HallService {
    
    @Autowired
    private HallRepository hallRepository;
    
    public List<Hall> getAllHalls() {
        return hallRepository.findAll();
    }
    
    public Hall getHallById(Long id) {
        return hallRepository.findById(id).orElse(null);
    }
    
    public Hall addHall(Hall hall) {
        return hallRepository.save(hall);
    }
    
    public Hall updateHall(Long id, Hall hall) {
        Optional<Hall> existing = hallRepository.findById(id);
        if (existing.isPresent()) {
            Hall existingHall = existing.get();
            existingHall.setName(hall.getName());
            existingHall.setCapacity(hall.getCapacity());
            existingHall.setLocation(hall.getLocation());
            existingHall.setPricePerDay(hall.getPricePerDay());
            existingHall.setAmenities(hall.getAmenities());
            existingHall.setAvailable(hall.isAvailable());
            return hallRepository.save(existingHall);
        }
        return null;
    }
    
    public void deleteHall(Long id) {
        hallRepository.deleteById(id);
    }
    
    public List<Hall> getAvailableHalls() {
        return hallRepository.findByAvailableTrue();
    }
    
    public List<Hall> getHallsByCapacity(int minCapacity) {
        return hallRepository.findByCapacityGreaterThanEqual(minCapacity);
    }
}
