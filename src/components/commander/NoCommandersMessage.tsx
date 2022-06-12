import React from 'react';

const NoCommandersMessage: React.FC = () => {
    return (
        <div className="u-center u-padding--x4">
            <div className="o-v-list o-v-list--h-center">
                <div className="u-txt--36 u-txt--heading u-txt--color-primary u-txt--weight-black">No commanders were found.</div>
                <div className="u-txt--20 u-txt--color-black">Try using a different format or color list?</div>
            </div>
        </div>
    );
};

export default NoCommandersMessage;
