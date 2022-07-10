import clsx from 'clsx';
import React, { useState } from 'react';
import useAlignToLeftEdgeOfViewport from '../../hooks/useAlignToLeftEdgeOfViewport';

type Props = {
    trigger: React.ReactNode,
};

const ResponsiveDropdown: React.FC<Props> = ({ trigger, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const childrenRef = useAlignToLeftEdgeOfViewport<HTMLDivElement>();

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
            <div className={childrenClassName} ref={childrenRef}>
                {children}
            </div>
        </div>
    );
};

export default ResponsiveDropdown;
