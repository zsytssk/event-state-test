import { appState } from './state';

export function App() {
    const [state] = appState.useState(undefined, (triggerFn) => {
        const off = state.inner?.bind(triggerFn);
        return off;
    });

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

                {/* <div>
                    <span>sum:{sum}</span>
                    <div>
                        {state?.inner ? (
                            <button onClick={() => state?.inner?.updateIndex()}>
                                inner:{inner?.index}
                            </button>
                        ) : null}
                    </div>
                </div> */}
            </div>
        </>
    );
}
