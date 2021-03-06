import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import Card from '../../definitions/Card';
import Color from '../../definitions/Color';
import { SINGULAR_LAND_NAMES } from '../../lib/consts';
import Button from '../common/Button';
import Heading from '../common/Heading';
import Modal from '../common/Modal';

type Props = {
    isOpen: boolean,
    color: Color
    options: Card[],
    selectedOption: Card | null,
    onSelect: (card: Card) => void,
    onClose: () => void,
};

const LandArtModal: React.FC<Props> = ({ isOpen, color, options, selectedOption, onSelect, onClose }) => {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);

    useEffect(
        () => {
            if (isOpen) {
                setSelectedCard(selectedOption);
            }
        },
        [isOpen, selectedOption]
    );

    const onSaveClick = useCallback(
        () => {
            if (selectedCard == null) {
                return;
            }

            onSelect(selectedCard);
        },
        [selectedCard, onSelect]
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="large">
            <Heading size="large" tag="span">Select {SINGULAR_LAND_NAMES[color]} Art</Heading>
            <div className="u-vr u-vr--x2" />
            <ul className="o-full-grid">
                {options.map(option => (
                    <li key={option.id}>
                        <div className="c-card-option">
                            <button type="button" onClick={() => setSelectedCard(option)}>
                                <img
                                    src={option.frontFace.fullImageUri}
                                    alt={option.setCode}
                                    width={146}
                                    height={204}
                                />
                            </button>
                            <span className={clsx('c-card-option__frame', { 'c-card-option__frame--selected': option.id === selectedCard?.id })} />
                        </div>
                    </li>
                ))}
            </ul>
            <div className="u-center">
                <Button type="button" onClick={onSaveClick}>Save</Button>
            </div>
        </Modal>
    );
};

export default LandArtModal;
