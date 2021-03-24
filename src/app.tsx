import { useEffect } from 'react';
import { appState } from './state';

export function App() {
    const [state, stateId] = appState.useState();
    const { sum, inner } = state.useSelector(
        (state) => {
            return {
                sum: state.index1 + state.index2,
                inner: state.inner,
            };
        },
        undefined,
        (triggerFn) => {
            /** 绑定 state.inner 的修改 */
            const off = state.inner?.bind(triggerFn);
            return off;
        },
    );

    useEffect(() => {
        console.log(`state has change`);
    }, [stateId]);

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
                    <span>sum:{sum}</span>
                    <div>
                        {state?.inner ? (
                            <button onClick={() => state?.inner?.updateIndex()}>
                                inner:{inner?.index}
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
}
