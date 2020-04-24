export class Animation {
    constructor(state: String, values: number[]) {
        this.state = state;
        this.values = values;
    }
    state: String;
    values: number[];
}