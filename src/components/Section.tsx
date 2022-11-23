import { Box, Card, Paper } from "@mui/material";
import React, { ReactNode } from 'react';

type SectionProps = {
  children: ReactNode
}

function Section(props: SectionProps) {

  return (
    <Paper elevation={2}>
      <Box sx={{ p: 2 }}>
        {props.children}
      </Box>
    </Paper>
  )
}

export default Section;
