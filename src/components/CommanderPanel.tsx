import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../definitions/Card';
import { selectCommander, selectCommanderOptions, setCommander } from '../redux-modules/commander';
import CommanderOption from './CommanderOption';
import Heading from './Heading';
import PanelHeading from './PanelHeading';

const CommanderPanel: React.FC = () => {
    const options = useSelector(selectCommanderOptions);
    const commander = useSelector(selectCommander);
    const dispatch = useDispatch();

    const onCommanderClick = useCallback(
        (option: Card) => {
            dispatch(setCommander(option))
        },
        [dispatch]
    );

    return (
        <>
            <PanelHeading>
                <div className="o-split">
                    <div className="o-h-list o-h-list--baseline">
                        <Heading size="normal"><h2>Commander</h2></Heading>
                        {(commander != null && <Heading size="small"><span>{commander.name}</span></Heading>)}
                    </div>
                    {(commander != null && <button type="button">Edit</button>)}
                </div>
            </PanelHeading>
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
        </>
    );
};

export default CommanderPanel;
