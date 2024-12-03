package com.mentalhealth.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Illness {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @ElementCollection
    private List<String> symptoms;
    
    private String description;

    public Illness() {}

    public Illness(String name, List<String> symptoms) {
        this.name = name;
        this.symptoms = symptoms;
    }

    // Add getters and setters for id and description
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // Existing getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(List<String> symptoms) {
        this.symptoms = symptoms;
    }
} 