package com.mentalhealth.service;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mentalhealth.model.Illness;
import com.mentalhealth.model.Symptom;
import com.mentalhealth.repository.IllnessRepository;

import jakarta.annotation.PostConstruct;

@Service
public class SymptomCheckerService {

    @Autowired
    private IllnessRepository illnessRepository;

    @PostConstruct
    public void init() {
        // Initialize sample data if repository is empty
        if (illnessRepository.count() == 0) {
            illnessRepository.save(new Illness("Depression", List.of("sadness", "fatigue", "sleep problems")));
            illnessRepository.save(new Illness("Anxiety", List.of("nervousness", "racing thoughts", "sweating")));
            illnessRepository.save(new Illness("Panic Disorder", List.of("shortness of breath", "chest pain", "sweating")));
        }
    }

    public List<String> checkSymptoms(List<Symptom> symptoms) {
        List<String> probableIllnesses = new ArrayList<>();
        List<Illness> allIllnesses = illnessRepository.findAll();
        
        for (Illness illness : allIllnesses) {
            for (Symptom symptom : symptoms) {
                if (illness.getSymptoms().contains(symptom.getName().toLowerCase())) {
                    probableIllnesses.add(illness.getName());
                    break;
                }
            }
        }
        return probableIllnesses;
    }
} 