// hooks/useDebounce.ts
import { useEffect, useState } from 'react';

/**
 * Custom hook that debounces a value
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Set up a timer to update the debounced value after the delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Clean up the timer if value changes before delay completes
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // Re-run effect when value or delay changes

    return debouncedValue;
}

// Alternative version with immediate first call (useful for initial load)
export function useDebounceImmediate<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        // On first render, set value immediately
        if (isFirstRender) {
            setDebouncedValue(value);
            setIsFirstRender(false);
            return;
        }

        // For subsequent changes, use debounce
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay, isFirstRender]);

    return debouncedValue;
}

// Advanced version with cancel function
export function useDebounceWithCancel<T>(value: T, delay: number): [T, () => void] {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    const cancel = () => {
        setDebouncedValue(value);
    };

    return [debouncedValue, cancel];
}
