import { useState, useEffect, useRef, useCallback } from 'react';
import CatCard from './CatCard';

export default function CatFeed({ favorites, toggleFavorite }) {
  const [cats, setCats] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const lastCatElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    const fetchCats = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=${page}&order=DESC`);
        const newCats = await response.json();

        if (newCats.length === 0) {
          setHasMore(false);
        } else {
          setCats(prevCats => {
            const existingIds = new Set(prevCats.map(cat => cat.id));
            const uniqueNewCats = newCats.filter(cat => !existingIds.has(cat.id));
            return [...prevCats, ...uniqueNewCats];
          });
        }
      } catch (error) {
        console.error("Ошибка при загрузке ленты:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCats();
  }, [page]);

  return (
    <div className="cats-grid"> 
      {cats.map((cat, index) => {
        const isLast = cats.length === index + 1;
        const isLiked = favorites.some(fav => fav.id === cat.id);
        
        return (
          <div ref={isLast ? lastCatElementRef : null} key={cat.id}>
            <CatCard 
              cat={cat} 
              isLiked={isLiked} 
              toggleFavorite={toggleFavorite} 
            />
          </div>
        );
      })}
      
      {loading && <div className="loader">Ищем новых котиков...</div>}
    </div>
  );
}