import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userRole = sessionStorage.getItem('role');

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const renderMenu = () => {
    if (userRole === 'administrator') {
      return (
        <>
          <li><Link to="/podkasti" onClick={handleLinkClick}>Podkasti</Link></li>
          <li><Link to="/korisnici" onClick={handleLinkClick}>Korisnici</Link></li>
          <li><Link to="/kategorije" onClick={handleLinkClick}>Kategorije</Link></li>
        </>
      );
    }
    if (userRole === 'kreator') {
      return (
        <>
          <li><Link to="/podkasti" onClick={handleLinkClick}>Podkasti</Link></li>
          <li><Link to="/kreirajPodkast" onClick={handleLinkClick}>Kreiraj Podkast</Link></li>
          <li><Link to="/moji-podkasti" onClick={handleLinkClick}>Moji Podkasti</Link></li>
        </>
      );
    }
    if (userRole === 'gledalac') {
      return (
        <>
          <li><Link to="/podkasti" onClick={handleLinkClick}>Podkasti</Link></li>
          <li><Link to="/omiljeni" onClick={handleLinkClick}>Omiljeni Podkasti</Link></li>
        </>
      );
    }
  };

  return (
    <header className="navbar">
      <div className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
      <div className="logo">
        <h1>PODKAST</h1>
      </div>
      <div className="logout">
        <button onClick={handleLogout}>IZLOGUJ SE</button>
      </div>
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <ul>
          {renderMenu()}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
