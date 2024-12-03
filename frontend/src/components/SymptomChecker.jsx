import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Chip,
  Paper,
  Typography,
  List,
  ListItem,
  Divider,
  Alert,
  Autocomplete
} from '@mui/material';
import axios from 'axios';

const COMMON_SYMPTOMS = [
  "sadness",
  "fatigue",
  "sleep problems",
  "anxiety",
  "nervousness",
  "racing thoughts",
  "sweating",
  "shortness of breath",
  "chest pain",
  "irritability"
];

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [error, setError] = useState('');
  const [availableSymptoms, setAvailableSymptoms] = useState([]);

  useEffect(() => {
    // Fetch available symptoms when component mounts
    const fetchSymptoms = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/symptom-checker/symptoms');
        setAvailableSymptoms(response.data.map(symptom => symptom.name));
      } catch (err) {
        console.error('Error fetching symptoms:', err);
        setError('Error loading symptoms. Please refresh the page.');
      }
    };

    fetchSymptoms();
  }, []);

  const handleCheckSymptoms = async () => {
    if (selectedSymptoms.length < 3) {
      setError('Please select at least 3 symptoms for accurate diagnosis');
      return;
    }

    try {
      const symptoms = selectedSymptoms.map(symptom => ({ name: symptom }));
      const response = await axios.post('http://localhost:8080/api/symptom-checker/check', symptoms);
      setConditions(response.data);
      setError('');
    } catch (err) {
      if (err.response?.data) {
        setError(err.response.data);
      } else {
        setError('Error checking symptoms. Please try again.');
      }
      console.error('Error:', err);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper 
        elevation={6} 
        sx={{ 
          p: { xs: 3, md: 6 },
          borderRadius: 4,
          backgroundColor: 'white',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Typography 
          variant="h3" 
          component="h1"
          sx={{ 
            background: 'linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            fontWeight: 700,
            mb: 5,
            textAlign: 'center',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Mental Health Symptom Checker
        </Typography>

        <Box sx={{ mb: 5 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2,
              color: '#666',
              fontWeight: 500
            }}
          >
            Select at least 3 symptoms:
          </Typography>
          <Autocomplete
            multiple
            options={availableSymptoms}
            value={selectedSymptoms}
            onChange={(event, newValue) => {
              setSelectedSymptoms(newValue);
              setConditions([]);
              setError('');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Choose symptoms"
                error={error && selectedSymptoms.length < 3}
                helperText={selectedSymptoms.length < 3 ? 
                  `Please select ${3 - selectedSymptoms.length} more symptom(s)` : ''}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#f8f9fa'
                  }
                }}
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option}
                  {...getTagProps({ index })}
                  color="primary"
                  sx={{ 
                    borderRadius: 3,
                    fontSize: '0.95rem',
                    py: 0.75,
                    px: 0.5,
                    '& .MuiChip-label': { px: 2 }
                  }}
                />
              ))
            }
          />
        </Box>

        {selectedSymptoms.length > 0 && (
          <Button 
            variant="contained" 
            fullWidth 
            onClick={handleCheckSymptoms}
            sx={{ 
              mb: 4,
              py: 2,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 600,
              background: 'linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)',
              boxShadow: '0 3px 15px rgba(33, 150, 243, 0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976d2 30%, #1ba8d1 90%)',
                boxShadow: '0 4px 20px rgba(33, 150, 243, 0.4)'
              }
            }}
          >
            Check Symptoms
          </Button>
        )}

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 4,
              borderRadius: 2
            }}
          >
            {error}
          </Alert>
        )}

        {conditions.length > 0 && (
          <Box 
            sx={{ 
              mt: 4,
              p: 3,
              bgcolor: '#f8f9fa',
              borderRadius: 3
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#1976d2',
                fontWeight: 600,
                mb: 3,
                textAlign: 'center'
              }}
            >
              Possible Conditions
            </Typography>
            <List>
              {conditions.map((condition, index) => (
                <Box key={index}>
                  {index > 0 && <Divider sx={{ my: 3 }} />}
                  <ListItem 
                    sx={{ 
                      display: 'block', 
                      py: 2,
                      px: { xs: 2, md: 4 }
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: '#2196f3',
                        mb: 1.5,
                        fontWeight: 600
                      }}
                    >
                      {condition.split(' - ')[0]}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#555',
                        lineHeight: 1.7,
                        fontSize: '1.05rem'
                      }}
                    >
                      {condition.split(' - ')[1]}
                    </Typography>
                  </ListItem>
                </Box>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default SymptomChecker; 