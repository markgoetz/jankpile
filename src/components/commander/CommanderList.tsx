import React from 'react';
import Card from '../../definitions/Card';
import CommanderOption from '../CommanderOption';

type Props = {
    options: Card[],
    commanderId?: string,
    onCommanderClick: (option: Card) => void,
};

const CommanderList: React.FC<Props> = ({ options, commanderId, onCommanderClick }) => {
    return (
        <div className="o-horizontal-scroll">
            <ul className="o-h-list">
                {options.map(option => (
                    <li key={option.id}>
                        <CommanderOption
                            card={option}
                            isSelected={option.id === commanderId}
                            onSelect={() => onCommanderClick(option)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommanderList;
