import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
    trigger: React.ReactNode,
};

const ResponsiveDropdown: React.FC<Props> = ({ trigger, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [left, setLeft] = useState(0);
    const childrenRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

    useEffect(
        () => {
            if (childrenRef.current != null && left === 0) {
                setLeft(-childrenRef.current.getBoundingClientRect().left);
            }
        },
        [left]
    );

    const childrenClassName = clsx(
        'c-responsive-dropdown__children',
        { 'c-responsive-dropdown__children--open': isOpen }
    );

    return (
        <div className="c-responsive-dropdown">
            <button
                className="c-responsive-dropdown__trigger"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
            >
                {trigger}
            </button>
            <div className={childrenClassName} ref={childrenRef} style={{ left }}>
                {children}
            </div>
        </div>
    );
};

export default ResponsiveDropdown;
