import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../definitions/Card';
import { selectCommander } from '../redux-modules/commander';
import { selectSpellList, selectSpellOptions, toggleSpell } from '../redux-modules/spells';
import { jumpToSpells, nextStep, selectIsAfterSpells, selectIsSpells } from '../redux-modules/steps';
import Heading from './common/Heading';
import PanelHeading from './PanelHeading';
import CardOption from './CardOption';
import Button from './common/Button';

const SpellPanel: React.FC = () => {
    const dispatch = useDispatch();
    const options = useSelector(selectSpellOptions);
    const spells = useSelector(selectSpellList);
    const isPanelOpen = useSelector(selectIsSpells);
    const isEditVisible = useSelector(selectIsAfterSpells);
    const commander = useSelector(selectCommander);

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
                            <ul className="o-full-grid">
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
