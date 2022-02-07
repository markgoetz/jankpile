import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useDeepCompareEffect from 'use-deep-compare-effect';
import Card from '../definitions/Card';
import { selectCommander } from '../redux-modules/commander';
import { selectSpellList, selectSpellOptions, selectSpellStatus, toggleSpell, fetchSpells } from '../redux-modules/spells';
import { jumpToSpells, nextStep, selectIsAfterSpells, selectIsSpells } from '../redux-modules/steps';
import Heading from './common/Heading';
import PanelHeading from './PanelHeading';
import CardOption from './CardOption';
import Button from './common/Button';
import LoadingWrapper from './common/LoadingWrapper';
import { selectColors, selectFormat } from '../redux-modules/identity';

const SpellPanel: React.FC = () => {
    const dispatch = useDispatch();
    const options = useSelector(selectSpellOptions);
    const spells = useSelector(selectSpellList);
    const isPanelOpen = useSelector(selectIsSpells);
    const isEditVisible = useSelector(selectIsAfterSpells);
    const commander = useSelector(selectCommander);
    const spellStatus = useSelector(selectSpellStatus);
    const colors = useSelector(selectColors);
    const format = useSelector(selectFormat);

    const [page, setPage] = useState(0);

    useDeepCompareEffect(
        () => {
            setPage(0);
        },
        [colors, format],
    );

    useDeepCompareEffect(
        () => {
            const identity = { colors, format };
            dispatch(fetchSpells({ identity, page }));
        },
        [dispatch, colors, format, page],
    );

    const onToggleOption = useCallback(
        (option: Card) => {
            dispatch(toggleSpell(option));
        },
        [dispatch],
    );

    const onEditClick = () => {
        dispatch(jumpToSpells());
    };

    const onConfirmClick = useCallback(
        () => {
            dispatch(nextStep());
        },
        [dispatch],
    );

    const onPreviousPageClick = useCallback(
        () => { setPage(Math.max(0, page - 1)); },
        [page]
    );


    const onNextPageClick = useCallback(
        () => { setPage(page + 1); },
        [page]
    );

    const descriptionPieces = commander?.description?.split('\n') ?? [];

    return (
        <div className="c-panel">
            <PanelHeading>
                <div className="o-split o-split--v-center">
                    <div className="o-h-list o-h-list--baseline">
                        <Heading size="large"><h2>Spells</h2></Heading>
                        {(spells.length > 0 && <Heading size="small"><span>({spells.length})</span></Heading>)}
                    </div>
                    {(isEditVisible && <Button onClick={onEditClick}>Edit</Button>)}
                </div>
            </PanelHeading>
            {isPanelOpen && (
                <div className="c-panel__bd">
                    <div className="o-sidebar-layout">
                        <div>
                            <Heading size="medium"><h3>Commander Description</h3></Heading>
                            <div className="o-h-list o-h-list--x2">
                                <div><img src={commander?.fullImageUri} alt={commander?.name} /></div>
                                <div className="o-v-list o-v-list--x2">
                                    {descriptionPieces.map(piece => <span key={piece} className="u-txt--lh-1.4">{piece}</span>)}
                                </div>
                            </div>
                            <Heading size="medium"><h3>Deck List</h3></Heading>
                            <LoadingWrapper status={spellStatus}>
                                <ul className="o-full-grid u-vr--x2">
                                    {options.map(option => (
                                        <li key={option.id}>
                                            <CardOption
                                                option={option}
                                                onToggle={() => onToggleOption(option)}
                                                disabled={option.id === commander?.id}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </LoadingWrapper>
                            <div className="o-split u-vr--x4">
                                <span>
                                    {page > 0 && (<Button variation="secondary" onClick={onPreviousPageClick}>Previous Page</Button>)}
                                </span>
                                <span>
                                    <Button variation="secondary" onClick={onNextPageClick}>Next Page</Button>
                                </span>
                            </div>
                            <Button onClick={onConfirmClick}>Continue to Lands</Button>
                        </div>
                        <aside>
                            <Heading size="medium"><h3>Current Deck</h3></Heading>
                            <ul>
                                {spells.map(spell => (
                                    <li key={spell.id}>{spell.name}</li>
                                ))}
                            </ul>
                        </aside>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SpellPanel;
