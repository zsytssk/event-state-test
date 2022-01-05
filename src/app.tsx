import { useEffect } from 'react';
import { InnerEvent } from './inner';
import { appState, StateEvent } from './state';

export function App() {
    const [state1, state1Id] = appState.useState([StateEvent.UpdateIndex1]);
    const [state, stateId] = appState.useState();
    const [stateWithInner, stateWithInnerId] = appState.useState([
        ...Object.values(StateEvent),
        ...Object.values(InnerEvent),
    ]);

    useEffect(() => {
        console.log(`listen only StateEvent.UpdateIndex1`);
    }, [state1Id]);

    useEffect(() => {
        console.log(`listen all StateEvent`);
    }, [stateId]);

    useEffect(() => {
        console.log(`listen all StateEvent and InnerEvent`);
    }, [stateWithInnerId]);

    return (
        <>
            <div>
                <button onClick={() => state1.updateIndex1()}>
                    index1:{state1.index1}
                </button>
                <button onClick={() => state.updateIndex2()}>
                    index2:{state.index2}
                </button>
                <button onClick={() => state.addInner()}>addInner</button>
                <div>
                    <div>sum: {state.index1 + state.index2}</div>
                    <button
                        onClick={() => stateWithInner?.inner?.updateIndex()}
                    >
                        inner:{stateWithInner.inner?.index}
                    </button>
                </div>
            </div>
        </>
    );
}
