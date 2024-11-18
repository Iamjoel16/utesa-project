import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './Login.css';

interface DecodedToken {
  id: number;
  username: string;
  access_level: number;
  exp: number;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      const token = response.data.token;

      localStorage.setItem('token', token);

      const decoded: DecodedToken = jwtDecode(token);

      if (decoded.access_level === 3) {
        window.location.href = '/admin';
      } else if (decoded.access_level === 2) {
        window.location.href = '/docente';
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      setErrorMessage('Usuario o contraseña incorrecta');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Iniciar Sesión</h1>
      {errorMessage && <div className="login-error">{errorMessage}</div>}
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
      <button className="login-button" onClick={handleLogin}>
        Ingresar
      </button>
    </div>
  );
};

export default Login;
