## 有没有更好用的 api

bindFn 太恶心了 有没有更好的方式

```ts
useState: (eventList?: string[], bindFn?: BindFn)

---
// 这样是不是好些
useState();

// 下面这两个有意思吗
useStateEffect(state, () => {}, [event_list]);
useStateMemo(state, () => {}, [event_list]);
useStateCallback(state, () => {}, [event_list]);

// 能不能只绑定event，即使是appState.inner的修改也只是监听inner的event
// State的event就需要向上回流，最好能带上自身的 inner:InnerEvent.UpdateIndex1
// 这样就可以了 -> event 不能重复

```
