import React, { HTMLProps } from 'react';
import clsx from 'clsx';

type Props = HTMLProps<HTMLButtonElement> & {
    style?: 'primary' | 'secondary',
    type?: 'button' | 'reset' | 'submit',
};

const Button: React.FC<Props> = ({ style = 'primary', type = 'button', children, ...buttonProps }) => {
    const className = clsx(
        'c-btn',
        { 'c-btn--secondary': style === 'secondary' },
    );

    return (
        <button type={type} {...buttonProps} className={className}>
            {children}
        </button>
    );
};

export default Button;
