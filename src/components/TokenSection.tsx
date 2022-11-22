import { Typography, Divider, Box, TextField, IconButton, Chip, ListItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";

function TokenSection() {

  const [value, setValue] = useState<String>("");
  const [tokens, setTokens] = useState<String[]>([]);

  function handleAddToken(token: String) {
    // TODO validate spaces
    // TODO validate empty
    // TODO validate duplicates
    setTokens([...tokens, token]);
    setValue("");
  }

  function handleDeleteToken(token: String) {
    setTokens(tokens.filter((t) => t !== token));
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    event.preventDefault();
    if (event.key === "Enter") {
      handleAddToken(value);
    }
  }

  return (
    <section >
      <Typography variant="h6" gutterBottom>Add Tokens</Typography>
      <Divider />
      <Box sx={{ p: 2, pl: 0 }}>
        <TextField
          label="Token"
          variant="outlined"
          value={value}
          onKeyUp={handleKeyPress}
          onChange={(event) => setValue(event.target.value)}
          InputProps={{
            endAdornment:
              <IconButton onClick={() => handleAddToken(value)}>
                <AddIcon />
              </IconButton>
          }}
        />
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 1,
        p: 0.5,
        pl: 0,
        m: 0,
      }}>
        {tokens.map((token, id) => (
          <Chip
            key={id}
            label={token}
            onDelete={() => handleDeleteToken(token)}
          />
        ))}
      </Box>
    </section>
  );
}

export default TokenSection;
