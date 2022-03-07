import React, { FormEvent, useEffect, useState } from 'react';
import ImageCheckboxGroup from '../common/ImageCheckboxGroup';
import MANAVALUE_1_SVG from '../../assets/images/1.svg';
import MANAVALUE_2_SVG from '../../assets/images/2.svg';
import MANAVALUE_3_SVG from '../../assets/images/3.svg';
import MANAVALUE_4_SVG from '../../assets/images/4.svg';
import MANAVALUE_5_SVG from '../../assets/images/5.svg';
import MANAVALUE_6_SVG from '../../assets/images/6.svg';
import MANAVALUE_7_SVG from '../../assets/images/7.svg';
import Button from '../common/Button';

type Props = {
    currentQuery: string,
    onSearch: (query: string, manaValues: number[]) => void,
};

const QueryForm: React.FC<Props> = ({ currentQuery, onSearch }) => {
    const [query, setQuery] = useState('');
    const [manaValues, setManaValues] = useState<string[]>([]);

    useEffect(
        () => { setQuery(currentQuery); },
        [currentQuery]
    );

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSearch(query, manaValues.map(mv => parseInt(mv)));
    };

    const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const toggleValue = (value: string) => {
        if (manaValues.includes(value)) {
            setManaValues(manaValues.filter(v => v !== value));
        } else {
            setManaValues([...manaValues, value]);
        }
    };

    return (
        <form onSubmit={onSubmit} className="c-form">
            <div className="o-h-list">
                <input className="c-input" value={query} onChange={onQueryChange} />
                <ImageCheckboxGroup
                    className='o-h-list'
                    name='manavalue'
                    options={[
                        { value: '1', label: '1', imageUrl: MANAVALUE_1_SVG, imageWidth: 44, imageHeight: 44 },
                        { value: '2', label: '2', imageUrl: MANAVALUE_2_SVG, imageWidth: 44, imageHeight: 44 },
                        { value: '3', label: '3', imageUrl: MANAVALUE_3_SVG, imageWidth: 44, imageHeight: 44 },
                        { value: '4', label: '4', imageUrl: MANAVALUE_4_SVG, imageWidth: 44, imageHeight: 44 },
                        { value: '5', label: '5', imageUrl: MANAVALUE_5_SVG, imageWidth: 44, imageHeight: 44 },
                        { value: '6', label: '6', imageUrl: MANAVALUE_6_SVG, imageWidth: 44, imageHeight: 44 },
                        { value: '7', label: '7', imageUrl: MANAVALUE_7_SVG, imageWidth: 44, imageHeight: 44 },
                    ]}
                    selected={manaValues}
                    onChange={value => toggleValue(value)}
                />
                <Button type="submit">Search</Button>
            </div>
        </form>
    )
};

export default QueryForm;
