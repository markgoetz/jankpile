import React from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header';
import store from './redux-modules/store';
import Main from './components/Main';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <header><Header /></header>
                <main><Main /></main>
            </div>
        </Provider>
    );
}

export default App;
