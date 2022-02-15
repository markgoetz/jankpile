import React from 'react';
import Button from './Button';
import X_SVG from '../../assets/images/x.svg';

type Props = {
    onDelete: () => void,
};

const DeleteItem: React.FC<Props> = ({ children, onDelete }) => {
    return (
        <div className="o-split o-split--v-center">
            <span>{children}</span>
            <Button onClick={onDelete} shape="square">
                <img src={X_SVG} width={22} height={22} alt="Delete" />
            </Button>
        </div>
    )
};

export default DeleteItem;
