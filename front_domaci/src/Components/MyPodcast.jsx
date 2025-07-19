import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PodkastiList.module.css';
import Navbar from '../Components/Navbar';
import usePodcasts from './usePodcasts'; 

const MyPodcast = () => {
  const { podcasts, filterByName, setFilter } = usePodcasts(); 
  const [filteredPodcasts, setFilteredPodcasts] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = podcasts.filter(podkast => podkast.kreator === 'Marko Marković');
    setFilteredPodcasts(filtered);
  }, [podcasts]);

  const displayedPodcasts = filterByName().filter(podkast => filteredPodcasts.includes(podkast));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const podcastsToShow = displayedPodcasts.slice(startIndex, endIndex);

  const handlePodcastClick = (podkast) => {
    navigate(`/podkasti/${podkast.id}`, { state: { podkast } });
  };

  return (
    <div>
      <Navbar />
      <div className={styles.podkastiContainer}>
        <h2>Moji Podkasti</h2>
        <input
          type="text"
          placeholder="Pretraži podkaste..."
          onChange={(e) => setFilter(e.target.value)}  
          className="search-input"
        />
        <div className={styles.podkastiList}>
          {podcastsToShow.map(podkast => (
            <div
              key={podkast.id}
              className={styles.podkastCard}
              onClick={() => handlePodcastClick(podkast)}
            >
              <img src={podkast.baner} alt={podkast.naziv} className={styles.podkastBanner} />
              <h3>{podkast.naziv}</h3>
              <p>{podkast.opis}</p>
              <i className="category">Kategorija</i>
            </div>
          ))}
        </div>
        <div className={styles.pagination}>
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            Prethodna
          </button>
          <span>Stranica {currentPage}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={podcastsToShow.length < itemsPerPage}
          >
            Sledeća
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPodcast;
