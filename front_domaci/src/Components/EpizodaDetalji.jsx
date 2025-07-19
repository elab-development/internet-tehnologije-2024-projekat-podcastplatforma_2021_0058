import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './EpizodaDetail.module.css';
import Navbar from '../Components/Navbar';
import BackButton from './BackButton';

const EpizodaDetalji = () => {
  const { state } = useLocation();
  const [epizoda, setEpizoda] = useState(state?.epizoda || null);
  const [audio, setAudio] = useState(null);
  const [tip, setTip] = useState('audio/mp3');
  const [userRole, setUserRole] = useState('gledalac');

  useEffect(() => {
    if (epizoda) {
      setAudio(epizoda.url || '');
    }
  }, [epizoda]);

  if (!epizoda) {
    return <div className={styles.loadingMessage}>Učitavanje...</div>;
  }

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('sr-RS', options);
  };

  return (
    <div>
      <BackButton />
      <Navbar/>
      <div className={styles.epizodaContainer}>
        <h1 className={styles.epizodaTitle}>{epizoda.naziv}</h1>
        <p className={styles.epizodaDescription}>{epizoda.opis}</p>
        <p className={styles.epizodaDate}>Datum: {formatDate(epizoda.datum)}</p>
       

        <div className={styles.audioContainer}>
          {audio ? (
            <audio controls className={styles.audioPlayer}>
              <source src={audio} type={tip} />
              Tvoj pretrazivac ne podrzava audio player.
            </audio>
          ) : (
            <p className={styles.noAudio}>Audio nije dostupan za ovu epizodu.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EpizodaDetalji;
