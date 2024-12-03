import React from 'react';
import { CssBaseline, Box, ThemeProvider, createTheme } from '@mui/material';
import SymptomChecker from './components/SymptomChecker';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#4dabf5',
      dark: '#1769aa',
    },
    background: {
      default: '#1a1a2e',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Keyframes for animations
const animations = `
  @keyframes float {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  }

  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <style>{animations}</style>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #533483)',
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
            pointerEvents: 'none',
          }
        }}
      >
        {/* Animated background elements */}
        {[...Array(8)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: { xs: '80px', md: '120px' },
              height: { xs: '80px', md: '120px' },
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              animation: `float ${4 + i}s ease-in-out infinite`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              zIndex: 0,
            }}
          />
        ))}

        {/* Main content */}
        <Box
          sx={{
            width: '100%',
            maxWidth: '1000px',
            mx: 'auto',
            position: 'relative',
            zIndex: 1,
            p: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <SymptomChecker />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;