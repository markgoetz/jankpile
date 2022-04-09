import React from 'react';
import CardFace from '../../definitions/CardFace';
import Heading from './Heading';
import ParagraphList from './ParagraphList';

type Props = {
    face: CardFace,
};

const FullCardFace: React.FC<Props> = ({ face }) => {
    return (
        <div className="o-h-list">
            <div>
                <img src={face.fullImageUri} alt={face.name} width={146} height={204} />
            </div>
            <div>
                <Heading size="small" tag="h3">{face.name}</Heading>
                <div className="u-vr" />
                <p>{face.pips}</p>
                <ParagraphList text={face.description ?? ''} />
                {(face.power != null && face.toughness != null) && <p>({face.power}/{face.toughness})</p>}
                {(face.loyalty != null) && <p>Starting loyalty: {face.loyalty}</p>}
            </div>
        </div>
    )
};

export default FullCardFace;
