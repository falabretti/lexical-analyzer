import React from 'react';
import { Container, CssBaseline, Typography, } from '@mui/material';
import Navbar from './Navbar';
import MainGrid from './MainGrid';
import TokenSection from './TokenSection';
import { AutomatonProvider } from "../context/AutomatonContext";

function App() {
  return (
    <AutomatonProvider>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg">
        <MainGrid>
          <TokenSection />
          <Typography>Input</Typography>
          <Typography>Table/Graph</Typography>
        </MainGrid>
      </Container>
    </AutomatonProvider>
  );
}

export default App;
