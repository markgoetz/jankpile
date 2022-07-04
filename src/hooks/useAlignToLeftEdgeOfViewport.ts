import React, { useEffect, useRef, useCallback } from 'react';

const useAlignToLeftEdgeOfViewport = <T extends HTMLElement>(): React.MutableRefObject<T | null> => {
    const ref = useRef<T | null>(null);

    const resize = useCallback(() => {
        if (ref.current != null ) {
            const { current } = ref;

            const prevLeft = parseInt(current.style.left, 10);
            const left = -(current.getBoundingClientRect().left - prevLeft);
            current.style.left = `${left}px`;
        }
    }, []);

    useEffect(
        () => {
            resize();

            window.addEventListener('resize', resize);
            return () => {
                window.removeEventListener('resize', resize);
            }
        },
        [resize]
    );

    return ref;
};

export default useAlignToLeftEdgeOfViewport;
