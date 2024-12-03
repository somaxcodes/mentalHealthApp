package com.mentalhealth.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.mentalhealth.model.Illness;
import com.mentalhealth.model.Symptom;
import com.mentalhealth.repository.IllnessRepository;
import com.mentalhealth.repository.SymptomRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private IllnessRepository illnessRepository;

    @Autowired
    private SymptomRepository symptomRepository;

    @Override
    public void run(String... args) {
        // Clear existing data
        illnessRepository.deleteAll();
        symptomRepository.deleteAll();

        // Initialize base symptoms
        List<Symptom> symptoms = Arrays.asList(
            new Symptom("sadness"),
            new Symptom("anxiety"),
            new Symptom("sleep problems"),
            new Symptom("fatigue"),
            new Symptom("nervousness"),
            new Symptom("racing thoughts"),
            new Symptom("sweating"),
            new Symptom("shortness of breath"),
            new Symptom("chest pain"),
            new Symptom("irritability"),
            new Symptom("social withdrawal"),
            new Symptom("poor concentration")
        );
        
        symptomRepository.saveAll(symptoms);
        System.out.println("Initialized symptoms: " + symptoms);

        // Initialize illnesses with exactly 3 symptoms each
        List<Illness> illnesses = Arrays.asList(
            // Depression-related combinations
            createIllness("Major Depression", 
                "Persistent sadness and loss of interest",
                Arrays.asList("sadness", "fatigue", "sleep problems")),
            createIllness("Atypical Depression", 
                "Depression with unique pattern",
                Arrays.asList("sadness", "social withdrawal", "fatigue")),
            createIllness("Depression with Anxiety", 
                "Combined depression and anxiety",
                Arrays.asList("sadness", "anxiety", "poor concentration")),
            createIllness("Melancholic Depression",
                "Severe form of depression",
                Arrays.asList("sadness", "poor concentration", "sleep problems")),

            // Anxiety-related combinations
            createIllness("Generalized Anxiety",
                "Excessive worry about daily life",
                Arrays.asList("anxiety", "nervousness", "racing thoughts")),
            createIllness("Social Anxiety",
                "Fear of social situations",
                Arrays.asList("social withdrawal", "sweating", "anxiety")),
            createIllness("Performance Anxiety",
                "Anxiety in performance situations",
                Arrays.asList("sweating", "racing thoughts", "nervousness")),
            createIllness("Cognitive Anxiety",
                "Anxiety affecting thinking",
                Arrays.asList("racing thoughts", "poor concentration", "anxiety")),

            // Panic-related combinations
            createIllness("Panic Disorder",
                "Sudden intense fear episodes",
                Arrays.asList("chest pain", "shortness of breath", "sweating")),
            createIllness("Acute Stress Disorder",
                "Response to stressful events",
                Arrays.asList("anxiety", "chest pain", "racing thoughts")),
            createIllness("Panic with Agoraphobia",
                "Panic with fear of places",
                Arrays.asList("chest pain", "anxiety", "social withdrawal")),
            createIllness("Physical Panic",
                "Physically manifesting panic",
                Arrays.asList("shortness of breath", "sweating", "racing thoughts")),

            // Sleep-related combinations
            createIllness("Insomnia Disorder",
                "Difficulty with sleep",
                Arrays.asList("sleep problems", "fatigue", "poor concentration")),
            createIllness("Anxiety-Related Insomnia",
                "Sleep issues from anxiety",
                Arrays.asList("sleep problems", "anxiety", "racing thoughts")),
            createIllness("Stress-Related Sleep",
                "Sleep disruption from stress",
                Arrays.asList("sleep problems", "irritability", "fatigue")),
            createIllness("Chronic Insomnia",
                "Long-term sleep issues",
                Arrays.asList("sleep problems", "poor concentration", "anxiety")),

            // Stress-related combinations
            createIllness("Acute Stress",
                "Immediate stress response",
                Arrays.asList("irritability", "anxiety", "sweating")),
            createIllness("Chronic Stress",
                "Long-term stress effects",
                Arrays.asList("poor concentration", "irritability", "sleep problems")),
            createIllness("Adjustment Disorder",
                "Difficulty with life changes",
                Arrays.asList("nervousness", "social withdrawal", "poor concentration")),
            createIllness("Stress Response",
                "Physical stress symptoms",
                Arrays.asList("fatigue", "sweating", "irritability")),

            // Mixed symptom combinations
            createIllness("Mixed Anxiety-Depression",
                "Combined anxiety and depression",
                Arrays.asList("anxiety", "sadness", "fatigue")),
            createIllness("Burnout Syndrome",
                "Physical and emotional exhaustion",
                Arrays.asList("fatigue", "poor concentration", "irritability")),
            createIllness("Social Withdrawal",
                "Persistent social avoidance",
                Arrays.asList("social withdrawal", "sadness", "anxiety")),
            createIllness("Emotional Exhaustion",
                "Severe emotional fatigue",
                Arrays.asList("fatigue", "sadness", "irritability")),

            // Additional combinations
            createIllness("Cognitive Stress",
                "Stress affecting mental function",
                Arrays.asList("poor concentration", "racing thoughts", "anxiety")),
            createIllness("Physical Anxiety",
                "Body-focused anxiety",
                Arrays.asList("chest pain", "sweating", "nervousness")),
            createIllness("Social Stress",
                "Stress in social settings",
                Arrays.asList("social withdrawal", "nervousness", "sweating")),
            createIllness("Mental Fatigue",
                "Exhaustion affecting cognition",
                Arrays.asList("fatigue", "racing thoughts", "poor concentration"))
        );
        
        illnessRepository.saveAll(illnesses);
        System.out.println("Initialized illnesses: " + illnesses);
    }

    private Illness createIllness(String name, String description, List<String> symptoms) {
        Illness illness = new Illness(name, symptoms);
        illness.setDescription(description);
        return illness;
    }
} 