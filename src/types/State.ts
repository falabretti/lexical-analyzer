class State {
    isInitial: boolean = false;
    isFinal: boolean = false;
    mappings: Record<string, State> = {};

    static merge(a: State, b: State) {

        let state = new State();
        Object.assign(state, a);
    
        for (let [key, value] of Object.entries(b.mappings)) {
            if (key in a.mappings) {
                state.mappings[key] = State.merge(state.mappings[key], value);
            } else {
                state.mappings[key] = value;
            }
        }
    
        state.isInitial = state.isInitial || b.isInitial;
        state.isFinal = state.isFinal || b.isFinal;
    
        return state;
    }
}

export default State;
