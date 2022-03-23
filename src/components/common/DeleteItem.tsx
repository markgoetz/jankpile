import React from 'react';
import X_SVG from '../../assets/images/x-brown.svg';

type Props = {
    onDelete: () => void,
};

const DeleteItem: React.FC<Props> = ({ children, onDelete }) => {
    return (
        <div className="o-h-list o-h-list--center">
            <button type="button" onClick={onDelete}>
                <img src={X_SVG} width={22} height={22} alt="Delete" />
            </button>
            <span>{children}</span>
        </div>
    )
};

export default DeleteItem;
