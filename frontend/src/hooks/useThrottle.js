import { useRef, useEffect, useCallback } from 'react';
import throttle from 'lodash/throttle';

export function useThrottle(cb, delay = 2000, options = { leading: true, trailing: true }) {
    // const options = { leading: true, trailing: false };
    const cbRef = useRef(cb);
    useEffect(() => {
        cbRef.current = cb;
    });
    return useCallback(
        throttle((...args) => cbRef.current(...args), delay, options),
        [delay]
    );
}
