import React from 'react';

type Props = {
    name: string,
    options: { value: string, label: string}[],
    selectedValue: string,
    onChange: (value: string) => void,
};

const Selector: React.FC<Props> = ({ options, name, selectedValue, onChange }) => {
    const onSelectorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="c-selector">
            {options.map(option => (
                <label key={option.value} className="c-selector__option">
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        className="c-selector__option__radio"
                        checked={option.value === selectedValue}
                        onChange={onSelectorChange}
                    />
                    <span className="c-selector__option__label">{option.label}</span>
                </label>
            ))}
        </div>
    );
};

export default Selector;
