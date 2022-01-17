import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../definitions/Card';
import { selectCommander, selectOptions, setCommander } from '../redux-modules/commander';
import Heading from './Heading';
import PanelHeading from './PanelHeading';

const CommanderPanel: React.FC = () => {
    const options = useSelector(selectOptions);
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
                        <button type="button" onClick={() => onCommanderClick(option)}>{option.name}</button>
                        {commander?.id === option.id && 'this one!'}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default CommanderPanel;
