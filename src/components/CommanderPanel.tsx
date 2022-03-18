import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../definitions/Card';
import { selectCommander, selectCommanderOptions, selectCommanderStatus, setCommander } from '../redux-modules/commander';
import { jumpToCommander, nextStep, selectIsCommander, selectIsAfterCommander } from '../redux-modules/steps';
import CommanderOption from './CommanderOption';
import Button from './common/Button';
import Heading from './common/Heading';
import LoadingWrapper from './common/LoadingWrapper';
import ParagraphList from './common/ParagraphList';
import PanelHeading from './PanelHeading';

const CommanderPanel: React.FC = () => {
    const options = useSelector(selectCommanderOptions);
    const commander = useSelector(selectCommander);
    const isPanelOpen = useSelector(selectIsCommander);
    const isEditVisible = useSelector(selectIsAfterCommander);
    const commanderStatus = useSelector(selectCommanderStatus);
    const dispatch = useDispatch();

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

    return (
        <div className="c-panel">
            <PanelHeading>
                <div className="o-split o-split--v-center">
                    <div className="o-h-list o-h-list--baseline">
                        <Heading size="large"><h2>Commander</h2></Heading>
                        {(commander != null && <Heading size="small"><span>{commander.name}</span></Heading>)}
                    </div>
                    {(isEditVisible && <Button onClick={onEditClick}>Edit</Button>)}
                </div>
            </PanelHeading>
            {isPanelOpen && (
                <LoadingWrapper status={commanderStatus}>
                    <div className="c-panel__bd">
                        <div className="o-horizontal-scroll">
                            <ul className="o-h-list">
                                {options.map(option => (
                                    <li key={option.id}>
                                        <CommanderOption
                                            card={option}
                                            isSelected={option.id === commander?.id}
                                            onSelect={() => onCommanderClick(option)}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {commander != null && (
                            <ParagraphList text={commander.description ?? ''} />
                        )}
                        <Button disabled={commander == null} onClick={onConfirmClick}>
                            {commander == null && 'No commander selected'}
                            {commander != null && `Select ${commander.name}`}
                        </Button>
                    </div>
                </LoadingWrapper>
            )}
        </div>
    );
};

export default CommanderPanel;
