import { EventState } from 'react-event-state';

const InnerEvent = {
    UpdateIndex1: 'UpdateIndex1',
    UpdateIndex2: 'UpdateIndex2',
};
export class Inner extends EventState {
    public index = 0;
    constructor() {
        super([InnerEvent.UpdateIndex1, InnerEvent.UpdateIndex2]);
    }
    public updateIndex() {
        this.index += 1;
        this.emit(InnerEvent.UpdateIndex1);
    }
}
