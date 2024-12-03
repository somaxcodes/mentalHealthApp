package com.mentalhealth.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mentalhealth.model.Illness;
import com.mentalhealth.model.Symptom;
import com.mentalhealth.repository.IllnessRepository;
import com.mentalhealth.repository.SymptomRepository;

@Service
public class SymptomCheckerService {

    @Autowired
    private IllnessRepository illnessRepository;

    @Autowired
    private SymptomRepository symptomRepository;

    public List<String> checkSymptoms(List<Symptom> symptoms) {
        System.out.println("Received symptoms to check: " + symptoms);
        
        List<String> probableIllnesses = new ArrayList<>();
        List<Illness> allIllnesses = illnessRepository.findAll();
        
        // Convert input symptoms to lowercase for matching
        Set<String> inputSymptoms = symptoms.stream()
            .map(s -> s.getName().trim().toLowerCase())
            .collect(Collectors.toSet());
        
        System.out.println("Looking for symptoms: " + inputSymptoms);

        for (Illness illness : allIllnesses) {
            // Convert illness symptoms to lowercase for matching
            Set<String> illnessSymptoms = illness.getSymptoms().stream()
                .map(s -> s.trim().toLowerCase())
                .collect(Collectors.toSet());
            
            System.out.println("Checking " + illness.getName() + 
                             " with symptoms: " + illnessSymptoms);

            // Count how many symptoms match
            long matchCount = illnessSymptoms.stream()
                .filter(inputSymptoms::contains)
                .count();
            
            System.out.println("Found " + matchCount + " matching symptoms");

            // If 2 or more symptoms match, add to results
            if (matchCount >= 2) {
                probableIllnesses.add(illness.getName());
            }
        }

        System.out.println("Found matching illnesses: " + probableIllnesses);
        return probableIllnesses;
    }

    public List<Symptom> getAllSymptoms() {
        return symptomRepository.findAll();
    }
}