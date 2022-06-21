import React from 'react';
import Heading from './common/Heading';

const MobileNotice: React.FC = () => {
    return (
        <div className="u-visible--sm o-notice">
            <div className="o-notice__inner">
                <Heading size="large" tag="h1">Oh dear.</Heading>
                <div className="u-vr--x2" />
                <span className="u-txt u-txt--color-black u-txt--24">
                    Jankpile is meant to be viewed on devices at least 1024 pixels wide.  Please expand your browser width if you can!
                </span>
            </div>
        </div>
    );
};

export default MobileNotice;
