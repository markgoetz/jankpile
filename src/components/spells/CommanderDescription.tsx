import React from 'react';
import Card from '../../definitions/Card';
import { STOPWORD_LIST } from '../../lib/consts';

type LineProps = {
    line: string,
    onSearch: (query: string) => void,
};

const extractWord = (linePiece: string) => {
    const letterMatch = linePiece.match(/^\W*((\w.*\w|\w))\W*$/);
    if (letterMatch == null) {
        return '';
    }

    return letterMatch[1].toLowerCase();
};

const CommanderDescriptionLine: React.FC<LineProps> = ({ line, onSearch }) => {
    const words = line.split(' ');

    return (
        <p className="u-txt--lh-1.4">
            <span className="o-word-list">
                {words.map((word, index) => (
                    STOPWORD_LIST.includes(extractWord(word)) ? (
                        <span key={index}>{word}</span>
                    ) : (
                        <button key={index} onClick={() => onSearch(extractWord(word))} type="button" className="c-link">
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
    const descriptionLines = commander?.frontFace.description?.split('\n') ?? [];

    return (
        <div className="o-h-list o-h-list--x2">
            <div><img src={commander?.frontFace.fullImageUri} alt={commander?.frontFace.name} width={350} /></div>
            <div className="o-content-container">
                <div>
                    {descriptionLines.map(
                        line => <CommanderDescriptionLine key={line} line={line} onSearch={onSearch} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommanderDescription;
