import React from 'react';

type Props = {
    name: string,
    options: { value: string, label: string }[],
    selected: string[],
    onChange: (value: string) => void,
};

const ImageCheckboxGroup: React.FC<Props> = ({ name, options, selected, onChange }) => {
    return (
        <>
            {options.map(option => (
                <label key={option.value}>
                    <input
                        type="checkbox"
                        name={name}
                        value={option.value}
                        checked={selected.includes(option.value)}
                        onChange={() => onChange(option.value)}
                    />
                    <span>{option.label}</span>
                </label>
            ))}
        </>
    );
};

export default ImageCheckboxGroup;
