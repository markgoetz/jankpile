import clsx from 'clsx';
import React from 'react';
import Card from '../../definitions/Card';

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

    const descriptionPieces = option.description?.split('\n') ?? [];

    return (
        <div className={className}>
            <button type="button" onClick={onToggle} disabled={disabled}>
                <img src={option.fullImageUri} alt={option.name} width={146} height={204} />
            </button>
            <button type="button" className="c-card-option__icon" onClick={openFocus} />
            <span className={clsx('c-card-option__frame', { 'c-card-option__frame--selected': isSelected })} />
            {isFocusOpen && (
                <span className="c-card-option__focus">
                    <img src={option.fullImageUri} alt={option.name} width={146} height={204} />
                    <span className="c-card-option__description">
                        {descriptionPieces.map(piece => <p key={piece} className="u-txt--lh-1.4">{piece}</p>)}
                    </span>
                </span>
            )}
        </div>
    );
};

export default CardOption;
