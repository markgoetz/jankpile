import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../definitions/Card';
import { selectCommander, selectCommanderOptions, setCommander } from '../redux-modules/commander';
import { jumpToCommander, nextStep, selectIsCommander, selectIsAfterCommander } from '../redux-modules/steps';
import CommanderOption from './CommanderOption';
import Heading from './Heading';
import PanelHeading from './PanelHeading';

const CommanderPanel: React.FC = () => {
    const options = useSelector(selectCommanderOptions);
    const commander = useSelector(selectCommander);
    const isPanelOpen = useSelector(selectIsCommander);
    const isEditVisible = useSelector(selectIsAfterCommander);
    const dispatch = useDispatch();

    const onCommanderClick = useCallback(
        (option: Card) => {
            dispatch(setCommander(option));
        },
        [dispatch]
    );

    const onEditClick = () => {
        dispatch(jumpToCommander());
    };

    const onConfirmClick = () => {
        dispatch(nextStep());
    };

    return (
        <div className="c-panel">
            <PanelHeading>
                <div className="o-split">
                    <div className="o-h-list o-h-list--baseline">
                        <Heading size="large"><h2>Commander</h2></Heading>
                        {(commander != null && <Heading size="small"><span>{commander.name}</span></Heading>)}
                    </div>
                    {(isEditVisible && <button type="button" onClick={onEditClick}>Edit</button>)}
                </div>
            </PanelHeading>
            {isPanelOpen && (
                <div className="c-panel__bd">
                    <ul>
                        {options.map(option => (
                            <li key={option.id}>
                                <CommanderOption
                                    card={option}
                                    isSelected={option.id === commander?.id}
                                    onSelect={() => onCommanderClick(option)}
                                />
                            </li>
                        ))}
                    </ul>
                    <button type="button" disabled={commander == null} onClick={onConfirmClick}>
                        Confirm
                    </button>
                </div>
            )}
        </div>
    );
};

export default CommanderPanel;
