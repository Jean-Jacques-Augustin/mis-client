import React from 'react';
import './App.css';
import Index from "./pages";
import Navigation from "./components/molecules/Navigation";

function App() {
    return (
        <div className="App">
            <Navigation/>
            <Index/>
        </div>
    );
}

export default App;
