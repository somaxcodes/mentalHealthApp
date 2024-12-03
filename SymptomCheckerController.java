package com.mentalhealth.controller;

import com.mentalhealth.model.Symptom;
import com.mentalhealth.service.SymptomCheckerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/symptom-checker")
public class SymptomCheckerController {

    @Autowired
    private SymptomCheckerService symptomCheckerService;

    @PostMapping("/check")
    public List<String> checkSymptoms(@RequestBody List<Symptom> symptoms) {
        return symptomCheckerService.checkSymptoms(symptoms);
    }
}
