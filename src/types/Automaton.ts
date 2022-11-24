import Stack from "./Stack";
import State from "./State";

type AutomatonHistoryEntry = {
    state: State,
    lastValidState?: State,
    lastSymbol?: string
}

class AutomatonIterator implements Iterator<State> {

    private stack: Stack<State> = new Stack();

    constructor(automaton: Automaton) {
        this.stack.push(automaton.initialState);
    }

    next(...args: [] | [undefined]): IteratorResult<State, any> {
        if (this.stack.empty()) {
            return {
                done: true,
                value: undefined
            };
        }

        const state = this.stack.pop();
        for (const [key, value] of Object.entries(state.mappings).reverse()) {
            this.stack.push(value);
        }

        return {
            done: false,
            value: state
        };
    }
}

class Automaton implements Iterable<State> {
    
    initialState: State;
    currentState: State;
    invalidState: State;
    lastValidState?: State;
    lastSymbol?: string;
    symbols: string[];
    history: Stack<AutomatonHistoryEntry> = new Stack();

    constructor (initialState: State) {
        this.initialState = initialState;
        this.currentState = initialState;
        this.invalidState = new State();
        this.symbols = [];
        this.postConstructor();
    }

    [Symbol.iterator](): Iterator<State, any, undefined> {
        return new AutomatonIterator(this);
    }

    private postConstructor() {

        var stateCounter = 0;
        const symbols = new Set<string>();

        for (const state of this) {
            state.label = "q" + stateCounter;
            stateCounter++;
            for (const key of Object.keys(state.mappings)) {
                symbols.add(key);
            }
        }

        this.symbols = Array.from(symbols).sort(); // set symbols
    }

    inputSymbol(symbol: string) {
        this.history.push({
            state: this.currentState,
            lastValidState: this.lastValidState,
            lastSymbol: this.lastSymbol
        });
        
        if (this.currentState !== this.invalidState) {
            this.lastValidState = this.currentState;
        }

        this.lastSymbol = symbol;

        if (symbol in this.currentState.mappings) {
            this.currentState = this.currentState.mappings[symbol];
        } else {
            this.currentState = this.invalidState;
        }
    }

    goBack() {
        if (this.history.empty()) {
            return;
        }

        const lastHistoryEntry = this.history.pop();
        this.currentState = lastHistoryEntry.state;
        this.lastValidState = lastHistoryEntry.lastValidState;
        this.lastSymbol = lastHistoryEntry.lastSymbol;
    }

    isValid() {
        return this.currentState.isFinal;
    }

    reset() {
        this.currentState = this.initialState;
        this.lastValidState = undefined;
        this.lastSymbol = undefined;
        this.history = new Stack();
    }

    isInInitialState() {
        return this.currentState === this.initialState;
    }

    clone() {
        const clone = new Automaton(this.initialState);
        Object.assign(clone, this);
        return clone;
    }

    static merge(...automatons: Automaton[]) {
        let initialState = new State();

        for (let automaton of automatons) {
            initialState = State.merge(initialState, automaton.initialState);
        }
    
        return new Automaton(initialState);
    }

    static fromSingleWord(word: string) {
        let initialState = new State();
        initialState.isInitial = true;
    
        let currentState = initialState;
    
        for (let symbol of word) {
            let state = new State();
            currentState.mappings[symbol] = state;
            currentState = state;
        }
    
        currentState.isFinal = true;
    
        return new Automaton(initialState);
    }

    static fromMultipleWords(words: string[]) {
        const automatons = []
        for (let word of words) {
            automatons.push(Automaton.fromSingleWord(word));
        }

        return Automaton.merge(...automatons);
    }

    static emptyAutomaton() {
        return new Automaton(new State());
    }
}

export default Automaton;
