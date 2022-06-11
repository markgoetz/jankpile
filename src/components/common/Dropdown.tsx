import React from 'react';

export type Option = {
    label: string,
    value: string,
};

type Props = {
    options: Option[],
    value: string,
    onSelect: (value: string) => void,
};

const Dropdown: React.FC<Props> = ({ options, value, onSelect }) => {
    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelect(e.target.value);
    };

    return (
        <select value={value} onChange={onChange} className="c-dropdown">
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    );
};

export default Dropdown;
