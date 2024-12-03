package com.mentalhealth.controller;

import com.mentalhealth.model.JournalEntry;
import com.mentalhealth.service.JournalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/journal")
public class JournalController {

    @Autowired
    private JournalService journalService;

    @PostMapping("/add")
    public JournalEntry addEntry(@RequestBody JournalEntry entry) {
        return journalService.addJournalEntry(entry);
    }

    @GetMapping("/entries")
    public List<JournalEntry> getEntries(@RequestParam String date) {
        return journalService.getJournalEntriesByDate(date);
    }
}
