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
            <header><Header /></header>
            <main>
                <section><IdentitySelector /></section>
                <section><CommanderSelector /></section>
                <section><SpellSelector /></section>
                <section><LandSelector /></section>
            </main>
            <footer><Footer /></footer>
        </div>
    );
}

export default App;
