import { Box, Grid, Paper, Typography } from '@mui/material';
import React, { ReactElement } from 'react';

type Props = {
  children: ReactElement | ReactElement[]
}

function MainGrid(props: Props) {

  var { children } = props;

  if (!Array.isArray(children)) {
    children = [children];
  }

  return (
    <Box sx={{ width: '100%', marginTop: '2rem' }}>
      <Grid container spacing={2}>
        {children.map(child => (
          <Grid item lg={12}>
            <Paper sx={{ padding: '1rem' }}>
              {child}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MainGrid;
