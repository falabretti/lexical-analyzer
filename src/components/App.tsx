import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import Navbar from './Navbar';
import MainGrid from './MainGrid';
import TokenSection from './TokenSection';
import DisplaySection from "./DisplaySection";
import { AutomatonProvider } from "../context/AutomatonContext";
import InputSection from "./InputSection";

function App() {
  return (
    <AutomatonProvider>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="xl">
        <MainGrid>
          <TokenSection />
          <InputSection />
          <DisplaySection />
        </MainGrid>
      </Container>
    </AutomatonProvider>
  );
}

export default App;
