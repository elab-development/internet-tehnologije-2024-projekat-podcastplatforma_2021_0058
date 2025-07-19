import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PodkastiList.module.css';
import Navbar from '../Components/Navbar';
import usePodcasts from './usePodcasts'; 

const PodkastiList = () => {
  const { podcasts, setFilter } = usePodcasts();  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const navigate = useNavigate(); 
  const handlePodcastClick = (podkast) => {
    navigate(`/podkasti/${podkast.id}`, { state: { podkast } });
  };

  const paginatedPodcasts = podcasts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <Navbar/>
      <div className={styles.podkastiContainer}>
        <input
          type="text"
          placeholder="Pretraži podkaste..."
          onChange={(e) => setFilter(e.target.value)}  
          className="search-input"
        />
        <div className={styles.podkastiList}>
          {paginatedPodcasts.map(podkast => (
            <div
              key={podkast.id}
              className={styles.podkastCard}
              onClick={() => handlePodcastClick(podkast)}
            >
              <img src={podkast.baner} alt={podkast.naziv} className={styles.podkastBanner} />
              <h3>{podkast.naziv}</h3>
              <p>{podkast.opis}</p>
              <i className="category">{podkast.kategorija}</i>
    
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
            disabled={paginatedPodcasts.length < itemsPerPage}
          >
            Sledeća
          </button>
        </div>
      </div>
    </div>
  );
};

export default PodkastiList;
