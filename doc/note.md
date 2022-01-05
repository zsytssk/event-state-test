在 react 开发过程中常常需要数据管理，redux 无疑是其中的用的最多的。
我在使用 redux 的过程中，觉得他太复杂太绕了，尤其是在 hook 出现之前。
hook 出现之后虽然有好转，但是我用起来，还是谈不上舒服；

我在漫长的开发过程中，有很长的时间从事 h5 游戏开发，对于数据管理形成自己的一种方法；
自己创造的东西，用起来自然得心应手，它也十分的简单方便；
我总想能不能把它用在 react 开发过程中？
正好 hook 来了，总算有了可能，我在工作中不断的尝试，最终达到自己的目标 -- 可用+简单+方便；

它这就是 [react-event-state](https://github.com/zsytssk/event-state)

## 原理

它的原理正与它的名字，通过事件来监听数据的改变；你改变数据你就分发事件，在需要的地方监听需要的事件；
它的代码十分的简单

-   [event.ts](https://github.com/zsytssk/event-state/blob/master/event.ts) 事件管理类，
-   [hook.ts](https://github.com/zsytssk/event-state/blob/master/hooks.ts) 一个 hook 生成器，监听事件创建 useState(), useSelector()
-   [index.ts](https://github.com/zsytssk/event-state/blob/master/index.ts) 一个继承 Event，同时组合 useState(), useSelector()的类

## 使用

首先你需要安装 react-event-state

```
npm install react-event-state
```

首先你需要创建一个数据类

```ts
import { EventState } from 'react-event-state';

const StateEvent = {
    UpdateIndex1: 'UpdateIndex1',
    UpdateIndex2: 'UpdateIndex2',
};
class State extends EventState {
    public index1 = 0;
    public index2 = 0;
    constructor() {
        super([StateEvent.UpdateIndex1, StateEvent.UpdateIndex2]);
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
```

数据类 State 上面有 index1 和 index2 两个数据需要改变，有两个事件 StateEvent.UpdateIndex1|UpdateIndex2;
更新 index1 触发 StateEvent.UpdateIndex1，index2 改变触发 StateEvent.UpdateIndex2；

然后就是见证奇迹的地方了：

```ts
//app.tsx
import { appState } from './state';
import { useEffect } from 'react';

export function App() {
    const [state, stateId] = appState.useState();
    const { sum } = appState.useSelector((state) => {
        return { sum: state.index1 + state.index2 };
    });

    useEffect(() => {
        console.log(`state change`);
    }, [stateId]);

    return (
        <>
            <button onClick={() => state.updateIndex1()}>
                index1:{state.index1}
            </button>
            <button onClick={() => state.updateIndex2()}>
                index2:{state.index2}
            </button>
            <span>{sum}</span>
        </>
    );
}
```

就这么简单，`const [state, stateId] = appState.useState()` 只要这样就可以使用数据了，每次 state 内属性发生改变 state 本身并不会变化， 如果你需要监听 state 改变去做某些事情，监听`stateId`就可以了；还有一个贴心的 `useSelector` 就像 redux 一样使用；
在实际的项目中你可以创建任意多的这个类， 也可以把这些类串联；是不是十分的简单，so easy，再也不用担心我的数据管理了；

## 进阶

它的原理是监听事件改变，每次数据改变，并不会创建新的对象，也不用对比对象，这显然比 redux 的的方式更加的高效；

-   如果你只想监听 index1 的改变怎么办？useState 默认监听所有的事件，只要传人在使用的时候`[StateEvent.UpdateIndex1]`就可以只用监听 index1；

```ts
class State extends EventState {
    ...
    public inner: Inner;
    ...
}
```

你在使用数据的时候，不可能只用一个类，如果有多个类串联就像上面的代码 State 下有一个 inner 怎么办；
`appState.useState()` 只会默认监听 appState.eventList 中的事件，如何保证在 Inner 改变之后触发改变呢？
react-event-state 的原理是事件，Inner 下的事件 并不会在 State 上触发，如果你想要这个功能在 inner 初始化的时候将 State 的实例作为对象当作 super 第二个参数就可以了，这样所有 event 的事件都会在 parent 上触发

```ts
class Inner extends EventState {
    ...
    constructor(parent: EventState) {
        super([...Object.values(InnerEvent)], parent);
    }
    ...
}

```

useSelector 的使用方法和 useState 类似

[完整的示例代码](https://github.com/zsytssk/event-state-test)

## 其他

也许未来我可以用一个 EventMap 来管理监听的事件...
