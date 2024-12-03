import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import SymptomChecker from './components/SymptomChecker';

// Keyframes for the floating animation
const floatingAnimation = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }
`;

// Keyframes for the gradient animation
const gradientAnimation = `
  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

function App() {
  return (
    <>
      <CssBaseline />
      <style>
        {floatingAnimation}
        {gradientAnimation}
      </style>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
          backgroundSize: '400% 400%',
          animation: 'gradientBG 15s ease infinite',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
            pointerEvents: 'none'
          }
        }}
      >
        {/* Floating circles background */}
        {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: { xs: '100px', md: '150px' },
              height: { xs: '100px', md: '150px' },
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              animation: `float ${3 + i}s ease-in-out infinite`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              backdropFilter: 'blur(5px)',
              zIndex: 0
            }}
          />
        ))}

        {/* Main content */}
        <Box
          sx={{
           minHeight:'100vh',
           minWidth:'100vw',
            mx: 'auto',
            height: 'fit-content',
            position: 'relative',
            zIndex: 1,
            p: { xs: 2, sm: 3, md: 4 }
          }}
        >
          <SymptomChecker />
        </Box>
      </Box>
    </>
  );
}

export default App;