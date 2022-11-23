import { Box, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, TextField, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { AutomatonContext, AutomatonContextType } from "../context/AutomatonContext";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

type TokenHistory = {
  token: string,
  valid: boolean
}

function InputSection() {

  const { automaton, inputSymbol, resetAutomaton } = useContext(AutomatonContext) as AutomatonContextType;
  const theme = useTheme();
  const [value, setValue] = useState<string>('');
  const [history, setHistory] = useState<TokenHistory[]>([]);

  function handleInputToken(token: string) {
    // TODO case insensitive
    // TODO handle copy paste
    // TODO handle cursor position
    // TODO handle backspace
    // TODO handle fast typing
    inputSymbol(token.slice(-1));
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    event.preventDefault();

    if (event.key === "Enter" || event.key === " ") {
      setHistory([{ token: value, valid: automaton.isValid() }, ...history])
      setValue("");
      resetAutomaton();
      return;
    }

    handleInputToken(value);
  }

  return (
    <section>
      <Typography variant="h5" gutterBottom>Recognize Tokens</Typography>
      <Divider />
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ p: 2, pl: 0 }}>
            <TextField
              label="Token"
              variant="outlined"
              value={value}
              onKeyUp={handleKeyPress}
              fullWidth
              onChange={(event) => setValue(event.target.value.trimEnd())}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ p: 1 }}>
            <Typography variant="h6">History</Typography>
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
        </Grid>
      </Grid>
    </section>
  );
}

export default InputSection;
