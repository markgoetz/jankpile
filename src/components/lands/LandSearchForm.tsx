import React, { useCallback, useState } from 'react';
import Button from '../common/Button';

type Props = {
    searchQuery: string,
    onQuery: (query: string) => void,
};

const LandSearchForm: React.FC<Props> = ({ searchQuery, onQuery }) => {
    const [query, setQuery] = useState('');

    const onFormSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            onQuery(query);
        },
        [query, onQuery],
    );

    const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return (
        <form className="c-form" onSubmit={onFormSubmit}>
            <div className="o-h-list">
                <input type="search" className="c-input" value={query} onChange={onQueryChange} />
                <Button type="submit">Search</Button>
            </div>
        </form>
    );
};

export default LandSearchForm;
