import React from 'react';
import Card from '../definitions/Card';

type Props = {
    card: Card,
    isSelected: boolean,
    onSelect: () => void,
}

const CommanderOption: React.FC<Props> = ({ card, isSelected, onSelect }) => {
    return (
        <button type="button" onClick={onSelect}>
            <span>
                <img src={card.artImageUri} alt={card.name} width={207} height={151} />
                <span>{card.name}</span>
                <span>art by {card.artist}</span>
            </span>
        </button>
    );
};

export default CommanderOption;
