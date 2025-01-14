import React from 'react';
import { GlobalStyle } from './components/styles/GlobalStyle';
import Home from './pages/Home'; 
const App = () => {
    return (
        <div>
            <GlobalStyle />
            <Home />
        </div>
    );
};

export default App;
