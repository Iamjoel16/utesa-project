import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';
import UploadProject from './UploadProject';
import axios from 'axios';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [showUploadProject, setShowUploadProject] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);

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

  const handleAddNewProject = () => {
    setShowUploadProject(!showUploadProject);
    setShowProjects(false);
  };

  const handleViewProjects = async () => {
    setShowProjects(!showProjects);
    setShowUploadProject(false);
    if (!showProjects) {
      try {
        const response = await axios.get('http://localhost:3000/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }
  };
  

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>
      <p>Bienvenido al panel de administración. Aquí puedes gestionar los contenidos del sitio.</p>
      <div className="button-group">
        <button className="admin-button" onClick={handleAddNewProject}>
          {showUploadProject ? 'Cerrar Sección de Nuevo Proyecto' : 'Añadir Nuevo Proyecto'}
        </button>
        <button className="admin-button" onClick={handleViewProjects}>
          {showProjects ? 'Ocultar Proyectos Existentes' : 'Ver Proyectos Existentes'}
        </button>
      </div>
      {showUploadProject && (
        <div className="upload-section">
          <UploadProject />
        </div>
      )}
      {showProjects && (
        <div className="projects-section">
          <h2>Proyectos Existentes</h2>
          <div id="projects">
            <table className="projects-table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Carrera</th>
                  <th>Año</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.title}</td>
                    <td>{project.author}</td>
                    <td>{project.career}</td>
                    <td>{project.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
        </div>
      )}
      <div className="logout-section">
        <button className="admin-button logout-button" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default AdminPanel;
