import React from 'react';
import Card from '../../definitions/Card';
import getManaValues from '../../lib/utils/getManaValues';
import CardOption from '../common/CardOption';

type Props = {
    spells: Card[],
    options: Card[],
    onToggleOption: (option: Card) => void,
    commanderId: string,
};

const MAX_MANA_VALUE = 7;

const SpellList: React.FC<Props> = ({ spells, options, onToggleOption, commanderId }) => {
    console.log(getManaValues(spells, MAX_MANA_VALUE));
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
