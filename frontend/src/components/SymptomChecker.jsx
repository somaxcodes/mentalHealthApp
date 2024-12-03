import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  Chip,
  Paper,
  Alert,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Fade,
  useTheme,
} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { motion } from 'framer-motion';

const SymptomChecker = () => {
  const theme = useTheme();
  const [availableSymptoms, setAvailableSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [illnesses, setIllnesses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSymptoms();
  }, []);

  const fetchSymptoms = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/symptom-checker/symptoms');
      setAvailableSymptoms(response.data);
    } catch (err) {
      setError('Failed to load symptoms. Please refresh the page.');
    }
  };

  const handleSymptomChange = (event) => {
    setCurrentSymptom(event.target.value);
  };

  const handleAddSymptom = () => {
    if (currentSymptom && !selectedSymptoms.find(s => s.name === currentSymptom)) {
      if (selectedSymptoms.length >= 3) {
        setError('Maximum 3 symptoms allowed');
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

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/symptom-checker/check', selectedSymptoms);
      setIllnesses(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data || 'Failed to check symptoms');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{
      background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
      borderRadius: 4,
      p: { xs: 3, md: 5 },
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    }}>
      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        elevation={6}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <MedicalServicesIcon 
            sx={{ 
              fontSize: 50, 
              color: theme.palette.primary.main,
              mb: 2 
            }} 
          />
          <Typography 
            variant="h3" 
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #6a11cb 30%, #2575fc 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              mb: 2
            }}
          >
            Mental Health Checker
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Select exactly 3 symptoms ({selectedSymptoms.length}/3)
          </Typography>
        </Box>

        {error && (
          <Fade in>
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 2
              }}
            >
              {error}
            </Alert>
          </Fade>
        )}

        <Box sx={{ mb: 4 }}>
          <FormControl fullWidth>
            <Select
              value={currentSymptom}
              onChange={handleSymptomChange}
              displayEmpty
              disabled={selectedSymptoms.length >= 3}
              sx={{
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0,0,0,0.1)'
                }
              }}
            >
              <MenuItem value="" disabled>
                <Typography color="text.secondary">Select a symptom</Typography>
              </MenuItem>
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
            startIcon={<AddIcon />}
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #1CA7D2 90%)',
              }
            }}
          >
            Add Symptom
          </Button>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 1, 
          mb: 4, 
          minHeight: '60px',
          alignItems: 'center'
        }}>
          {selectedSymptoms.map((symptom) => (
            <Chip
              key={symptom.name}
              label={symptom.name}
              onDelete={() => handleRemoveSymptom(symptom.name)}
              color="primary"
              sx={{
                borderRadius: '16px',
                py: 2.5,
                px: 1,
                fontSize: '0.95rem',
                fontWeight: 500,
                background: 'linear-gradient(45deg, #6a11cb 30%, #2575fc 90%)',
                boxShadow: '0 2px 8px rgba(106, 17, 203, 0.3)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 12px rgba(106, 17, 203, 0.5)',
                },
                '& .MuiChip-deleteIcon': {
                  color: 'white',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: '#ff4444',
                    transform: 'scale(1.1)',
                  },
                },
              }}
            />
          ))}
        </Box>

        <Button
          variant="contained"
          onClick={handleCheckSymptoms}
          disabled={selectedSymptoms.length !== 3 || loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
          fullWidth
          sx={{
            py: 2,
            borderRadius: 2,
            fontSize: '1.1rem',
            fontWeight: 600,
            textTransform: 'none',
            background: selectedSymptoms.length === 3 
              ? 'linear-gradient(45deg, #6a11cb 30%, #2575fc 90%)'
              : '#e0e0e0',
            boxShadow: '0 3px 5px 2px rgba(106, 17, 203, .3)',
            transition: 'background 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(45deg, #5a0fc8 30%, #1f6efc 90%)',
              boxShadow: '0 5px 15px rgba(106, 17, 203, .5)',
            }
          }}
        >
          {loading ? 'Analyzing Symptoms...' : 'Check Possible Conditions'}
        </Button>

        {illnesses.length > 0 && (
          <Fade in>
            <Box sx={{ mt: 5 }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 3,
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                  textAlign: 'center'
                }}
              >
                Possible Conditions
              </Typography>
              <List>
                {illnesses.map((illness, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      mb: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(33, 150, 243, 0.04)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'rgba(33, 150, 243, 0.08)',
                        transform: 'translateX(8px)'
                      }
                    }}
                  >
                    <ListItemText
                      primary={illness}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        color: theme.palette.primary.dark,
                        fontSize: '1.1rem'
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Fade>
        )}
      </Paper>
    </Container>
  );
};

export default SymptomChecker; 