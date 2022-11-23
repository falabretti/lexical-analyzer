import { Typography, Divider, Box, TextField, IconButton, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useContext, useState } from "react";
import { AutomatonContext, AutomatonContextType } from "../context/AutomatonContext";

function TokenSection() {

  const [value, setValue] = useState<string>("");
  const { tokens, addToken, removeToken } = useContext(AutomatonContext) as AutomatonContextType;

  function handleAddToken(token: string) {
    // TODO validate spaces
    // TODO validate empty
    // TODO validate duplicates
    // TODO case insensitive
    addToken(token);
    setValue("");
  }

  function handleDeleteToken(token: string) {
    removeToken(token);
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    event.preventDefault();
    if (event.key === "Enter") {
      handleAddToken(value);
    }
  }

  return (
    <section >
      <Typography variant="h5" gutterBottom>Add Tokens</Typography>
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
