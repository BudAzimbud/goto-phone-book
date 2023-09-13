const debounce = (func: Function, wait: number) => {
    let timerId: any;
    return (...args: any) => {
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(() => {
            func(...args);
        }, wait);
    };
};

export {
    debounce
}