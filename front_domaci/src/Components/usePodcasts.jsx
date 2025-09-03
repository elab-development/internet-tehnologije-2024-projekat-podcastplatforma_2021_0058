import { useState, useMemo } from 'react';
import fakePodcasts from './FakePodcasts';

const usePodcasts = () => {
  const [podcasts, setPodcasts] = useState(
    fakePodcasts.map(podcast => ({...podcast}))
  );
  const [filter, setFilter] = useState('');

  const filteredPodcasts = useMemo(() => {
    return podcasts.filter(podcast =>
      podcast.naziv.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, podcasts]);

  const filteredFavoritePodcasts = useMemo(() => {
    return podcasts
      .filter(podcast => podcast.isFavorite)
      .filter(podcast =>
        podcast.naziv.toLowerCase().includes(filter.toLowerCase())
      );
  }, [filter, podcasts]);

  const toggleFavorite = (id) => {
    setPodcasts((prevPodcasts) =>
      prevPodcasts.map(podcast =>
        podcast.id === id ? { ...podcast, isFavorite: !podcast.isFavorite } : podcast
      )
    );
  };

  const isFavorite = (id) => {
    const podcast = podcasts.find(podcast => podcast.id === id);
    return podcast ? podcast.isFavorite : false;
  };

  return {
    podcasts: filteredPodcasts,   
    toggleFavorite,
    isFavorite,
    filterByName: () => filteredPodcasts,
    getFavoritePodcasts: () => filteredFavoritePodcasts, 
    getAllPodcasts: () => podcasts,
    setFilter, 
  };
};

export default usePodcasts;
