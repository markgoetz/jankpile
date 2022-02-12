import React from 'react';
import Card from '../../definitions/Card';

type Props = {
    option: Card;
    onToggle: () => void;
    disabled: boolean;
}

const CardOption: React.FC<Props> = ({ option, onToggle, disabled }) => {
    return (
        <button type="button" onClick={onToggle} disabled={disabled}>
            <img src={option.fullImageUri} alt={option.name} width={146} height={204} />
        </button>
    );
};

export default CardOption;
