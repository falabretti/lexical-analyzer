import React, { createContext, ReactNode, useState } from 'react';

export type AutomatonContextType = {
  tokens: string[],
  addToken: (token: string) => void,
  removeToken: (token: string) => void
}

type Props = {
  children: ReactNode
}

export const AutomatonContext = createContext<AutomatonContextType | null>(null);

export function AutomatonProvider(props: Props) {

  const [tokens, setTokens] = useState<string[]>([]);

  function addToken(token: string) {
    setTokens([...tokens, token]);
  }

  function removeToken(token: string) {
    setTokens(tokens.filter((t) => t !== token));
  }

  return (
    <AutomatonContext.Provider value={{ tokens, addToken, removeToken }}>
      {props.children}
    </AutomatonContext.Provider>
  )
}
