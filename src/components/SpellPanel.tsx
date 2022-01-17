import React from 'react';
import Heading from './Heading';
import PanelHeading from './PanelHeading';

const SpellPanel: React.FC = () => {
    return (
        <PanelHeading>
            <Heading size="normal"><h2>Spells</h2></Heading>
        </PanelHeading>
    );
};

export default SpellPanel;
