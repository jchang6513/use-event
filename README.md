# use-event-handler

A simple React Hook for listening events of HTML element

## Installation

```bash
$ yarn add use-event-handler
```

## Usage

```tsx
export default () => {
  const ref = useRef<HTMLDivElement>(null);
  useEvent('click', event => console.log(event), { element: ref.current });

  return <div ref={ref} />;
};
```


## API

`useEvent(type, handler, options)`

- type*: A string of [event name](https://developer.mozilla.org/en-US/docs/Web/Events)
- handler*: A function that will be called whenever `eventName` trigger on `element`.
- options: An object of `{ element?: Element, capture?: boolean, passive?: boolean, once?: boolean }`, where element is the element to add the event listener, and others will be passed to `addEvenetListener`. [MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
