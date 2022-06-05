import React, { useRef, useState } from 'react';
import Footer from './Footer';
import IdentityPanel from './IdentityPanel';
import CommanderPanel from './commander/CommanderPanel';
import SpellPanel from './spells/SpellPanel';
import LandPanel from './lands/LandPanel';
import ExportModal from './ExportModal';

const Main: React.FC = () => {
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const identityRef = useRef<HTMLElement>(null);
    const commanderRef = useRef<HTMLElement>(null);
    const spellRef = useRef<HTMLElement>(null);
    const landRef = useRef<HTMLElement>(null);

    return (
        <React.Fragment>
            <section ref={identityRef}><IdentityPanel /></section>
            <section ref={commanderRef}><CommanderPanel /></section>
            <section ref={spellRef}><SpellPanel /></section>
            <section ref={landRef}><LandPanel /></section>
            <section><Footer onExportClick={() => setIsExportModalOpen(true)} /></section>
            <ExportModal isOpen={isExportModalOpen} onClose={() => { setIsExportModalOpen(false); }} />
        </React.Fragment>
    );
};

export default Main;