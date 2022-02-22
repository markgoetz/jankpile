import React from 'react';
import Card from '../../definitions/Card';

type Props = {
    commander: Card,
};

const CommanderDescription: React.FC<Props> = ({ commander }) => {
    const descriptionLines = commander?.description?.split('\n') ?? [];

    return (
        <div className="o-h-list o-h-list--x2">
            <div><img src={commander?.fullImageUri} alt={commander?.name} /></div>
            <div className="o-content-container">
                <div>
                    {descriptionLines.map(piece => <p key={piece} className="u-txt--lh-1.4">{piece}</p>)}
                </div>
            </div>
        </div>
    );
};

export default CommanderDescription;
