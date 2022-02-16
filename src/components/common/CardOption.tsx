import clsx from 'clsx';
import React from 'react';
import Card from '../../definitions/Card';

type Props = {
    option: Card,
    onToggle: () => void,
    disabled: boolean,
    isSelected: boolean,
}

const CardOption: React.FC<Props> = ({ option, onToggle, disabled, isSelected }) => {
    const className = clsx(
        'c-card-option',
        { 'c-card-option--selected': isSelected },
        { 'c-card-option--disabled': disabled },
    );

    return (
        <button type="button" onClick={onToggle} disabled={disabled} className={className}>
            <img src={option.fullImageUri} alt={option.name} width={146} height={204} />
        </button>
    );
};

export default CardOption;
