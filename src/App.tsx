import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Random } from './features/random/Random';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
        <img src={logo} className="App-logo" alt="logo" />
        <Random />
      </header>
    </div>
  );
}

export default App;
