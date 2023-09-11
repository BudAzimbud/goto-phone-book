const debounce = (func: Function, wait: number) => {
    let timerId;
    return (...args) => {
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(() => {
            func(...args);
        }, wait);
    };
};

export {
    debounce
}