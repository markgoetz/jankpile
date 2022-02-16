import React from 'react';
import Card from '../../definitions/Card';
import CardOption from '../common/CardOption';

type Props = {
    spells: Card[],
    options: Card[],
    onToggleOption: (option: Card) => void,
    commanderId: string,
};

const SpellList: React.FC<Props> = ({ spells, options, onToggleOption, commanderId }) => {
    return (
        <ul className="o-full-grid u-vr--x2">
            {options.map(option => (
                <li key={option.id}>
                    <CardOption
                        option={option}
                        onToggle={() => onToggleOption(option)}
                        disabled={option.id === commanderId}
                        isSelected={spells.find(spell => spell.id === option.id) != null}
                    />
                </li>
            ))}
        </ul>
    );
};

export default SpellList;
