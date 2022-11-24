import { Typography, Divider, Box, TextField, IconButton, Chip, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useContext, useState } from "react";
import { AutomatonContext, AutomatonContextType } from "../context/AutomatonContext";

function TokenSection() {

  const theme = useTheme();
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { tokens, addToken, removeToken } = useContext(AutomatonContext) as AutomatonContextType;

  function handleAddToken(token: string) {
    addToken(token);
    setValue("");
  }

  function handleDeleteToken(token: string) {
    removeToken(token);
  }

  function isValidToken(token: string) {
    if (/\s/g.test(token)) {
      setError("Token não pode ter espaços em branco.");
      return false;
    }

    if (tokens.find((entry) => entry === token)) {
      setError("Token já adicionado.");
      return false;
    }

    return true;
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    event.preventDefault();

    if (isValidToken(value)) {
      setError("");
    } else {
      return;
    }

    if (event.key === "Enter") {
      handleAddToken(value);
    }
  }

  return (
    <section >
      <Typography variant="h5" gutterBottom>Adicionar Tokens</Typography>
      <Divider />
      <Box sx={{ p: 2, pl: 0 }}>
        <TextField
          error={error.length > 0}
          helperText={error}
          label="Token"
          variant="outlined"
          value={value}
          onKeyUp={handleKeyPress}
          onChange={(event) => setValue(event.target.value.toLowerCase())}
          fullWidth
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
