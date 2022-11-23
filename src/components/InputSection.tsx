import { Box, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, TextField, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { AutomatonContext, AutomatonContextType } from "../context/AutomatonContext";

function InputSection() {

  const { automaton, inputSymbol, resetAutomaton, insertHistory } = useContext(AutomatonContext) as AutomatonContextType;
  const theme = useTheme();
  const [value, setValue] = useState<string>('');

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
      insertHistory(value);
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
    </section>
  );
}

export default InputSection;
