import React from 'react';
import Heading from './Heading';
import PanelHeading from './PanelHeading';

const LandPanel: React.FC = () => {
    return (
        <PanelHeading>
            <Heading size="normal"><h2>Lands</h2></Heading>
        </PanelHeading>
    );
};

export default LandPanel;
