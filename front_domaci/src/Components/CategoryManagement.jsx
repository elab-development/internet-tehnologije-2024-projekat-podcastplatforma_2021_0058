import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import styles from './CategoryManagement.module.css';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([
        'Tehnologija', 'Putovanja', 'Zdravlje', 'Istorija', 'Nauka',
        'Film', 'Muzika', 'Ekonomija', 'Politika', 'Sport'
    ]);
    const [newCategory, setNewCategory] = useState('');
    const [errors, setErrors] = useState({});
    const [userRole, setUserRole] = useState('');

    const handleAddCategory = (e) => {
        e.preventDefault();
        
        if (!newCategory.trim()) {
            setErrors({ category: 'Naziv kategorije je obavezan' });
            return;
        }

        setCategories((prevCategories) => [...prevCategories, newCategory]);
        setNewCategory('');
        setErrors({});
    };

    return (
        <div>
            <Navbar/>
            <div>
                <h2>Upravljanje Kategorijama</h2>

                {errors.category && <div style={{ color: 'red' }}>{errors.category}</div>}

                <form onSubmit={handleAddCategory}>
                    <div>
                        <label htmlFor="new-category">Nova Kategorija</label>
                        <input
                            id="new-category"
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Unesite naziv nove kategorije"
                            required
                        />
                        <button type="submit">Dodaj Kategoriju</button>
                    </div>
                </form>

                <div>
                    <h3>Postojeće Kategorije</h3>
                    <ul className={styles.listName}>
                        {categories.map((category, index) => (
                            <li key={index}>{category}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CategoryManagement;
