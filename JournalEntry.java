package com.mentalhealth.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;  // Corrected import for @Id

@Entity
public class JournalEntry {
    
    @Id
    @GeneratedValue
    private Long id;
    
    private LocalDate date;
    private String task;
    private String feelings;

    // Constructors, getters, setters
    public JournalEntry() {}

    public JournalEntry(LocalDate date, String task, String feelings) {
        this.date = date;
        this.task = task;
        this.feelings = feelings;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public String getFeelings() {
        return feelings;
    }

    public void setFeelings(String feelings) {
        this.feelings = feelings;
    }
}
