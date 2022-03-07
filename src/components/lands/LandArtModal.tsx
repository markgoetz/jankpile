import React from 'react';
import Card from '../../definitions/Card';
import Color from '../../definitions/Color';
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

        </Modal>
    );
};

export default LandArtModal;
