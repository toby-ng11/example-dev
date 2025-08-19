import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback, useMemo } from 'react';

export function useTanStackQuery<TData>(
    url: string,
    queryKey: (string | number | boolean)[],
    enabled?: boolean,
    params?: Record<string, unknown>,
    options?: Omit<UseQueryOptions<TData[], Error>, 'queryKey' | 'queryFn'>,
) {
    const memoizedQueryKey = useMemo(() => {
        // Include params in queryKey if they exist to ensure proper cache invalidation
        return params ? [...queryKey, params] : queryKey;
    }, [queryKey, params]);

    // Memoize queryFn to prevent recreation on every render
    const queryFn = useCallback(async () => {
        const res = await axios.get<TData[]>(url, {
            params,
        });
        return res.data;
    }, [url, params]);

    return useQuery<TData[], Error>({
        queryKey: memoizedQueryKey,
        queryFn,
        enabled,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        ...options,
    });
}
