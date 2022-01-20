import React from 'react';
import Card from '../definitions/Card';

type Props = {
    option: Card;
    onToggle: () => void;
}

const SpellOption: React.FC<Props> = ({ option, onToggle }) => {
    return (
        <button type="button" onClick={onToggle}>
            <img src={option.fullImageUri} alt={option.name} />
        </button>
    );
};

export default SpellOption;
