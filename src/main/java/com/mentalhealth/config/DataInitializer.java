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
        // Only initialize if database is empty
        if (illnessRepository.count() == 0) {
            // Initialize Symptoms
            Symptom sadness = new Symptom("sadness");
            Symptom fatigue = new Symptom("fatigue");
            Symptom sleepProblems = new Symptom("sleep problems");
            Symptom anxiety = new Symptom("anxiety");
            Symptom nervousness = new Symptom("nervousness");
            Symptom racingThoughts = new Symptom("racing thoughts");
            Symptom sweating = new Symptom("sweating");
            Symptom breathlessness = new Symptom("shortness of breath");
            Symptom chestPain = new Symptom("chest pain");
            Symptom irritability = new Symptom("irritability");
            
            List<Symptom> symptoms = Arrays.asList(
                sadness, fatigue, sleepProblems, anxiety, nervousness,
                racingThoughts, sweating, breathlessness, chestPain, irritability
            );
            
            symptomRepository.saveAll(symptoms);

            // Initialize Illnesses with descriptions
            Illness depression = new Illness(
                "Depression",
                Arrays.asList("sadness", "fatigue", "sleep problems")
            );
            depression.setDescription("A mental health disorder characterized by persistently depressed mood and loss of interest in activities");

            Illness generalizedAnxiety = new Illness(
                "Generalized Anxiety Disorder",
                Arrays.asList("anxiety", "nervousness", "racing thoughts", "irritability")
            );
            generalizedAnxiety.setDescription("Persistent and excessive worry about various aspects of life");

            Illness panicDisorder = new Illness(
                "Panic Disorder",
                Arrays.asList("shortness of breath", "chest pain", "sweating", "racing thoughts")
            );
            panicDisorder.setDescription("Recurring unexpected panic attacks and fear of experiencing panic attacks");

            List<Illness> illnesses = Arrays.asList(depression, generalizedAnxiety, panicDisorder);
            illnessRepository.saveAll(illnesses);
        }
    }
} 