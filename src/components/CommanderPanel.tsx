import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../definitions/Card';
import { selectCommander, selectOptions, setCommander } from '../redux-modules/commander';

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
        <ul>
            {options.map(option => (
                <li key={option.id}>
                    <button type="button" onClick={() => onCommanderClick(option)}>{option.name}</button>
                    {commander?.id === option.id && 'this one!'}
                </li>
            ))}
        </ul>
    );
};

export default CommanderPanel;
