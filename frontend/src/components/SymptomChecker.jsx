import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Paper,
  Alert,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import axios from 'axios';

const SymptomChecker = () => {
  const [availableSymptoms, setAvailableSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [illnesses, setIllnesses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSymptoms();
  }, []);

  const fetchSymptoms = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/symptom-checker/symptoms');
      setAvailableSymptoms(response.data);
    } catch (err) {
      setError('Failed to load symptoms. Please refresh the page.');
      console.error('Error fetching symptoms:', err);
    }
  };

  const handleSymptomChange = (event) => {
    setCurrentSymptom(event.target.value);
  };

  const handleAddSymptom = () => {
    if (currentSymptom && !selectedSymptoms.find(s => s.name === currentSymptom)) {
      if (selectedSymptoms.length >= 3) {
        setError('Maximum 3 symptoms allowed. Please remove one first.');
        return;
      }
      setSelectedSymptoms([...selectedSymptoms, { name: currentSymptom }]);
      setCurrentSymptom('');
      setError('');
    }
  };

  const handleRemoveSymptom = (symptomToRemove) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s.name !== symptomToRemove));
    setIllnesses([]);
  };

  const handleCheckSymptoms = async () => {
    if (selectedSymptoms.length !== 3) {
      setError('Please select exactly 3 symptoms');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/symptom-checker/check', selectedSymptoms);
      setIllnesses(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data || 'Failed to check symptoms');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Mental Health Symptom Checker
      </Typography>

      <Typography variant="subtitle1" gutterBottom align="center" sx={{ mb: 3 }}>
        Select exactly 3 symptoms ({selectedSymptoms.length}/3)
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Symptom</InputLabel>
        <Select
          value={currentSymptom}
          onChange={handleSymptomChange}
          label="Select Symptom"
          disabled={selectedSymptoms.length >= 3}
        >
          {availableSymptoms
            .filter(symptom => !selectedSymptoms.find(s => s.name === symptom.name))
            .map((symptom) => (
              <MenuItem key={symptom.id} value={symptom.name}>
                {symptom.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={handleAddSymptom}
        disabled={!currentSymptom || selectedSymptoms.length >= 3}
        fullWidth
        sx={{ mb: 3 }}
      >
        Add Symptom
      </Button>

      <Box sx={{ mb: 3, minHeight: '100px' }}>
        {selectedSymptoms.map((symptom) => (
          <Chip
            key={symptom.name}
            label={symptom.name}
            onDelete={() => handleRemoveSymptom(symptom.name)}
            color="primary"
            sx={{ m: 0.5 }}
          />
        ))}
      </Box>

      <Button
        variant="contained"
        onClick={handleCheckSymptoms}
        disabled={selectedSymptoms.length !== 3}
        fullWidth
        sx={{ mb: 3 }}
      >
        Check Possible Conditions
      </Button>

      {illnesses.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom color="primary">
            Possible Conditions:
          </Typography>
          <List>
            {illnesses.map((illness, index) => (
              <ListItem key={index} sx={{ bgcolor: '#f5f5f5', mb: 1, borderRadius: 1 }}>
                <ListItemText
                  primary={illness.split(' - ')[0]}
                  secondary={illness.split(' - ')[1]}
                  primaryTypographyProps={{
                    fontWeight: 'medium',
                    color: 'primary.main'
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Paper>
  );
};

export default SymptomChecker; 