import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../definitions/Card';
import Color from '../definitions/Color';
import { LAND_NAMES_BY_COLOR } from '../lib/consts';
// import getPipCounts from '../lib/utils/getPipCounts';
import { selectColors } from '../redux-modules/identity';
import { selectBasicLandCounts, selectNonBasicLands, selectNonBasicOptions, setBasicCount, toggleNonBasic } from '../redux-modules/lands';
import { selectIsLands } from '../redux-modules/steps';
// import { selectAllCards } from '../redux-modules/store';
import CardOption from './CardOption';
import Heading from './common/Heading';
import PanelHeading from './PanelHeading';

const LandPanel: React.FC = () => {
    const dispatch = useDispatch();
    const colors = useSelector(selectColors);
    const basicLandCounts = useSelector(selectBasicLandCounts);
    // const deck = useSelector(selectAllCards);
    const nonBasics = useSelector(selectNonBasicLands);
    const nonBasicOptions = useSelector(selectNonBasicOptions);
    const isPanelOpen = useSelector(selectIsLands);

    const onToggleOption = useCallback(
        (option: Card) => {
            dispatch(toggleNonBasic(option));
        },
        [dispatch],
    );

    const onInputChange = useCallback(
        (color: Color, count: number) => {
            dispatch(setBasicCount({ color, count }));
        },
        [dispatch]
    );

    const basicLandTotal = Object.values(basicLandCounts).reduce((prev, colorCount) => prev + colorCount, 0);
    const nonBasicLandTotal = nonBasics.length;
    const landTotal = basicLandTotal + nonBasicLandTotal;

    // const pipCounts = getPipCounts(deck);

    return (
        <>
            <PanelHeading>
                <div className="o-h-list o-h-list--baseline">
                    <Heading size="large"><h2>Lands</h2></Heading>
                    {(landTotal > 0 && <Heading size="small"><span>({landTotal})</span></Heading>)}
                </div>
            </PanelHeading>
            {isPanelOpen && (
                <div className="c-panel__bd">
                    <div className="o-sidebar-layout">
                        <div>
                            <Heading size="medium"><h3>Basic Lands</h3></Heading>
                            <div className="o-h-list">
                                {colors.map(color => (
                                    <div key={color}>
                                        {LAND_NAMES_BY_COLOR[color]}
                                        <input value={basicLandCounts[color]} type="number" inputMode="numeric" onChange={e => onInputChange(color, Number(e.target.value))} />
                                    </div>
                                ))}
                            </div>

                            <Heading size="medium"><h3>Non-Basic Lands</h3></Heading>
                            <ul className="o-full-grid">
                                {nonBasicOptions.map(option => (
                                    <li key={option.id}>
                                        <CardOption
                                            onToggle={() => onToggleOption(option)}
                                            option={option}
                                            disabled={false} />
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
