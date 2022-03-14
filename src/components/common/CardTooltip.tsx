import React from 'react';
import Card from '../../definitions/Card';

type Props = {
    option: Card,
    onClose: () => void,
};

const CardTooltip: React.FC<Props> = ({ option, onClose }) => {
    const descriptionPieces = option.description?.split('\n') ?? [];

    return (
        <span className="c-card-tooltip">
            <img src={option.fullImageUri} alt={option.name} width={146} height={204} />
            <span className="c-card-tooltip__description">
                {descriptionPieces.map(piece => <p key={piece} className="u-txt--lh-1.4">{piece}</p>)}
            </span>
        </span>
    )
};

export default CardTooltip;
