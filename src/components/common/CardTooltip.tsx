import React from 'react';
import Card from '../../definitions/Card';
import Button from './Button';
import X_SVG from '../../assets/images/x-brown.svg';
import ParagraphList from './ParagraphList';

type Props = {
    option: Card,
    onClose: () => void,
};

const CardTooltip: React.FC<Props> = ({ option, onClose }) => {
    return (
        <span className="c-card-tooltip">
            <span className="c-card-tooltip__layout">
                <span className="c-card-tooltip__image">
                    <img src={option.fullImageUri} alt={option.name} width={146} height={204} />
                </span>
                <span className="c-card-tooltip__description">
                    <ParagraphList text={option.description ?? ''} />
                </span>
                <span className="c-card-tooltip__close">
                    <button type="button" onClick={onClose}>
                        <img src={X_SVG} alt="Close" />
                    </button>
                </span>
                <span className="c-card-tooltip__button">
                    <Button>Add card</Button>
                </span>
            </span>
        </span>
    )
};

export default CardTooltip;
