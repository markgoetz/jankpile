import React from 'react';
import clsx from 'clsx';
import Card from '../definitions/Card';

type Props = {
    card: Card,
    isSelected: boolean,
    onSelect: () => void,
}

const CommanderOption: React.FC<Props> = ({ card, isSelected, onSelect }) => {
    const className = clsx(
        'c-commander-option', {
        'c-commander-option--selected': isSelected
    });

    return (
        <button type="button" className={className} onClick={onSelect}>
            <img src={card.frontFace.fullImageUri} alt={card.frontFace.name} />
            <div>
                <span className="c-commander-option__name">{card.frontFace.name}</span>
                <span className="c-commander-option__artist">art by {card.frontFace.artist}</span>
            </div>
        </button>
    );
};

export default CommanderOption;
