package com.mentalhealth.service;

import com.mentalhealth.model.Illness;
import com.mentalhealth.model.Symptom;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SymptomCheckerService {

    private List<Illness> illnesses = new ArrayList<>();

    public SymptomCheckerService() {
        // Sample illnesses and their symptoms
        illnesses.add(new Illness("Depression", List.of("sadness", "fatigue", "sleep problems")));
        illnesses.add(new Illness("Anxiety", List.of("nervousness", "racing thoughts", "sweating")));
        illnesses.add(new Illness("Panic Disorder", List.of("shortness of breath", "chest pain", "sweating")));
    }

    public List<String> checkSymptoms(List<Symptom> symptoms) {
        List<String> probableIllnesses = new ArrayList<>();
        for (Illness illness : illnesses) {
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
