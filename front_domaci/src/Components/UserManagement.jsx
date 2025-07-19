import React, { useState, useEffect } from 'react';
import styles from './UserManagement.module.css';
import Navbar from './Navbar';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, korisnicko_ime: 'NikolaJ', email: 'nikola.jovanovic@example.com', uloga: 'gledalac' },
    { id: 2, korisnicko_ime: 'AnaM', email: 'ana.milosevic@example.com', uloga: 'kreator' },
    { id: 3, korisnicko_ime: 'MarkoP', email: 'marko.petrovic@example.com', uloga: 'gledalac' },
    { id: 4, korisnicko_ime: 'IvanaS', email: 'ivana.savic@example.com', uloga: 'gledalac' },
    { id: 5, korisnicko_ime: 'JovanB', email: 'jovan.bogdanovic@example.com', uloga: 'kreator' },
    { id: 6, korisnicko_ime: 'PetarK', email: 'petar.kovac@example.com', uloga: 'gledalac' },
    { id: 7, korisnicko_ime: 'MajaV', email: 'maja.vukovic@example.com', uloga: 'gledalac' },
    { id: 8, korisnicko_ime: 'LukaD', email: 'luka.dimitrovic@example.com', uloga: 'kreator' },
    { id: 9, korisnicko_ime: 'MilicaR', email: 'milica.romanov@example.com', uloga: 'gledalac' },
    { id: 10, korisnicko_ime: 'StefanN', email: 'stefan.nikolic@example.com', uloga: 'gledalac' },
  ]);

  const [userRole, setUserRole] = useState('');

  useEffect(() => {
   
    const storedRole = sessionStorage.getItem('role');
    if (storedRole) {
      setUserRole(storedRole);
    } else {
      setUserRole('administrator');
    }
  }, []);

  const handleDeleteUser = (userId) => {
    const confirmed = window.confirm('Da li ste sigurni da želite da obrišete ovog korisnika?');
    if (confirmed) {
      setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
      alert('Korisnik je uspešno obrisan!');
    }
  };

  const handleRoleChange = (userId) => {
    const confirmed = window.confirm('Da li ste sigurni da želite da promenite rolu korisnika u kreator?');
    if (confirmed) {
      setUsers(users.map(user =>
        user.id === userId ? { ...user, uloga: 'kreator' } : user
      ));
      alert('Uloga korisnika je uspešno promenjena!');
    }
  };

  return (
    <div>
      <Navbar/>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Upravljanje Korisnicima</h1>
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>Korisničko ime</th>
              <th>Email</th>
              <th>Uloga</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.korisnicko_ime}</td>
                <td>{user.email}</td>
                <td>{user.uloga}</td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className={styles.deleteButton}>
                    Obriši
                  </button>
                  {user.uloga === 'gledalac' && (
                    <button
                      onClick={() => handleRoleChange(user.id)}
                      className={styles.changeRoleButton}>
                      Promeni ulogu
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
