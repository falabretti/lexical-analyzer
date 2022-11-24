# Analisador Léxico

Este projeto implementa um analisador léxico de linguagens regulares que faz uso de um autômato finito em uma página web.

## Funcionalidades

- Adicionamento dinâmico de tokens reconhecíveis
- Reconhecimento de tokens
- Histórico de reconhecimento de tokens
- Exibição do autômato finito e seus estados em forma tabular
- Backtracking dos estados do autômato através do `backspace`

## Implementação

O código fonte é escrito em [Typescript](https://www.typescriptlang.org/), e usa o [React](https://reactjs.org/) como biblioteca para contrução da interface.

A lógica principal de como o autômato é implementado pode ser encontrado nas classes `Automaton` e `State`, ambos arquivos fonte localizados em `src/types`. Os demais arquivos em grande parte implementam a interface.

## Download

Você pode fazer o download da última versão em [releases](https://github.com/falabretti/lexical-analyzer/releases).

Para executar, descompacte o arquivo comprimido e abra o arquivo `index.html` em seu navegador.

## Compilar Código Fonte

> Se você quer somente executar a aplicação, verique as instruções em [Download](#download).

É necessário possuir o [NodeJS](https://nodejs.org/en/) >= `v16.17.1` em seu ambiente.

Na pasta raiz do projeto, instale as dependências rodando:
```
npm install
```

Execute o servidor de desenvolvimento com:
```
npm start
```

Ou compile a aplicação com:
```
npm run build
```