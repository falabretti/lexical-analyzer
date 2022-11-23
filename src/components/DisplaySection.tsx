import React, { useContext } from 'react';
import { Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { AutomatonContext, AutomatonContextType } from "../context/AutomatonContext";
import State from "../types/State";

const cellBorderValue = "2px solid rgba(224, 224, 224, 1)";

type DisplayTableHeadProps = {
  symbols: string[]
}

type DisplayTableBodyProps = {
  symbols: string[],
  states: State[]
}

function DisplayTableHead(props: DisplayTableHeadProps) {

  const { symbols } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ borderBottom: "none" }} />
        <TableCell sx={{ border: cellBorderValue }} align="center">
          <Typography>δ</Typography>
        </TableCell>
        {symbols.map((symbol, id) => (
          <TableCell key={id} sx={{ border: cellBorderValue }} align="center">
            <Typography>{symbol}</Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function DisplayTableBody(props: DisplayTableBodyProps) {

  const { symbols, states } = props;

  return (
    <TableBody>
      {states.map((state, id) => (
        <TableRow key={id}>
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

  const { automaton } = useContext(AutomatonContext) as AutomatonContextType;

  const symbols = automaton.symbols;
  const states = Array.from(automaton);

  return (
    <section>
      <Typography variant="h5" gutterBottom>View Automaton</Typography>
      <Divider />
      <TableContainer sx={{ marginTop: 2 }}>
        <Table>
          <DisplayTableHead symbols={symbols} />
          <DisplayTableBody symbols={symbols} states={states} />
        </Table>
      </TableContainer>
    </section>
  );
}

export default DisplaySection;
