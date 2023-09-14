const debounce = (func: Function, wait: number) => {
    let timerId: ReturnType<typeof setTimeout>;

    return (...args: any) => {
        clearTimeout(timerId);

        timerId = setTimeout(() => {
            func(...args);
        }, wait);
    };
};

export { debounce };
