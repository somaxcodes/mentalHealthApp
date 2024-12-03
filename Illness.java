package com.mentalhealth.model;



import java.util.List;

public class Illness {
    private String name;
    private List<String> symptoms;

    public Illness(String name, List<String> symptoms) {
        this.name = name;
        this.symptoms = symptoms;
    }

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

