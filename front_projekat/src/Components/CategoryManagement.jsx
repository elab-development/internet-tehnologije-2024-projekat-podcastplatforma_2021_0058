import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import styles from './CategoryManagement.module.css';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]); 
    const [newCategory, setNewCategory] = useState(''); 
    const [errors, setErrors] = useState({}); 
    const [userRole, setUserRole] = useState('administrator');
    const [successMessage, setSuccessMessage] = useState('');


  
    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await axios.get('http://localhost:8000/api/kategorije', {
              headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'), 
              },
            });
    
            setCategories(response.data.data); 
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
    
        fetchCategories();
      }, []); 

   
    const handleAddCategory = async (e) => {
        e.preventDefault();
        
        if (!newCategory.trim()) {
            setErrors({ category: 'Naziv kategorije je obavezan' });
            return;
        }

        const categoryData = { naziv: newCategory };

        try {
            const response = await axios.post('http://localhost:8000/api/kategorije', categoryData, {
                headers: {
                    'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'), 
                }
            }); 
         
            setCategories(prevCategories => [...prevCategories, response.data.data]);
            setNewCategory('');
            setErrors({});
            setSuccessMessage('Kategorija uspešno dodata!'); 
           
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors({ category: 'Naziv kategorije mora biti jedinstven' });
            } else {
                setErrors({ category: 'Došlo je do greške pri dodavanju kategorije' });
            }
           
         
            setSuccessMessage(''); 
        }
    };

    return (
        <div>
            <Navbar userRole={userRole} />
            <div>
                <h2>Upravljanje Kategorijama</h2>

                {errors.category && <div style={{ color: 'red' }}>{errors.category}</div>}
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
          

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
                        {categories.length > 0 ? (
                            categories.map(category => (
                                <li key={category.id}>{category.naziv}</li>
                            ))
                        ) : (
                            <p>Nemate kategorija još uvek.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
        
    );
};

export default CategoryManagement;
