# Mental Health App

A Spring Boot application for mental health tracking and symptom checking.

## Features

- Journal entry management
- Symptom checking
- Mental health tracking
- Basic illness identification

## Technical Stack

- Java 17
- Spring Boot 3.2.3
- Spring Data JPA
- H2 Database
- Maven

## Getting Started

1. Clone the repository
2. Run `mvn clean install`
3. Start the application with `mvn spring-boot:run`
4. Access the application at `http://localhost:8080`

## API Endpoints

### Journal Entries
- POST `/api/journal/add` - Add a new journal entry
- GET `/api/journal/entries?date={date}` - Get entries by date

### Symptom Checker
- POST `/api/symptom-checker/check` - Check symptoms for possible illnesses