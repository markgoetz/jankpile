import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../definitions/Card';
import getPipCounts from '../lib/utils/getPipCounts';
import { selectNonBasicLands, selectNonBasicOptions, toggleNonBasic } from '../redux-modules/lands';
import { selectIsLands } from '../redux-modules/steps';
import { selectAllCards } from '../redux-modules/store';
import Heading from './Heading';
import PanelHeading from './PanelHeading';

const LandPanel: React.FC = () => {
    const dispatch = useDispatch();
    const deck = useSelector(selectAllCards);
    const nonBasics = useSelector(selectNonBasicLands);
    const nonBasicOptions = useSelector(selectNonBasicOptions);
    const isPanelOpen = useSelector(selectIsLands);

    const onToggleOption = useCallback(
        (option: Card) => {
            dispatch(toggleNonBasic(option));
        },
        [dispatch],
    );

    const pipCounts = getPipCounts(deck);
    console.log(pipCounts);

    return (
        <>
            <PanelHeading>
                <div className="o-h-list o-h-list--baseline">
                    <Heading size="large"><h2>Lands</h2></Heading>
                    {(nonBasics.length > 0 && <Heading size="small"><span>({nonBasics.length})</span></Heading>)}
                </div>
            </PanelHeading>
            {isPanelOpen && (
                <div className="c-panel__bd">
                    <div className="o-sidebar-layout">
                        <div>
                            <Heading size="medium"><h3>Deck List</h3></Heading>
                            <ul className="o-full-grid">
                                {nonBasicOptions.map(option => (
                                    <li key={option.id}>
                                        <button type="button" onClick={() => onToggleOption(option)}>
                                            {option.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <aside>
                            <Heading size="medium"><h3>Current Deck</h3></Heading>
                            <ul>
                                {nonBasics.map(land => (
                                    <li key={land.id}>{land.name}</li>
                                ))}
                            </ul>
                        </aside>
                    </div>
                </div>
            )}
        </>
    );
};

export default LandPanel;
