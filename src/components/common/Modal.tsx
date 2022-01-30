import React from 'react';

type Props = {
    isOpen: boolean,
    onClose: () => void,
};

const Modal: React.FC<Props> = ({ children, isOpen, onClose }) => {
    return (
        <dialog open={isOpen} className="c-modal">
            <div className="c-modal__curtain" onClick={onClose} />
            <div className="c-modal__body">
                {children}
            </div>
        </dialog>
    );
};

export default Modal;
