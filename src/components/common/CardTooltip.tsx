import React from 'react';
import Card from '../../definitions/Card';
import Button from './Button';
import X_SVG from '../../assets/images/x-brown.svg';
import FullCardFace from './FullCardFace';

type Props = {
    option: Card,
    isSelected: boolean,
    onClose: () => void,
    onToggle: () => void,
};

const CardTooltip: React.FC<Props> = ({ option, onClose, isSelected, onToggle }) => {
    return (
        <span className="c-card-tooltip">
            <span className="o-h-list o-h-list--x2">
                <span>
                    <FullCardFace face={option.frontFace} />
                    {option.backFace && <FullCardFace face={option.backFace} />}
                    <Button onClick={onToggle}>
                        {isSelected ? 'Remove' : 'Add'}
                    </Button>
                </span>
                <span>
                    <button type="button" onClick={onClose}>
                        <img src={X_SVG} alt="Close" />
                    </button>
                </span>
            </span>
        </span>
    )
};

export default CardTooltip;
