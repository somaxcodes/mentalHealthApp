package com.mentalhealth.repository;

import com.mentalhealth.model.Illness;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IllnessRepository extends JpaRepository<Illness, Long> {
} 