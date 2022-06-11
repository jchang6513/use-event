import { useEffect, useMemo } from 'react';

type Options = {
  element?: Element | Window;
  once?: boolean;
  passive?: boolean;
  capture?: boolean;
};

const useEvent = (
  type: keyof WindowEventMap,
  listener: EventListener,
  options: Options = {}
) => {
  const { element, once, passive, capture } = options;

  const el = useMemo(() => element || window, [element]);

  useEffect(() => {
    if (!el || !el.addEventListener || !el.removeEventListener) return;

    const opts = { once, passive, capture };

    el.addEventListener(type, listener, opts);

    return () => {
      el.removeEventListener(type, listener, opts);
    };
  }, [el, listener, type, once, passive, capture]);
};

export default useEvent;
