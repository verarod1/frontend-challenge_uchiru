import { useState } from 'react';
import './App.css';
import CatFeed from './components/CatFeed';

function App() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div>
      <header className="header">
        <button
          className={activeTab === 'all' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('all')}
        >
          Все котики
        </button>
        <button
          className={activeTab === 'favorite' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('favorite')}
        >
          Любимые котики
        </button>
      </header>
      <main className="main-content">
        {activeTab === 'all' && <CatFeed />}
        
        {activeTab === 'favorite' && (
          <div>Тут будут любимые котики</div>
        )}
      </main>
    </div>
  );
}

export default App;