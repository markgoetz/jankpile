import React, { useCallback } from 'react';
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
                        {(commander != null && <Heading size="small"><span>{commander.frontFace.name}</span></Heading>)}
                    </div>
                    {(isEditVisible && <Button onClick={onEditClick}>Edit</Button>)}
                </div>
            </PanelHeading>
            {isPanelOpen && (
                <LoadingWrapper status={commanderStatus}>
                    <div className="c-panel__bd">
                        <CommanderList
                            options={options}
                            onCommanderClick={onCommanderClick}
                            commanderId={commander?.id}
                        />
                        {commander != null && (
                            <div className="o-two-columns">
                                <FullCardFace face={commander.frontFace} />
                                {commander.backFace != null && <FullCardFace face={commander.backFace} />}
                            </div>
                        )}
                        <Button disabled={commander == null} onClick={onConfirmClick}>
                            {commander == null && 'No commander selected'}
                            {commander != null && `Select ${commander.frontFace.name}`}
                        </Button>
                    </div>
                </LoadingWrapper>
            )}
        </div>
    );
};

export default CommanderPanel;
