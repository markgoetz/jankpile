import React, { useCallback, useState } from 'react';
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
import SpellList from './SpellList';
import CommanderDescription from './CommanderDescription';
import DeleteItem from '../common/DeleteItem';

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

    useDeepCompareEffect(
        () => {
            setParams({ ...params, page: 0 });
        },
        [colors, format],
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

    const onSearch = useCallback(
        (query: string, manaValues: number[]) => { setParams({ ...params, query, manaValues, page: 0 }) },
        [params],
    );

    const sortedSpells = [...spells];
    sortedSpells.sort((a, b) => a.name > b.name ? 1 : -1);

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
                    <Heading size="medium"><h3>Commander Description</h3></Heading>
                    {commander != null && <CommanderDescription commander={commander} />}
                    <QueryForm currentQuery={params.query ?? ''} onSearch={onSearch} />
                    <div className="o-sidebar-layout">
                        <div>
                            <Heading size="medium"><h3>Available Cards</h3></Heading>
                            <LoadingWrapper status={spellStatus}>
                                <SpellList
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
                            <Button onClick={onConfirmClick}>Continue to Lands</Button>
                        </div>
                        <aside>
                            <Heading size="medium"><h3>Current Deck</h3></Heading>
                            <ul>
                                {sortedSpells.map(spell => (
                                    <li key={spell.id}>
                                        <DeleteItem onDelete={() => onToggleOption(spell)}>
                                            {spell.name}
                                        </DeleteItem>
                                    </li>
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
