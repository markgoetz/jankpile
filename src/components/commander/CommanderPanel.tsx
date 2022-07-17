import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../definitions/Card';
import { selectCommander, selectCommanderOptions, selectCommanderStatus, setCommander } from '../../redux-modules/commander';
import { jumpToCommander, nextStep, selectIsCommander, selectIsAfterCommander } from '../../redux-modules/steps';
import Button from '../common/Button';
import Heading from '../common/Heading';
import LoadingWrapper from '../common/LoadingWrapper';
import PanelHeading from '../PanelHeading';
import FullCardFace from '../common/FullCardFace';
import CommanderList from './CommanderList';
import NoCommandersMessage from './NoCommandersMessage';
import getUniqueValues from '../../lib/utils/getUniqueValues';

const CommanderPanel: React.FC = () => {
    const options = useSelector(selectCommanderOptions);
    const commander = useSelector(selectCommander);
    const isPanelOpen = useSelector(selectIsCommander);
    const isEditVisible = useSelector(selectIsAfterCommander);
    const commanderStatus = useSelector(selectCommanderStatus);
    const dispatch = useDispatch();

    const [selectedSet, setSelectedSet] = useState('0');
    useEffect(
        () => {
            setSelectedSet('0');
        },
        [options],
    );

    const onCommanderClick = useCallback(
        (option: Card) => {
            dispatch(setCommander(option));
        },
        [dispatch]
    );

    const onEditClick = () => {
        dispatch(jumpToCommander());
    };

    const onConfirmClick = () => {
        dispatch(nextStep());
    };

    const onSetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSet(e.target.value);
    };

    const sets = getUniqueValues(options.map(option => option.setCode)).sort();
    const commandersFromSelectedSet = (selectedSet === '0')
        ? options
        : options.filter(option => option.setCode === selectedSet);

    return (
        <div className="c-panel">
            <PanelHeading>
                <div className="o-split o-split--v-center">
                    <div className="o-h-list o-h-list--baseline">
                        <Heading size="large" tag="h2">Commander</Heading>
                        {(commander != null && <Heading size="small" tag="span">{commander.frontFace.name}</Heading>)}
                    </div>
                    {(isEditVisible && <Button onClick={onEditClick}>Edit</Button>)}
                </div>
            </PanelHeading>
            {isPanelOpen && (
                <LoadingWrapper status={commanderStatus}>
                    <div className="c-panel__bd">
                        <div className="o-h-list o-h-list--center">
                            <span>Show commanders from:</span>
                            <select className="c-input" onChange={onSetChange}>
                                <option value="0">All sets</option>
                                {sets.map(set => <option key={set}>{set}</option>)}
                            </select>
                        </div>
                        <div className="u-vr" />
                        {options.length === 0 && (<NoCommandersMessage />)}
                        <CommanderList
                            options={commandersFromSelectedSet}
                            onCommanderClick={onCommanderClick}
                            commanderId={commander?.id}
                        />
                        {commander != null && (
                            <div className="o-two-columns">
                                <FullCardFace face={commander.frontFace} />
                                {commander.backFace != null && <FullCardFace face={commander.backFace} />}
                            </div>
                        )}
                        {options.length > 0 && (
                            <Button disabled={commander == null} onClick={onConfirmClick}>
                                {commander == null && 'No commander selected'}
                                {commander != null && `Select ${commander.frontFace.name}`}
                            </Button>
                        )}
                    </div>
                </LoadingWrapper>
            )}
        </div>
    );
};

export default CommanderPanel;
