import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import BackButton from './BackButton';

const NovaEpizodaForm = () => {
    const [naziv, setNaziv] = useState('');
    const [file, setFile] = useState(null);
    const [poruka, setPoruka] = useState('');
    const { state } = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        alert('Epizoda uspešno kreirana!');
        navigate(-1); 
    };
    return (
        <div>
            <Navbar />
            <BackButton/>
            <h2>Kreiraj Novu Epizodu</h2>
            {poruka && <p>{poruka}</p>}        
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Naziv Epizode:</label>
                    <input
                        type="text"
                        value={naziv}
                        onChange={(e) => setNaziv(e.target.value)}
                        required
                    />
                </div>          
                <div>
                    <label>Fajl (audio):</label>
                    <input
                        type="file"
                        accept=".mp3"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                </div>
                <button type="submit">Sačuvaj Epizodu</button>
            </form>
        </div>
    );
};

export default NovaEpizodaForm;
