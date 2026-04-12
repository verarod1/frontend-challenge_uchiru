import { memo } from 'react';
import './CatCard.css';

function CatCard({ cat, isLiked, toggleFavorite }) {
  return (
    <div className="cat-card">
      <img src={cat.url} alt="Случайный кот" className="cat-image" loading="lazy" />
      <button 
        className="favorite-btn"
        onClick={() => toggleFavorite(cat)}
        aria-label={isLiked ? "Убрать из избранного" : "Добавить в избранное"}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M20 35L17.1 32.36C10.8 26.65 6.66667 22.9 6.66667 18.25C6.66667 14.45 9.61333 11.5 13.4167 11.5C15.5667 11.5 17.6167 12.5167 18.9167 14.15H21.0833C22.3833 12.5167 24.4333 11.5 26.5833 11.5C30.3867 11.5 33.3333 14.45 33.3333 18.25C33.3333 22.9 29.2 26.65 22.9 32.36L20 35Z" 
            fill={isLiked ? "#F24E1E" : "transparent"} 
            stroke="#F24E1E" 
            strokeWidth="2.5"
          />
        </svg>
      </button>
    </div>
  );
}

export default memo(CatCard);