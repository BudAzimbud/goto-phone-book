import { debounce } from "@/helper/debounce";

describe('debounce', () => {
    jest.useFakeTimers(); // Mock timers to control setTimeout and clearTimeout

    it('should debounce the function', () => {
        const mockFn = jest.fn();
        const debouncedFn = debounce(mockFn, 100);

        // Call the debounced function multiple times in a short interval
        debouncedFn();
        debouncedFn();
        debouncedFn();

        // Ensure that the debounced function was not called immediately
        expect(mockFn).not.toHaveBeenCalled();

        // Advance timers by 100ms
        jest.advanceTimersByTime(100);

        // Ensure that the debounced function was called only once after waiting for 100ms
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should debounce with the provided wait time', () => {
        const mockFn = jest.fn();
        const debouncedFn = debounce(mockFn, 200);

        // Call the debounced function
        debouncedFn();

        // Advance timers by 100ms (less than the debounce time)
        jest.advanceTimersByTime(100);

        // Call the debounced function again
        debouncedFn();

        // Ensure that the debounced function was not called immediately
        expect(mockFn).not.toHaveBeenCalled();

        // Advance timers by another 100ms (total 200ms)
        jest.advanceTimersByTime(100);

        // Ensure that the debounced function was called only once after waiting for 200ms
        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});
