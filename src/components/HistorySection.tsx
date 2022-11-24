import React, { useContext } from 'react';
import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { AutomatonContext, AutomatonContextType } from "../context/AutomatonContext";


function HistorySection() {

  const { history } = useContext(AutomatonContext) as AutomatonContextType;

  return (
    <section>
      <Typography variant="h5" gutterBottom>Histórico de Reconhecimento</Typography>
      <Divider />
      <Box sx={{ p: 1 }}>
        <List>
          {history.map((entry, id) => (
            <ListItem key={id}>
              <ListItemIcon>
                {
                  entry.valid
                    ? <CheckCircleOutlineIcon color="success" />
                    : <ErrorOutlineIcon color="error" />
                }
              </ListItemIcon>
              <ListItemText primary={entry.token} />
            </ListItem>
          ))}
        </List>
      </Box>
    </section>
  );
}

export default HistorySection;