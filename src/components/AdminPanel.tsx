import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
      localStorage.removeItem('token');
     navigate('/login');
  };

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>
      <p>Bienvenido al panel de administración. Aquí puedes gestionar los contenidos del sitio.</p>
      <div className="button-group">
        <button className="admin-button">Añadir Nuevo Proyecto</button>
        <button className="admin-button">Ver Proyectos Existentes</button>
      </div>
      <div className="logout-section">
        <button className="admin-button logout-button" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default AdminPanel;
