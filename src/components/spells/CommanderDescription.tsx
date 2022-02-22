import React from 'react';
import Card from '../../definitions/Card';
import { STOPWORD_LIST } from '../../lib/consts';

type LineProps = {
    line: string,
    onSearch: (query: string) => void,
};

const CommanderDescriptionLine: React.FC<LineProps> = ({ line, onSearch }) => {
    const words = line.split(' ');
    
    return (
        <p key={line} className="u-txt--lh-1.4">
            <span className="o-word-list">
                {words.map((word, index) => (
                    (STOPWORD_LIST.includes(word.toLowerCase())) ? (
                        <span>{word}</span>
                    ) : (
                        <button key={index} onClick={() => onSearch(word)} type="button" className="c-link">
                            {word}
                        </button>
                    )
                ))}
            </span>
        </p>
    );
};

type Props = {
    commander: Card,
    onSearch: (query: string) => void,
};

const CommanderDescription: React.FC<Props> = ({ commander, onSearch }) => {
    const descriptionLines = commander?.description?.split('\n') ?? [];

    return (
        <div className="o-h-list o-h-list--x2">
            <div><img src={commander?.fullImageUri} alt={commander?.name} /></div>
            <div className="o-content-container">
                <div>
                    {descriptionLines.map(line => <CommanderDescriptionLine line={line} onSearch={onSearch} />)}
                </div>
            </div>
        </div>
    );
};

export default CommanderDescription;
