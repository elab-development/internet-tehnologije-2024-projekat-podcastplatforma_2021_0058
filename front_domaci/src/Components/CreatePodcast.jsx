import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './CreatePodcast.module.css';

const CreatePodcast = () => {
    const [podcastName, setPodcastName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([
        'Tehnologija', 'Putovanja', 'Zdravlje', 'Istorija', 'Nauka',
        'Film', 'Muzika', 'Ekonomija', 'Politika', 'Sport'
    ]);
    const [banner, setBanner] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    

    const handleBannerChange = (e) => {
        setBanner(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!podcastName || !description || !categoryId || !banner) {
            setErrors({ form: 'Sva polja su obavezna' });
            return;
        }

        alert('Podkast je kreiran!');
        navigate('/podkasti');
        setErrors({});
    };

    return (
        <div>
            <Navbar/>
        
            <div className="create-podcast-form">
                <h2>Kreiraj Podkast</h2>

                {errors.form && <div className="error-dialog" style={{ color: 'red' }}>{errors.form}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="podcast-name">Naziv Podkasta</label>
                        <input
                            id="podcast-name"
                            type="text"
                            value={podcastName}
                            onChange={(e) => setPodcastName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Opis</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Kategorija</label>
                        <select
                            id="category"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                        >
                            <option value="">Odaberi Kategoriju</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="banner">Postavi Baner</label>
                        <input
                            id="banner"
                            type="file"
                            onChange={handleBannerChange}
                            accept="image/*"
                            required
                        />
                    </div>

                    <button type="submit">Kreiraj Podkast</button>
                </form>
            </div>
        </div>
    );
};

export default CreatePodcast;
