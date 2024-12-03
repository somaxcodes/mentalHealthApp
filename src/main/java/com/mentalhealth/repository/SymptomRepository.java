package com.mentalhealth.repository;

import com.mentalhealth.model.Symptom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SymptomRepository extends JpaRepository<Symptom, Long> {
    Symptom findByName(String name);
} 