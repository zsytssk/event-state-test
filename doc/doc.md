## 有没有更好用的 api

bindFn 太恶心了 有没有更好的方式

```ts
useState: (eventList?: string[], bindFn?: BindFn)

---
// 这样是不是好些
useState((bindFn) => {
    bindFn(state.inner, []);
});

// 下面这两个有意思吗
useStateEffect(state, () => {}, [event_list]);
useStateMemo(state, () => {}, [event_list]);
useStateCallback(state, () => {}, [event_list]);
```
