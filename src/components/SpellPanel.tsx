import React from 'react';
import { useSelector } from 'react-redux';
import { selectSpellOptions } from '../redux-modules/spells';
import Heading from './Heading';
import PanelHeading from './PanelHeading';

const SpellPanel: React.FC = () => {
    const options = useSelector(selectSpellOptions);

    return (
        <>
            <PanelHeading>
                <Heading size="normal"><h2>Spells</h2></Heading>
            </PanelHeading>
            <ul>
                {options.map(option => (
                    <li key={option.id}>{option.name}</li>
                ))}
            </ul>
        </>
    );
};

export default SpellPanel;
