import { useState, useEffect } from 'react';
import './App.css';
import CatFeed from './components/CatFeed';
import CatCard from './components/CatCard';

function App() {
  const [activeTab, setActiveTab] = useState('all');

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('catFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('catFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (cat) => {
    setFavorites(prev => {
      const isLiked = prev.some(fav => fav.id === cat.id);
      if (isLiked) {
        return prev.filter(fav => fav.id !== cat.id);
      } else {
        return [...prev, cat];
      }
    });
  };

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
        {activeTab === 'all' && (
          <CatFeed favorites={favorites} toggleFavorite={toggleFavorite} />
        )}
        
        {activeTab === 'favorite' && (
          <div className="cats-grid">
            {favorites.length === 0 && <p className="empty-state">Пока нет любимых котиков 😿</p>}
            {favorites.map((cat) => (
              <div key={cat.id}>
                <CatCard 
                  cat={cat} 
                  isLiked={true} 
                  toggleFavorite={toggleFavorite} 
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;