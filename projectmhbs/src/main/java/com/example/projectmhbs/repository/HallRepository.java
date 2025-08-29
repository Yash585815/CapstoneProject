package com.example.projectmhbs.repository;

import com.example.projectmhbs.entity.Hall;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HallRepository extends JpaRepository<Hall , Long>{
	List<Hall> findByAvailableTrue();
	List<Hall> findByCapacityGreaterThanEqual(int minCapacity);

}
