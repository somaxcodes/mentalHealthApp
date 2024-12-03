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
        List<String> probableIllnesses = new ArrayList<>();
        List<Illness> allIllnesses = illnessRepository.findAll();
        Set<String> symptomNames = symptoms.stream()
            .map(s -> s.getName().toLowerCase())
            .collect(Collectors.toSet());
        
        for (Illness illness : allIllnesses) {
            long matchingSymptoms = illness.getSymptoms().stream()
                .map(String::toLowerCase)
                .filter(symptomNames::contains)
                .count();
            
            if (matchingSymptoms >= 2) {
                probableIllnesses.add(illness.getName() + " - " + illness.getDescription());
            }
        }
        return probableIllnesses;
    }

    public List<Symptom> getAllSymptoms() {
        return symptomRepository.findAll();
    }
}