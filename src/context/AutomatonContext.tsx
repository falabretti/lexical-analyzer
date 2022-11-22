import React, { createContext, ReactNode, useEffect, useState } from 'react';
import Automaton from "../types/Automaton";

export type AutomatonContextType = {
  tokens: string[],
  addToken: (token: string) => void,
  removeToken: (token: string) => void,
  automaton: Automaton
}

type Props = {
  children: ReactNode
}

export const AutomatonContext = createContext<AutomatonContextType | null>(null);

export function AutomatonProvider(props: Props) {

  const [tokens, setTokens] = useState<string[]>([]);
  const [automaton, setAutomaton] = useState<Automaton>(Automaton.emptyAutomaton());

  function addToken(token: string) {
    setTokens([...tokens, token]);
  }

  function removeToken(token: string) {
    setTokens(tokens.filter((t) => t !== token));
  }

  useEffect(() => {
    setAutomaton(Automaton.fromMultipleWords(tokens));
  }, [tokens]);

  return (
    <AutomatonContext.Provider value={{ tokens, addToken, removeToken, automaton }}>
      {props.children}
    </AutomatonContext.Provider>
  )
}
