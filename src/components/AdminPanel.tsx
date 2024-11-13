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
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', password: '', access_level: 1 });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleAddNewProject = () => {
    setShowUploadProject(!showUploadProject);
    setShowProjects(false);
    setEditingProject(null);
    setShowAddUser(false);
  };

  const handleViewProjects = async () => {
    setShowProjects(!showProjects);
    setShowUploadProject(false);
    setEditingProject(null);
    setShowAddUser(false);
    if (!showProjects) {
      try {
        const response = await axios.get('http://localhost:3000/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      setError(null);
    } catch (error) {
      setError('Usuario o contraseña incorrecta.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const handleEditProject = async (projectId: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/projects/${projectId}`);
      setEditingProject(response.data);
      setShowUploadProject(false);
      setShowProjects(false);
      setShowAddUser(false);
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      try {
        await axios.delete(`http://localhost:3000/projects/${projectId}`);
        setProjects(projects.filter((project) => project.id !== projectId));
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleUpdateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingProject) {
      try {
        await axios.put(`http://localhost:3000/projects/${editingProject.id}`, editingProject);
        setEditingProject(null);
        handleViewProjects();
      } catch (error) {
        console.error('Error updating project:', error);
      }
    }
  };

  const handleAddUser = () => {
    setShowAddUser(!showAddUser);
    setShowUploadProject(false);
    setShowProjects(false);
    setEditingProject(null);
  };

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/admin_users', newUser);
      setNewUser({ username: '', password: '', access_level: 1 });
      setShowAddUser(false);
      alert('Usuario añadido exitosamente.');
    } catch (error) {
      console.error('Error añadiendo usuario:', error);
    }
  };

  return (
    <div className="admin-panel-container">
      {!isAuthenticated ? (
        <div className="login-container">
          <h1>Iniciar Sesión</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Nombre de Usuario</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                required
              />
            </div>
            <button type="submit" className="login-button">
              Ingresar
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      ) : (
        <div className="admin-panell">
          <h1>Panel de Administración</h1>
          <p>Bienvenido al panel de administración. Aquí puedes gestionar los contenidos del sitio.</p>
          <div className="button-group">
            <button className="admin-button" onClick={handleAddNewProject}>
              {showUploadProject ? 'Cerrar Sección de Nuevo Proyecto' : 'Añadir Nuevo Proyecto'}
            </button>
            <button className="admin-button" onClick={handleViewProjects}>
              {showProjects ? 'Ocultar Proyectos Existentes' : 'Ver Proyectos Existentes'}
            </button>
            <button className="admin-button" onClick={handleAddUser}>
              {showAddUser ? 'Cerrar Sección de Añadir Usuario' : 'Añadir Usuario'}
            </button>
          </div>

          {showUploadProject && (
            <div className="upload-section">
              <UploadProject />
            </div>
          )}

          {showAddUser && (
            <div className="add-user-section">
              <h2>Añadir Nuevo Usuario</h2>
              <form onSubmit={handleCreateUser}>
                <div className="form-group">
                  <label htmlFor="newUsername">Nombre de Usuario</label>
                  <input
                    type="text"
                    id="newUsername"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">Contraseña</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="accessLevel">Nivel de Acceso</label>
                  <select
                    id="accessLevel"
                    value={newUser.access_level}
                    onChange={(e) =>
                      setNewUser({ ...newUser, access_level: parseInt(e.target.value) })
                    }
                  >
                    <option value={1}>1 - Invitado</option>
                    <option value={2}>2 - Docente</option>
                    <option value={3}>3 - Administrador</option>
                  </select>
                </div>
                <button type="submit" className="admin-button">Añadir Usuario</button>
              </form>
            </div>
          )}

          {editingProject && (
            <div className="edit-section">
              <h2>Editando Proyecto: {editingProject.title}</h2>
              <form onSubmit={handleUpdateProject}>
                <div className="form-group">
                  <label htmlFor="title">Título</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="author">Autor</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={editingProject.author}
                    onChange={(e) => setEditingProject({ ...editingProject, author: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="career">Carrera</label>
                  <input
                    type="text"
                    id="career"
                    name="career"
                    value={editingProject.career}
                    onChange={(e) => setEditingProject({ ...editingProject, career: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="year">Año</label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={editingProject.year}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="summary">Resumen</label>
                  <textarea
                    id="summary"
                    name="summary"
                    value={editingProject.summary}
                    onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="admin-button">Actualizar Proyecto</button>
                <button type="button" className="admin-button" onClick={() => setEditingProject(null)}>Cancelar</button>
              </form>
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
                          {project.fileUrl && (
                            <a
                              href={`http://localhost:5173/pdfs/${project.fileUrl.split('/').pop()}`}
                              className="pdf-link"
                            >
                              Descargar PDF
                            </a>
                          )}
                          <button
                            className="edit-button"
                            onClick={() => handleEditProject(project.id)}
                          >
                            Editar
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="logout-section">
            <button className="admin-button logout-button" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
