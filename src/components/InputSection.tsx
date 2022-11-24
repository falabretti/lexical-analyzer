import { Box, Divider, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useRef, useState } from "react";
import { useContext } from "react";
import { AutomatonContext, AutomatonContextType } from "../context/AutomatonContext";

function InputSection() {

  const { inputSymbol, goBack, resetAutomaton, insertHistory } = useContext(AutomatonContext) as AutomatonContextType;
  const [value, setValue] = useState<string>("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value.toLowerCase().trimEnd();

    if (newValue.length > value.length) {
      inputSymbol(newValue.slice(-1)); 
    }

    setValue(newValue);
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    event.preventDefault();

    if (event.key === "Enter" || event.key === " ") {
      insertHistory(value);
      setValue("");
      resetAutomaton();
      return;
    }

    if (event.key === "Backspace") {
      goBack();
    }
  }

  function moveCursorToEnd(target: HTMLInputElement) {
    target.selectionStart = target.value.length;
    target.selectionEnd = target.value.length;
  }

  return (
    <section>
      <Typography variant="h5" gutterBottom>Recognize Tokens</Typography>
      <Divider />
      <Box sx={{ p: 2, pl: 0 }}>
        <TextField
          inputProps={{
            onFocus: (e) => moveCursorToEnd(e.target as HTMLInputElement),
            onMouseUp: (e) => moveCursorToEnd(e.target as HTMLInputElement),
            onMouseDown: (e) => moveCursorToEnd(e.target as HTMLInputElement),
            onKeyUp: (e) => moveCursorToEnd(e.target as HTMLInputElement),
            onKeyDown: (e) => moveCursorToEnd(e.target as HTMLInputElement)
          }}
          label="Token"
          variant="outlined"
          value={value}
          onKeyUp={handleKeyPress}
          onPaste={e => e.preventDefault()}
          fullWidth
          onChange={handleChange}
        />
      </Box>
    </section>
  );
}

export default InputSection;
