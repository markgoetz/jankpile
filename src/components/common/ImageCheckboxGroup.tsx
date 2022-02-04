import React from 'react';

type Option = {
    value: string;
    label: string;
    imageUrl: string;
    imageHeight: number;
    imageWidth: number;
}

type Props = {
    className: string,
    name: string,
    options: Option[],
    selected: string[],
    onChange: (value: string) => void,
};

const ImageCheckboxGroup: React.FC<Props> = ({ className, name, options, selected, onChange }) => {
    return (
        <ul className={className}>
            {options.map(option => (
                <li key={option.value}>
                    <label key={option.value} className="c-image-checkbox">
                        <input className="c-image-checkbox__input"
                            type="checkbox"
                            name={name}
                            value={option.value}
                            checked={selected.includes(option.value)}
                            onChange={() => onChange(option.value)}
                        />
                        <img
                            src={option.imageUrl}
                            height={option.imageHeight}
                            width={option.imageWidth}
                            alt={option.label}
                            className="c-image-checkbox__image"
                        />
                        <span className="c-image-checkbox__label">{option.label}</span>
                    </label>
                </li>
            ))}
        </ul>
    );
};

export default ImageCheckboxGroup;
