import React, { useContext } from 'react';
import { Typography } from "@mui/material";
import { AutomatonContext, AutomatonContextType } from "../context/AutomatonContext";

function DisplaySection() {

  const { automaton } = useContext(AutomatonContext) as AutomatonContextType;


  return (
    <pre>
      <Typography sx={{ fontFamily: 'monospace' }}>{JSON.stringify(automaton, null, 4)}</Typography>
    </pre>
  );
}

export default DisplaySection;
