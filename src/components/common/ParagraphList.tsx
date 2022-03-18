import React from 'react';

type Props = {
    text: string,
};

const ParagraphList: React.FC<Props> = ({ text }) => {
    const lines = text.split('\n') ?? [];
    return (
        <>
            {lines.map(line => <p key={line} className="u-txt--lh-1.4">{line}</p>)}
        </>
    );
};

export default ParagraphList;
