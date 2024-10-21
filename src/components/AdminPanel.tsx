import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Panel de Administración</h1>
      <p>Bienvenido al panel de administración. Aquí puedes gestionar los contenidos del sitio.</p>
      <div>
        <button>Añadir Nuevo Proyecto</button>
        <button>Ver Proyectos Existentes</button>
      </div>
    </div>
  );
};

export default AdminPanel;
