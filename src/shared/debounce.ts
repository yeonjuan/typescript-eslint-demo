type Func<T = unknown> = (...args: T[]) => void;

export function debounce(func: Func, delayMs: number): Func {
  let timer: null | ReturnType<typeof setTimeout> = null;
  return function call(...args: Parameters<Func>) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      func(...args);
    }, delayMs);
  };
}
