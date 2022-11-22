import React from 'react';
import { Container, CssBaseline, Typography, } from '@mui/material';
import Navbar from './Navbar';
import MainGrid from './MainGrid';
import TokenSection from './TokenSection';
import DisplaySection from "./DisplaySection";
import { AutomatonProvider } from "../context/AutomatonContext";

function App() {
  return (
    <AutomatonProvider>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="xl">
        <MainGrid>
          <TokenSection />
          <Typography>Input</Typography>
          <DisplaySection />
        </MainGrid>
      </Container>
    </AutomatonProvider>
  );
}

export default App;
