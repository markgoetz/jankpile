import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useDeepCompareEffect from 'use-deep-compare-effect';
import Card from '../../definitions/Card';
import Color from '../../definitions/Color';
import getPipCounts from '../../lib/utils/getPipCounts';
import { selectCommander } from '../../redux-modules/commander';
import { selectColors, selectFormat } from '../../redux-modules/identity';
import { selectBasicLandCounts, selectColorlessLandColor, selectLandArtByColor, selectNonBasicLands, selectNonBasicOptions, selectNonBasicStatus, setBasicCount, toggleNonBasic, selectLandArtOptions, setBasicArt, fetchBasicLandArt, fetchNonBasicLands, setColorlessLandColor } from '../../redux-modules/lands';
import { selectIsLands } from '../../redux-modules/steps';
import { selectAllCards } from '../../redux-modules/store';
import CardOption from '../common/CardOption';
import Heading from '../common/Heading';
import LoadingWrapper from '../common/LoadingWrapper';
import PanelHeading from '../PanelHeading';
import BasicLandForm from './BasicLandForm';
import CurrentLands from './CurrentLands';
import LandArtModal from './LandArtModal';
import LandSearchForm from './LandSearchForm';
import NoLandsMessage from './NoLandsMessage';

const LandPanel: React.FC = () => {
    const dispatch = useDispatch();
    const format = useSelector(selectFormat);
    const colors = useSelector(selectColors);
    const basicLandCounts = useSelector(selectBasicLandCounts);
    const deck = useSelector(selectAllCards);
    const nonBasics = useSelector(selectNonBasicLands);
    const nonBasicOptions = useSelector(selectNonBasicOptions);
    const isPanelOpen = useSelector(selectIsLands);
    const landStatus = useSelector(selectNonBasicStatus);
    const landArtOptions = useSelector(selectLandArtOptions);
    const landArtByColor = useSelector(selectLandArtByColor);
    const colorlessLandColor = useSelector(selectColorlessLandColor);
    const commander = useSelector(selectCommander);

    const [selectedColor, setSelectedColor] = useState<Color | null>(null);
    const [landFocusId, setLandFocusId] = useState<string | null>();
    const [query, setQuery] = useState('');
    const [isSnow, setIsSnow] = useState(false);

    useEffect(
        () => {
            setIsSnow(false);
        },
        [commander?.id]
    );

    useDeepCompareEffect(
        () => {
            const identity = { format, colors };
            dispatch(fetchNonBasicLands({ identity, query }));
        },
        [dispatch, format, colors, query]
    );

    useDeepCompareEffect(
        () => {
            colors.forEach(
                color => dispatch(fetchBasicLandArt({ color, isSnow }))
            );
        },
        [dispatch, colors, isSnow],
    );

    useEffect(
        () => {
            dispatch(fetchBasicLandArt({ color: colorlessLandColor, isSnow }))
        },
        [dispatch, colorlessLandColor, isSnow]
    );

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

    const onArtModalClose = useCallback(
        () => {
            setSelectedColor(null);
        },
        []
    );

    const onArtSelect = useCallback(
        (art: Card) => {
            if (selectedColor == null) {
                return;
            }
            dispatch(setBasicArt({ color: selectedColor, art }));
            setSelectedColor(null);
        },
        [dispatch, selectedColor],
    );

    const onAddBasicLand = useCallback(
        (color: Color) => {
            dispatch(setBasicCount({ color, count: basicLandCounts[color] + 1 }));
        },
        [basicLandCounts, dispatch],
    );

    const onSubtractBasicLand = useCallback(
        (color: Color) => {
            if (basicLandCounts[color] === 0) {
                return;
            }
            dispatch(setBasicCount({ color, count: basicLandCounts[color] - 1 }));
        },
        [basicLandCounts, dispatch],
    );

    const onColorlessLandColorChange = useCallback(
        (color: Color) => {
            dispatch(setColorlessLandColor({ color }));
        },
        [dispatch]
    );

    const basicLandTotal = Object.values(basicLandCounts).reduce((prev, colorCount) => prev + colorCount, 0);
    const nonBasicLandTotal = nonBasics.length;
    const landTotal = basicLandTotal + nonBasicLandTotal;

    const pipCounts = getPipCounts(deck);

    const sortedNonBasics = [...nonBasics];
    sortedNonBasics.sort((a, b) => a.frontFace.name > b.frontFace.name ? 1 : -1);

    return (
        <>
            <PanelHeading>
                <div className="o-h-list o-h-list--baseline">
                    <Heading tag="h2" size="large">Lands</Heading>
                    {(landTotal > 0 && <Heading tag="span" size="small">({landTotal})</Heading>)}
                </div>
            </PanelHeading>
            {isPanelOpen && (
                <div className="c-panel__bd">
                    <Heading tag="h3" size="medium">Basic Lands</Heading>
                    <div className="u-vr" />
                    <BasicLandForm
                        colors={colors}
                        colorlessLandColor={colorlessLandColor}
                        onColorlessLandColorChange={onColorlessLandColorChange}
                        isSnow={isSnow}
                        pipCounts={pipCounts}
                        basicLandCounts={basicLandCounts}
                        onInputChange={onInputChange}
                        onIsSnowToggle={setIsSnow}
                        onArtModalOpen={setSelectedColor}
                    />
                    <div className="u-vr u-vr--x4" />
                    <div className="o-sidebar-layout">
                        <div>
                            <Heading tag="h3" size="medium">Non-Basic Lands</Heading>
                            <div className="u-vr" />
                            <LandSearchForm searchQuery={query} onQuery={setQuery} />
                            <LoadingWrapper status={landStatus}>
                                <div className="u-vr--x2" />
                                {nonBasicOptions.length === 0 && (<NoLandsMessage />)}
                                <ul className="o-full-grid">
                                    {nonBasicOptions.map(option => (
                                        <li key={option.id}>
                                            <CardOption
                                                onToggle={() => onToggleOption(option)}
                                                option={option}
                                                isSelected={nonBasics.includes(option)}
                                                isFocusOpen={option.id === landFocusId}
                                                openFocus={() => setLandFocusId(option.id)}
                                                closeFocus={() => setLandFocusId(null)}
                                                disabled={false}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </LoadingWrapper>
                        </div>
                        <aside>
                            <CurrentLands
                                colors={colors}
                                colorlessLandColor={colorlessLandColor}
                                basicLandCounts={basicLandCounts}
                                nonBasics={sortedNonBasics}
                                onAddBasicLand={onAddBasicLand}
                                onSubtractBasicLand={onSubtractBasicLand}
                                onToggleOption={onToggleOption}
                            />
                        </aside>
                    </div>
                </div>
            )}
            <LandArtModal
                onClose={onArtModalClose}
                color={selectedColor ?? Color.WHITE}
                isOpen={selectedColor != null}
                options={landArtOptions[selectedColor ?? Color.WHITE]}
                onSelect={onArtSelect}
                selectedOption={landArtByColor[selectedColor ?? Color.WHITE]}
            />
        </>
    );
};

export default LandPanel;
