import React from 'react';
import { appState } from './state';

export function App() {
    const [state] = appState.useState();
    const { sum, inner } = state.useSelector(
        (state) => {
            return {
                sum: state.index1 + state.index2,
                inner: state.inner,
            };
        },
        undefined,
        (triggerFn) => {
            const off = state.inner?.bind(triggerFn);
            return off;
        },
    );

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
                <button onClick={() => state?.inner?.updateIndex()}>
                    inner:{inner?.index}
                </button>

                <div>
                    <span>sum:{sum}</span>
                </div>
            </div>
        </>
    );
}
