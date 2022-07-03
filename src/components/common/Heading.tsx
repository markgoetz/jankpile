import React from 'react';
import clsx from 'clsx';

type Props = {
    size: 'large' | 'medium' | 'small';
    tag: 'h1' | 'h2' | 'h3' | 'span';
}

const Heading: React.FC<Props> = ({ size, children, tag }) => {
    const className = clsx(
        'u-txt',
        'u-txt--heading',
        'u-txt--color-primary',
        'u-txt--weight-black',
        {
            'u-txt--24 u-txt--36@sm': size === 'large',
            'u-txt--20 u-txt--24@sm': size === 'medium',
            'u-txt--16 u-txt--20@sm': size === 'small',
        }
    );

    if (tag === 'h1') {
        return <h1 className={className}>{children}</h1>;
    }

    if (tag === 'h2') {
        return <h2 className={className}>{children}</h2>;
    }

    if (tag === 'h3') {
        return <h3 className={className}>{children}</h3>;
    }

    return <span className={className}>{children}</span>;
};

export default Heading;
