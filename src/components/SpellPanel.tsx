import React from 'react';
import { useSelector } from 'react-redux';
import { selectSpellOptions } from '../redux-modules/spells';
import { selectIsSpells } from '../redux-modules/steps';
import Heading from './Heading';
import PanelHeading from './PanelHeading';

const SpellPanel: React.FC = () => {
    const options = useSelector(selectSpellOptions);
    const isPanelOpen = useSelector(selectIsSpells);

    return (
        <>
            <PanelHeading>
                <Heading size="normal"><h2>Spells</h2></Heading>
            </PanelHeading>
            {isPanelOpen && (
                <ul>
                    {options.map(option => (
                        <li key={option.id}>{option.name}</li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default SpellPanel;
