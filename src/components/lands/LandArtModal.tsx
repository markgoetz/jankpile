import React from 'react';
import Card from '../../definitions/Card';
import Color from '../../definitions/Color';
import { SINGULAR_LAND_NAMES } from '../../lib/consts';
import Heading from '../common/Heading';
import Modal from '../common/Modal';

type Props = {
    isOpen: boolean,
    color: Color
    options: Card[],
    onSelect: (card: Card) => void,
    onClose: () => void,
};

const LandArtModal: React.FC<Props> = ({ isOpen, color, options, onSelect, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Heading size="large">Select {SINGULAR_LAND_NAMES[color]} Art</Heading>
            <ul className="o-full-grid">
                {options.map(option => (
                    <li key={option.id}>
                        <img src={option.fullImageUri} alt={option.setCode} />
                    </li>
                ))}
            </ul>
        </Modal>
    );
};

export default LandArtModal;
