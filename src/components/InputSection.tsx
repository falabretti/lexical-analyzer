import { Box, Divider, TextField, Typography, useTheme } from "@mui/material";
import React, { useRef, useState } from "react";
import { useContext } from "react";
import { AutomatonContext, AutomatonContextType } from "../context/AutomatonContext";

function InputSection() {

  const { inputSymbol, resetAutomaton, insertHistory } = useContext(AutomatonContext) as AutomatonContextType;
  const [value, setValue] = useState<string>("");

  function handleInputToken(token: string) {
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

    if (event.key.length > 1) {
      return;
    }

    handleInputToken(value);
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
          onChange={(event) => setValue(event.target.value.toLowerCase().trimEnd())}
        />
      </Box>
    </section>
  );
}

export default InputSection;
