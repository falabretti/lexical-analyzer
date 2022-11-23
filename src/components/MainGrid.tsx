import { Box, Grid, Paper, Typography, Card, CardHeader } from '@mui/material';
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
    <Box sx={{ width: '100%', marginTop: 4, marginBottom: 4 }}>
      <Grid container spacing={4}>
        {children.map((child, id) => (
          <Grid item xs={12} key={id}>
            <Card>
              <Box sx={{ p: 2 }}>
                {child}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MainGrid;
