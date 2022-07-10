import React, { useState } from 'react';
import Card from '../../definitions/Card';
import CardOption from '../common/CardOption';

type Props = {
    spells: Card[],
    options: Card[],
    onToggleOption: (option: Card) => void,
    commanderId: string,
};

const SpellGrid: React.FC<Props> = ({ spells, options, onToggleOption, commanderId }) => {
    const [spellFocusId, setSpellFocusId] = useState<string | null>(null);

    return (
        <ul className="o-full-grid o-full-grid--list@sm u-vr--x2">
            {options.map(option => (
                <li key={option.id}>
                    <CardOption
                        option={option}
                        onToggle={() => onToggleOption(option)}
                        disabled={option.id === commanderId}
                        isSelected={spells.find(spell => spell.id === option.id) != null}
                        isFocusOpen={spellFocusId === option.id}
                        openFocus={() => setSpellFocusId(option.id)}
                        closeFocus={() => setSpellFocusId(null)}
                    />
                </li>
            ))}
        </ul>
    );
};

export default SpellGrid;
