import React, { createContext, ReactNode, useEffect, useState } from 'react';
import Automaton from "../types/Automaton";

export type AutomatonContextType = {
  tokens: string[],
  addToken: (token: string) => void,
  removeToken: (token: string) => void,
  automaton: Automaton,
  inputSymbol: (token: string) => void,
  goBack: () => void,
  resetAutomaton: () => void
  history: TokenHistory[],
  insertHistory: (token: string) => void
}

type Props = {
  children: ReactNode
}

type TokenHistory = {
  token: string,
  valid: boolean
}

export const AutomatonContext = createContext<AutomatonContextType | null>(null);

export function AutomatonProvider(props: Props) {

  const [tokens, setTokens] = useState<string[]>([]);
  const [history, setHistory] = useState<TokenHistory[]>([]);
  const [automaton, setAutomaton] = useState<Automaton>(Automaton.emptyAutomaton());

  function addToken(token: string) {
    setTokens([...tokens, token]);
  }

  function removeToken(token: string) {
    setTokens(tokens.filter((t) => t !== token));
  }

  function inputSymbol(symbol: string) {
    automaton.inputSymbol(symbol);
    setAutomaton(automaton.clone());
  }

  function goBack() {
    automaton.goBack();
    setAutomaton(automaton.clone());
  }

  function resetAutomaton() {
    automaton.reset();
    setAutomaton(automaton.clone());
  }

  function insertHistory(token: string) {
    setHistory([{ token, valid: automaton.isValid() }, ...history])
  }

  useEffect(() => {
    setAutomaton(Automaton.fromMultipleWords(tokens));
  }, [tokens]);

  return (
    <AutomatonContext.Provider value={{
      tokens, addToken, removeToken,
      automaton, inputSymbol, goBack, resetAutomaton,
      history, insertHistory
    }}>
      {props.children}
    </AutomatonContext.Provider>
  )
}
