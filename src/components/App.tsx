import React from 'react';
import { Box, Card, CssBaseline, Grid } from '@mui/material';
import Navbar from './Navbar';
import TokenSection from './TokenSection';
import DisplaySection from "./DisplaySection";
import { AutomatonProvider } from "../context/AutomatonContext";
import InputSection from "./InputSection";
import Section from "./Section";

function App() {
  return (
    <AutomatonProvider>
      <CssBaseline />
      <Navbar />
      <Box sx={{ padding: 4 }}>
        <Grid container spacing={4}>
          <Grid item lg={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Section>
                <TokenSection />
              </Section>
              <Section>
                <InputSection />
              </Section>
            </Box>
          </Grid>
          <Grid item lg={8}>
            <Section>
              <DisplaySection />
            </Section>
          </Grid>
        </Grid>
      </Box>
    </AutomatonProvider>
  );
}

export default App;
