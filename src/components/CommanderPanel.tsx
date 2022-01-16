import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOptions } from '../redux-modules/commander';

const CommanderPanel: React.FC = () => {
    const options = useSelector(selectOptions);
    return (
        <ul>
            {options.map(option => (
                <li key={option.id}>{option.name}</li>
            ))}
        </ul>
    );
};

export default CommanderPanel;
