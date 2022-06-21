import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from './Footer';
import IdentityPanel from './IdentityPanel';
import CommanderPanel from './commander/CommanderPanel';
import SpellPanel from './spells/SpellPanel';
import LandPanel from './lands/LandPanel';
import ExportModal from './ExportModal';
import { selectStep, Step } from '../redux-modules/steps';
import MobileNotice from './MobileNotice';

const Main: React.FC = () => {
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const identityRef = useRef<HTMLElement>(null);
    const commanderRef = useRef<HTMLElement>(null);
    const spellRef = useRef<HTMLElement>(null);
    const landRef = useRef<HTMLElement>(null);
    const currentStep = useSelector(selectStep)

    useEffect(
        () => {
            switch (currentStep) {
                case Step.IDENTITY: {
                    identityRef.current?.scrollIntoView({ behavior: 'smooth' });
                    break;
                }
                case Step.COMMANDER: {
                    commanderRef.current?.scrollIntoView({ behavior: 'smooth' });
                    break;
                }
                case Step.SPELLS: {
                    spellRef.current?.scrollIntoView({ behavior: 'smooth' });
                    break;
                }
                case Step.LANDS: {
                    landRef.current?.scrollIntoView({ behavior: 'smooth' });
                    break;
                }
            }
        },
        [currentStep]
    );

    return (
        <React.Fragment>
            <section ref={identityRef}><IdentityPanel /></section>
            <section ref={commanderRef}><CommanderPanel /></section>
            <section ref={spellRef}><SpellPanel /></section>
            <section ref={landRef}><LandPanel /></section>
            <section><Footer onExportClick={() => setIsExportModalOpen(true)} /></section>
            <ExportModal isOpen={isExportModalOpen} onClose={() => { setIsExportModalOpen(false); }} />
            <MobileNotice />
        </React.Fragment>
    );
};

export default Main;