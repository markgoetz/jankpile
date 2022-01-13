import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import IdentitySelector from './components/IdentitySelector';
import CommanderSelector from './components/CommanderSelector';
import SpellSelector from './components/SpellSelector';
import LandSelector from './components/LandSelector';

function App() {
    return (
        <div className="App">
            <header>
                <Header />
                <IdentitySelector />
                <CommanderSelector />
                <SpellSelector />
                <LandSelector />
                <Footer />
            </header>
        </div>
    );
}

export default App;
