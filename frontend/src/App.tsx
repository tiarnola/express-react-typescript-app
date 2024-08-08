// src/App.tsx
import React from 'react';
import './App.css';
import FetchData from './FetchData';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My React TypeScript CRM App</h1>
        <FetchData />
      </header>
    </div>
  );
};

export default App;
