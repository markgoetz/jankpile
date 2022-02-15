import React, { HTMLProps } from 'react';
import clsx from 'clsx';

type Props = HTMLProps<HTMLButtonElement> & {
    variation?: 'primary' | 'secondary',
    type?: 'button' | 'reset' | 'submit',
    shape?: 'circle' | 'square',
};

const Button: React.FC<Props> = ({ variation = 'primary', type = 'button', shape = 'circle', children, ...buttonProps }) => {
    const className = clsx(
        'c-btn',
        {
            'c-btn--secondary': variation === 'secondary',
            'c-btn--square': shape === 'square',
        },
    );

    return (
        <button type={type} {...buttonProps} className={className}>
            {children}
        </button>
    );
};

export default Button;
