export const debounce = (cb: (...args: any[]) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(timeoutId); 

    timeoutId = setTimeout(() => {
      cb(...args); 
    }, delay);
  };
};
