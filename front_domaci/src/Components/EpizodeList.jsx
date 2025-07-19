import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './EpizodeList.module.css';
import Navbar from '../Components/Navbar';
import BackButton from '../Components/BackButton';
import usePodcasts from './usePodcasts';

const EpizodeList = () => {
  const { state } = useLocation();
  const [epizode, setEpizode] = useState([]); 
  const { toggleFavorite, isFavorite } = usePodcasts();  
  const [buttonText, setButtonText] = useState('Dodaj Podkast u omiljene'); 
  const [userRole, setUserRole] = useState(''); 

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem('role');
    setUserRole(role || 'gledalac');
    
    if (state) {  
      setEpizode(state.podkast.epizode || []); 
    } else {  
      setEpizode([]); 
    }
    setIsDataLoaded(true);
  }, [state]); 

  useEffect(() => {
    if (state) {
      const favoriteStatus = isFavorite(state.podkast.id);  
      setButtonText(favoriteStatus ? 'Ukloni iz omiljenih' : 'Dodaj u omiljene');
    }
  }, [state, isFavorite]);  

  const handleEpisodeClick = (epizoda) => {
    navigate(`/epizode/${epizoda.id}`, { state: { epizoda } });
  };
  
  const handleFavoriteClick = () => {
    if (state) {
      toggleFavorite(state.podkast.id);
    }
  };

  const handleCreateEpisode = () => {
    navigate('/kreirajEpizodu', { state: { podkastId: state.id } });
  };

  const handleDelete = () => {
    if (window.confirm('Da li ste sigurni da želite da obrisete podkast?')) {
      navigate(-1);  
    }
  };

  if (!isDataLoaded) {
    return <p>Loading...</p>;
  }

  const podkast = state?.podkast;

  return (
    <div>
      <Navbar userRole={userRole} />
      <div className={styles.banner}>
        {podkast?.baner && <img src={podkast.baner} alt={podkast.naziv} className={styles.bannerImage} />}
        <div className={styles.bannerContent}>
          <h1 className={styles.podcastTitle}>{podkast?.naziv || 'Naslov Podkasta'}</h1>
          <p className={styles.podcastDescription}>
            {podkast?.opis || 'Ovo je kratki opis podkasta.'}
          </p>
        </div>
        <BackButton onClick={() => navigate(-1)} /> 

        {userRole === 'gledalac' && (
          <button onClick={handleFavoriteClick} className={styles.favoriteButton}>
            {buttonText}
          </button>
        )}
        
        {(userRole === 'kreator') && (
          <>
            <button onClick={handleDelete} className={styles.deleteButton}>
              Obriši Podkast
            </button>
            <button onClick={handleCreateEpisode} className={styles.createEpisodeButton}>
              Kreiraj Novu Epizodu
            </button>
          </>
        )}
        {(userRole === 'administrator') && (
          <>
            <button onClick={handleDelete} className={styles.deleteButton}>
              Obriši Podkast
            </button>
          </>
        )}
      </div>

      <div className={styles.epizodeContainer}>
        <h2 className={styles.sectionTitle}>Sve Epizode</h2>
        <div className={styles.epizodeList}>
          {epizode.length === 0 ? (
            <p>No episodes available</p>
          ) : (
            epizode.map((epizoda) => (
              <div key={epizoda.id} className={styles.epizodaCard}>
                <h3 className={styles.epizodaTitle}>{epizoda.naziv}</h3>
                <p className={styles.epizodaDate}>
                  {new Date(epizoda.datum).toLocaleDateString()}
                </p>
                <button onClick={() => handleEpisodeClick(epizoda)} className={styles.playButton}>
                  Preslušaj
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EpizodeList;
