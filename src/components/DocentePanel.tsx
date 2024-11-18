import React, { useState, useEffect } from 'react';
import './DocentePanel.css';

interface Project {
  id: number;
  title: string;
  author: string;
  career: string;
  year: number;
  fileUrl: string;
  summary: string;
}

const DocentePanel: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');

      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:3000/projects', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los proyectos');
        }

        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error('Error al obtener los proyectos:', err);
        setError('No se pudieron cargar los proyectos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="docente-panel-container">
      <h1>Proyectos Disponibles</h1>
      {loading && <p>Cargando proyectos...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <table className="projects-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Carrera</th>
              <th>Año</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.title}</td>
                <td>{project.author}</td>
                <td>{project.career}</td>
                <td>{project.year}</td>
                <td>
                  {project.fileUrl ? (
                    <a
                    href={`http://localhost:5173/pdfs/${project.fileUrl.split('/').pop()}`}
                      className="pdf-link"
                    >
                      Descargar PDF
                    </a>
                  ) : (
                    'No disponible'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DocentePanel;
