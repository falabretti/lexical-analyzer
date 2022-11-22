class Stack<T> {
    private data: T[] = [];

    push(item: T) {
        this.data.push(item);
    }

    pop() {
        if (this.empty()) {
            throw Error("Stack is empty.");
        }
        return this.data.pop() as T;
    }

    empty() {
        return this.data.length === 0;
    }
}

export default Stack;
