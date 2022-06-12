import React from 'react';

const NoSpellsMessage: React.FC = () => {
    return (
        <div className="u-center u-padding--x4">
            <div className="o-v-list o-v-list--h-center">
                <div className="u-txt--36 u-txt--heading u-txt--color-primary u-txt--weight-black">No spells were found.</div>
                <div className="u-txt--20 u-txt--color-black">Try using a different search query?</div>
            </div>
        </div>
    );
};

export default NoSpellsMessage;
