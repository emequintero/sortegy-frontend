export class Animation {
    constructor(state: string, values: number[]) {
        this.state = state;
        this.values = values;
    }
    state: string;
    values: number[];
}