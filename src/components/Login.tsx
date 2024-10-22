import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';  // Import a CSS file for Login styles

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/admin';
    } catch (error) {
      alert('Usuario o contraseña incorrecta');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Iniciar Sesión</h1>
      <input
        className="login-input"
        type="text"
        placeholder="Usuario"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>Ingresar</button>
    </div>
  );
};

export default Login;
