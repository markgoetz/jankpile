import React from 'react';
import Card from '../../definitions/Card';
import DeleteItem from '../common/DeleteItem';
import Heading from '../common/Heading';
import ManaValueChart from '../common/ManaValueChart';

type Props = {
    spells: Card[],
    onToggleOption: (card: Card) => void,
};

const SelectedSpellList: React.FC<Props> = ({ spells, onToggleOption }) => {
    return (
        <>
            <div className="o-h-list o-h-list--center">
                <Heading size="medium" tag="h3">Current Deck</Heading>
                <button type="button">
                    <ManaValueChart spells={spells} />
                </button>
            </div>
            <ul>
                {spells.map(spell => (
                    <li key={spell.id}>
                        <DeleteItem onDelete={() => onToggleOption(spell)}>
                            {spell.frontFace.name}
                        </DeleteItem>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default SelectedSpellList;
