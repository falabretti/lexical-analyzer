import { Container, CssBaseline, Typography } from '@mui/material';
import React from 'react';
import MainGrid from './MainGrid';
import Navbar from './Navbar';

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg">
        <MainGrid>
          <Typography>Tokens</Typography>
          <Typography>Input</Typography>
          <Typography>Table/Graph</Typography>
        </MainGrid>
      </Container>
    </>
  );
}

export default App;
