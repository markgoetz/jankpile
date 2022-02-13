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
        },
    );

    return (
        <button type="button" className={className} onClick={onSelect}>
            <img src={card.artImageUri} alt={card.name} width={250} height={183} />
            <span className="c-commander-option__name">{card.name}</span>
            <span className="c-commander-option__artist">art by {card.artist}</span>
        </button>
    );
};

export default CommanderOption;
