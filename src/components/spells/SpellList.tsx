import React from 'react';
import Card from '../../definitions/Card';
import CardOption from '../common/CardOption';

type Props = {
    options: Card[],
    onToggleOption: (option: Card) => void,
    commanderId: string,
};

const SpellList: React.FC<Props> = ({ options, onToggleOption, commanderId }) => {
    return (
        <ul className="o-full-grid u-vr--x2">
            {options.map(option => (
                <li key={option.id}>
                    <CardOption
                        option={option}
                        onToggle={() => onToggleOption(option)}
                        disabled={option.id === commanderId}
                    />
                </li>
            ))}
        </ul>
    );
};

export default SpellList;
