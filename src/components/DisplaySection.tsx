import React, { useContext } from 'react';
import { Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { lightGreen, red } from "@mui/material/colors";
import { AutomatonContext, AutomatonContextType } from "../context/AutomatonContext";
import State from "../types/State";

const cellBorderValue = "2px solid rgba(224, 224, 224, 1)";

function DisplayTableHead() {

  const { automaton } = useContext(AutomatonContext) as AutomatonContextType;
  const { symbols, lastSymbol } = automaton;

  function calcBackgroundColor(symbol: string) {
    if (!automaton.isInInitialState() && symbol === lastSymbol) {
      return lightGreen[200];
    }
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ borderBottom: "none" }} />
        <TableCell sx={{ border: cellBorderValue }} align="center">
          <Typography>δ</Typography>
        </TableCell>
        {symbols.map((symbol, id) => (
          <TableCell key={id} align="center"
            sx={{ border: cellBorderValue, backgroundColor: calcBackgroundColor(symbol) }}
          >
            <Typography>{symbol}</Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function DisplayTableBody() {

  const { automaton } = useContext(AutomatonContext) as AutomatonContextType;
  const { currentState, invalidState, lastValidState, symbols } = automaton;
  const states = Array.from(automaton);

  function calcRowBackgroundColor(state: State) {
    if (state === currentState) {
      return lightGreen[500];
    } else if (state === lastValidState) {
      if (currentState === invalidState) {
        return red[500];
      } else {
        return lightGreen[200];
      }
    }
  }

  return (
    <TableBody>
      {states.map((state, id) => (
        <TableRow key={id} sx={{ backgroundColor: calcRowBackgroundColor(state) }} >
          <TableCell sx={{ width: "10ch", borderBottom: "none" }} align="center">
            <Typography sx={{ fontSize: "150%" }}>
              {state.isInitial && "→"} {state.isFinal && "*"}
            </Typography>
          </TableCell>
          <TableCell sx={{ border: cellBorderValue }} align="center">
            {state.label}
          </TableCell>
          {symbols.map((symbol, id) => (
            <TableCell key={id} sx={{ border: cellBorderValue }} align="center">
              <Typography>{state.mappings[symbol] ? state.mappings[symbol].label : "-"}</Typography>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}

function DisplaySection() {

  return (
    <section>
      <Typography variant="h5" gutterBottom>View Automaton</Typography>
      <Divider />
      <TableContainer sx={{ marginTop: 2 }}>
        <Table>
          <DisplayTableHead />
          <DisplayTableBody />
        </Table>
      </TableContainer>
    </section>
  );
}

export default DisplaySection;
