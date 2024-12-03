package com.mentalhealth.service;

import com.mentalhealth.model.JournalEntry;
import com.mentalhealth.repository.JournalEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class JournalService {

    @Autowired
    private JournalEntryRepository journalEntryRepository;

    public JournalEntry addJournalEntry(JournalEntry entry) {
        return journalEntryRepository.save(entry);
    }

    public List<JournalEntry> getJournalEntriesByDate(String date) {
        return journalEntryRepository.findByDate(LocalDate.parse(date));
    }
}
