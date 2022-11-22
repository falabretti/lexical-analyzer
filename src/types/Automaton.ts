import State from "./State";

class Automaton {
    initialState: State;
    currentState: State;
    invalidState: State;

    constructor (initialState: State) {
        this.initialState = initialState;
        this.currentState = initialState;
        this.invalidState = new State();
    }

    next(symbol: string) {
        if (symbol in this.currentState.mappings) {
            this.currentState = this.currentState.mappings[symbol];
        } else {
            this.currentState = this.invalidState;
        }
    }

    isValid() {
        return this.currentState.isFinal;
    }

    reset() {
        this.currentState = this.initialState;
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
