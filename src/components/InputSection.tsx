import { Box, Divider, TextField, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { AutomatonContext, AutomatonContextType } from "../context/AutomatonContext";

function InputSection() {

  const theme = useTheme();
  const [value, setValue] = useState<string>('');
  const { inputSymbol, resetAutomaton } = useContext(AutomatonContext) as AutomatonContextType;

  function handleInputToken(token: string) {
    // TODO case insensitive
    // TODO handle copy paste
    // TODO handle cursor position
    // TODO handle backspace
    console.log(token);
    inputSymbol(token.slice(-1));
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    event.preventDefault();
    handleInputToken(value);
    if (event.key === "Enter" || event.key === " ") {
      setValue("");
      resetAutomaton();
    }
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
          sx={{
            width: 0.35,
            [theme.breakpoints.down("md")]: {
              width: 1
            }
          }}
          onChange={(event) => setValue(event.target.value.trimEnd())}
        />
      </Box>
    </section>
  );
}

export default InputSection;
