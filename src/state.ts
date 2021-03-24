import { EventState } from 'react-event-state';
import { Inner } from './inner';

const StateEvent = {
    UpdateIndex1: 'UpdateIndex1',
    UpdateIndex2: 'UpdateIndex2',
};
class State extends EventState {
    public index1 = 0;
    public index2 = 0;
    public inner: Inner;
    constructor() {
        super([StateEvent.UpdateIndex1, StateEvent.UpdateIndex2]);
        this.inner = new Inner();
    }
    public updateIndex1() {
        this.index1 += 1;
        this.emit(StateEvent.UpdateIndex1);
    }
    public updateIndex2() {
        this.index2 += 1;
        this.emit(StateEvent.UpdateIndex2);
    }
}
export const appState = new State();