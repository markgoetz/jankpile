import React from 'react';
import clsx from 'clsx';

type Props = {
    size: 'large' | 'medium' | 'small';
}

const Heading: React.FC<Props> = ({ size, children }) => {
    const className = clsx(
        'u-txt',
        'u-txt--heading',
        'u-txt--color-primary',
        'u-txt--weight-black',
        {
            'u-txt--36': size === 'large',
            'u-txt--24': size === 'medium',
            'u-txt--20': size === 'small',
        }
    );

    return (
        <span className={className}>
            {children}
        </span>
    )
};

export default Heading;
