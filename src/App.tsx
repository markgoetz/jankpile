import React, { useState } from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import IdentityPanel from './components/IdentityPanel';
import CommanderPanel from './components/commander/CommanderPanel';
import SpellPanel from './components/spells/SpellPanel';
import LandPanel from './components/lands/LandPanel';
import store from './redux-modules/store';
import ExportModal from './components/ExportModal';

const App: React.FC = () => {
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);

    return (
        <Provider store={store}>
            <div className="App">
                <header><Header /></header>
                <main>
                    <section><IdentityPanel /></section>
                    <section><CommanderPanel /></section>
                    <section><SpellPanel /></section>
                    <section><LandPanel /></section>
                    <section><Footer onExportClick={() => setIsExportModalOpen(true)} /></section>
                </main>
            </div>
            <ExportModal isOpen={isExportModalOpen} onClose={() => { setIsExportModalOpen(false); }} />
        </Provider>
    );
}

export default App;
