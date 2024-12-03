package com.mentalhealth.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mentalhealth.model.Symptom;
import com.mentalhealth.service.SymptomCheckerService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/symptom-checker")
public class SymptomCheckerController {

    @Autowired
    private SymptomCheckerService symptomCheckerService;

    @PostMapping("/check")
    public ResponseEntity<?> checkSymptoms(@RequestBody List<Symptom> symptoms) {
        System.out.println("Received request with symptoms: " + symptoms);
        
        if (symptoms.size() != 3) {
            return ResponseEntity.badRequest()
                .body("Please select exactly 3 symptoms");
        }
        
        List<String> results = symptomCheckerService.checkSymptoms(symptoms);
        System.out.println("Returning results: " + results);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/symptoms")
    public ResponseEntity<List<Symptom>> getAllSymptoms() {
        return ResponseEntity.ok(symptomCheckerService.getAllSymptoms());
    }
}
