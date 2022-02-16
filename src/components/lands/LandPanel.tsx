import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../definitions/Card';
import Color from '../../definitions/Color';
import { SINGULAR_LAND_NAMES, PLURAL_LAND_NAMES } from '../../lib/consts';
import getPipCounts from '../../lib/utils/getPipCounts';
import { selectColors } from '../../redux-modules/identity';
import { selectBasicLandCounts, selectNonBasicLands, selectNonBasicOptions, selectNonBasicStatus, setBasicCount, toggleNonBasic } from '../../redux-modules/lands';
import { selectIsLands } from '../../redux-modules/steps';
import { selectAllCards } from '../../redux-modules/store';
import CardOption from '../common/CardOption';
import DeleteItem from '../common/DeleteItem';
import Heading from '../common/Heading';
import LoadingWrapper from '../common/LoadingWrapper';
import PanelHeading from '../PanelHeading';
import BasicLandForm from './BasicLandForm';

const LandPanel: React.FC = () => {
    const dispatch = useDispatch();
    const colors = useSelector(selectColors);
    const basicLandCounts = useSelector(selectBasicLandCounts);
    const deck = useSelector(selectAllCards);
    const nonBasics = useSelector(selectNonBasicLands);
    const nonBasicOptions = useSelector(selectNonBasicOptions);
    const isPanelOpen = useSelector(selectIsLands);
    const landStatus = useSelector(selectNonBasicStatus);

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

    const pipCounts = getPipCounts(deck);

    const sortedNonBasics = [...nonBasics];
    sortedNonBasics.sort((a, b) => a.name > b.name ? 1 : -1);

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
                    <Heading size="medium"><h3>Basic Lands</h3></Heading>
                    <BasicLandForm
                        colors={colors}
                        pipCounts={pipCounts}
                        basicLandCounts={basicLandCounts}
                        onInputChange={onInputChange}
                    />
                    <div className="o-sidebar-layout">
                        <div>
                            <Heading size="medium"><h3>Non-Basic Lands</h3></Heading>
                            <LoadingWrapper status={landStatus}>
                                <ul className="o-full-grid">
                                    {nonBasicOptions.map(option => (
                                        <li key={option.id}>
                                            <CardOption
                                                onToggle={() => onToggleOption(option)}
                                                option={option}
                                                isSelected={nonBasics.includes(option)}
                                                disabled={false}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </LoadingWrapper>
                        </div>
                        <aside>
                            <Heading size="medium"><h3>Current Deck</h3></Heading>
                            <ul>
                                {colors.map(color => (
                                    <li key={color}>
                                        {basicLandCounts[color] > 1 && `${basicLandCounts[color]} ${PLURAL_LAND_NAMES[color]}`}
                                        {basicLandCounts[color] === 1 && `${basicLandCounts[color]} ${SINGULAR_LAND_NAMES[color]}`}
                                    </li>
                                ))}
                                {sortedNonBasics.map(land => (
                                    <li key={land.id}>
                                        <DeleteItem onDelete={() => onToggleOption(land)}>
                                            {land.name}
                                        </DeleteItem>
                                    </li>
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
