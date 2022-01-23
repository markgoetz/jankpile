import React from 'react';
import { useSelector } from 'react-redux';
import getPipCounts from '../lib/utils/getPipCounts';
import { selectAllCards } from '../redux-modules/store';
import Heading from './Heading';
import PanelHeading from './PanelHeading';

const LandPanel: React.FC = () => {
    const deck = useSelector(selectAllCards);

    const pipCounts = getPipCounts(deck);
    console.log(pipCounts);

    return (
        <PanelHeading>
            <Heading size="normal"><h2>Lands</h2></Heading>
        </PanelHeading>
    );
};

export default LandPanel;
