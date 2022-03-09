import clsx from 'clsx';
import React, { useEffect } from 'react';

type Props = {
    isOpen: boolean,
    onClose: () => void,
    size: 'large' | 'small',
};

const Modal: React.FC<Props> = ({ children, isOpen, onClose, size }) => {
    useEffect(
        () => {
            if (isOpen) {
                document.body.classList.add('c-scroll-lock');
            } else {
                document.body.classList.remove('c-scroll-lock');
            }
        },
        [isOpen],
    );

    return (
        <dialog open={isOpen} className="c-modal">
            <div className="c-modal__curtain" onClick={onClose} />
            <div className={clsx('c-modal__body', { 'c-modal__body--large': size === 'large' })}>
                {children}
            </div>
        </dialog>
    );
};

export default Modal;
