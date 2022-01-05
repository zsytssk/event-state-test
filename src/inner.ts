import { EventState } from 'react-event-state';

export const InnerEvent = {
    UpdateIndex1: 'inner:UpdateIndex1',
    UpdateIndex2: 'inner:UpdateIndex2',
};

export class Inner extends EventState {
    public index = 0;
    constructor(parent: EventState) {
        super([...Object.values(InnerEvent)], parent);
    }
    public updateIndex() {
        this.index += 1;
        this.emit(InnerEvent.UpdateIndex1);
    }
}
