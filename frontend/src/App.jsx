import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import SymptomChecker from './components/SymptomChecker';

function App() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          minWidth: '100vw',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#f5f5f5',
          p: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '800px',
            mx: 'auto',
            height: 'fit-content'
          }}
        >
          <SymptomChecker />
        </Box>
      </Box>
    </>
  );
}

export default App;