import clsx from 'clsx';
import React from 'react';
import Card from '../../definitions/Card';
import CardTooltip from './CardTooltip';

type Props = {
    option: Card,
    onToggle: () => void,
    disabled: boolean,
    isSelected: boolean,
    isFocusOpen: boolean,
    openFocus: () => void,
    closeFocus: () => void,
}

const CardOption: React.FC<Props> = ({ option, onToggle, disabled, isSelected, isFocusOpen, openFocus, closeFocus }) => {
    const className = clsx(
        'c-card-option',
        { 'c-card-option--disabled': disabled },
    );

    return (
        <div className={className}>
            <button type="button" onClick={onToggle} disabled={disabled}>
                <img src={option.frontFace.fullImageUri} alt={option.frontFace.name} width={146} height={204} />
            </button>
            <button type="button" className="c-card-option__icon" onClick={openFocus} />
            <span className={clsx('c-card-option__frame', { 'c-card-option__frame--selected': isSelected })} />
            {isFocusOpen && <CardTooltip option={option} onClose={closeFocus} />}
        </div>
    );
};

export default CardOption;
