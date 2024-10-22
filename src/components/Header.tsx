import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header>
      <div className="logo-container">
        <a href="/" className="logo-link">
          <img src="/images/utesa-logo.png" alt="UTESA Logo" className="logo-image" />
          <span className="logo-text">UTESA</span>
        </a>
      </div>
      <nav>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/consultas">Consultas</a></li>
          <li><a href="/guia">Guía</a></li>
          <li><a href="/admin">Panel de Administración</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
