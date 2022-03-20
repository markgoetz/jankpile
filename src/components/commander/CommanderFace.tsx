import React from 'react';
import CardFace from '../../definitions/CardFace';
import Heading from '../common/Heading';
import ParagraphList from '../common/ParagraphList';

type Props = {
    face: CardFace,
};

const CommanderFace: React.FC<Props> = ({ face }) => {
    return (
        <div>
            <Heading size="small"><h3>{face.name}</h3></Heading>
            <p>{face.pips}</p>
            <ParagraphList text={face.description ?? ''} />
            {(face.power != null && face.toughness != null) && <p>({face.power}/{face.toughness})</p>}
        </div>
    )
};

export default CommanderFace;
