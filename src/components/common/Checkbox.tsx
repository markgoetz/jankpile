import React from 'react';

type Props = {
    name: string,
    value: string,
    label: string,
    checked: boolean,
    onToggle: (value: boolean) => void,
};

const Checkbox: React.FC<Props> = ({ name, value, label, checked, onToggle }) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onToggle(e.target.checked);
    };

    return (
        <label className="c-checkbox">
            <input
                type="checkbox"
                className="c-checkbox__input"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
            <span className="c-checkbox__icon" />
            <span className="c-checkbox__label">{label}</span>
        </label>
    );
};

export default Checkbox;

