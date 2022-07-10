import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useDeepCompareEffect from 'use-deep-compare-effect';
import Card from '../../definitions/Card';
import { selectCommander } from '../../redux-modules/commander';
import { selectSpellList, selectSpellOptions, selectSpellStatus, toggleSpell, fetchSpells, selectTotalSpellPages } from '../../redux-modules/spells';
import { jumpToSpells, nextStep, selectIsAfterSpells, selectIsSpells } from '../../redux-modules/steps';
import Heading from '../common/Heading';
import PanelHeading from '../PanelHeading';
import Button from '../common/Button';
import LoadingWrapper from '../common/LoadingWrapper';
import { selectColors, selectFormat } from '../../redux-modules/identity';
import { SpellQueryParams } from '../../lib/api/card';
import QueryForm from './QueryForm';
import SpellGrid from './SpellGrid';
import CommanderDescription from './CommanderDescription';
import SelectedSpellList from './SelectedSpellList';
import ManaCurveModal from './ManaCurveModal';
import NoSpellsMessage from './NoSpellsMessage';

type SearchParams = Omit<SpellQueryParams, 'identity'>;

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
    const totalPages = useSelector(selectTotalSpellPages);

    const [params, setParams] = useState<SearchParams>({ page: 0 });
    const [isCurveModalOpen, setIsCurveModalOpen] = useState(false);

    useEffect(
        () => {
            setParams({ page: 0 });
        },
        [commander?.id]
    );

    useDeepCompareEffect(
        () => {
            const identity = { colors, format };
            dispatch(fetchSpells({ identity, ...params }));
        },
        [dispatch, colors, format, params],
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
        () => { setParams({ ...params, page: Math.max(0, params.page - 1)} ); },
        [params],
    );

    const onNextPageClick = useCallback(
        () => { setParams({ ...params, page: params.page + 1 }); },
        [params]
    );

    const onCommanderSearch = useCallback(
        (query: string) => { setParams({...params, query, manaValues: [], page: 0 })},
        [params],
    )

    const onSearch = useCallback(
        (query: string, manaValues: number[]) => { setParams({ ...params, query, manaValues, page: 0 }) },
        [params],
    );

    const sortedSpells = [...spells];
    sortedSpells.sort((a, b) => a.frontFace.name > b.frontFace.name ? 1 : -1);

    return (
        <div className="c-panel">
            <PanelHeading>
                <div className="o-split o-split--v-center">
                    <div className="o-h-list o-h-list--baseline">
                        <Heading tag="h2" size="large">Spells</Heading>
                        {(spells.length > 0 && <Heading size="small" tag="span">({spells.length})</Heading>)}
                    </div>
                    {(isEditVisible && <Button onClick={onEditClick}>Edit</Button>)}
                </div>
            </PanelHeading>
            {isPanelOpen && (
                <div className="c-panel__bd">
                    <Heading tag="h3" size="medium">Commander Description</Heading>
                    <div className="u-vr" />
                    {commander != null && <CommanderDescription commander={commander} onSearch={onCommanderSearch} />}
                    <div className="u-vr u-vr--x2" />
                    <QueryForm currentQuery={params.query ?? ''} onSearch={onSearch} />
                    <div className="u-vr u-vr--x2" />
                    <div className="o-sidebar-layout">
                        <div>
                             <LoadingWrapper status={spellStatus}>
                                {options.length === 0 && <NoSpellsMessage />}
                                <SpellGrid
                                    options={options}
                                    onToggleOption={onToggleOption}
                                    commanderId={commander?.id ?? ''}
                                    spells={spells}
                                />
                            </LoadingWrapper>
                            <div className="o-split u-vr--x4">
                                <span>
                                    {params.page > 0 && (<Button variation="secondary" onClick={onPreviousPageClick}>Previous Page</Button>)}
                                </span>
                                <span>
                                    {params.page < totalPages - 1 && (<Button variation="secondary" onClick={onNextPageClick}>Next Page</Button>)}
                                </span>
                            </div>
                        </div>
                        <aside>
                            <SelectedSpellList
                                spells={sortedSpells}
                                onToggleOption={onToggleOption}
                                onChartClick={() => setIsCurveModalOpen(true)}
                            />
                        </aside>
                        <div>
                            <Button onClick={onConfirmClick}>Continue to Lands</Button>
                        </div>
                    </div>
                    <ManaCurveModal
                        isOpen={isCurveModalOpen}
                        onClose={() => setIsCurveModalOpen(false)}
                        spells={sortedSpells}
                    />
                </div>
            )}
        </div>
    );
};

export default SpellPanel;
