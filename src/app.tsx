import { appState, StateEvent } from './state';

export function App() {
    const [state] = appState.useState([StateEvent.UpdateIndex1]);

    console.log(`test:>`);

    return (
        <>
            <div>
                <button onClick={() => state.updateIndex1()}>
                    index1:{state.index1}
                </button>
                <button onClick={() => state.updateIndex2()}>
                    index2:{state.index2}
                </button>
                <button onClick={() => state.addInner()}>addInner</button>
                <div>
                    <div>sum: {state.index1 + state.index2}</div>
                    <button onClick={() => state?.inner?.updateIndex()}>
                        inner:{state?.inner?.index}
                    </button>
                </div>
            </div>
        </>
    );
}
