import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../definitions/Card';
import { selectSpellList, selectSpellOptions, toggleSpell } from '../redux-modules/spells';
import { selectIsSpells } from '../redux-modules/steps';
import Heading from './Heading';
import PanelHeading from './PanelHeading';
import SpellOption from './SpellOption';

const SpellPanel: React.FC = () => {
    const dispatch = useDispatch();
    const options = useSelector(selectSpellOptions);
    const spells = useSelector(selectSpellList);
    const isPanelOpen = useSelector(selectIsSpells);

    const onToggleOption = useCallback(
        (option: Card) => {
            dispatch(toggleSpell(option));
        },
        [dispatch],
    );

    return (
        <div className="c-panel">
            <PanelHeading>
                <div className="o-h-list o-h-list--baseline">
                    <Heading size="normal"><h2>Spells</h2></Heading>
                    {(spells.length > 0 && <Heading size="small"><span>({spells.length})</span></Heading>)}
                </div>
            </PanelHeading>
            {isPanelOpen && (
                <div className="c-panel__bd">
                    <div className="o-sidebar-layout">
                        <ul className="o-full-grid">
                            {options.map(option => (
                                <li key={option.id}>
                                    <SpellOption option={option} onToggle={() => onToggleOption(option)} />
                                </li>
                            ))}
                        </ul>
                        <aside>
                            <Heading size="small"><h3>Current Deck</h3></Heading>
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
