import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInput = (e) => {
    const newUserData = { ...userData };
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const users = [
      { email: 'emilija.keserovic@example.com', password: '12345', role: 'administrator' },
      { email: 'marko.markovic@example.com', password: '12345', role: 'kreator' }
    ];

    const foundUser = users.find(
      (user) => user.email === userData.email && user.password === userData.password
    );

    if (foundUser) {
      window.sessionStorage.setItem('role', foundUser.role);
      window.sessionStorage.setItem('user_id', foundUser.email);
      navigate('/podkasti');
    } else {
      window.sessionStorage.setItem('role', 'gledalac');
      window.sessionStorage.setItem('user_id', userData.email);
      navigate('/podkasti');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Dobrodošli nazad</h2>
        <p className="login-subtitle">Prijavite se na svoj nalog</p>
        {errorMessage && <p className="login-error">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="login-input"
            value={userData.email}
            onChange={handleInput}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Lozinka"
            className="login-input"
            value={userData.password}
            onChange={handleInput}
            required
          />
          <button type="submit" className="login-button">
            Prijavi se
          </button>
        </form>
        <p className="login-footer">
          Nemate nalog?{' '}
          <button className="register-link" onClick={handleRegisterRedirect}>
            Registrujte se
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
