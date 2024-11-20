import React, { useState, useEffect } from 'react';
import './UploadProject.css';

const UploadProject: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [career, setCareer] = useState('');
  const [year, setYear] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [careers, setCareers] = useState<{ id: number; name: string }[]>([]); // Estado para las carreras

  // Obtener carreras y configurar años disponibles
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await fetch('http://localhost:3000/careers', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Autorización con token
          },
        });
        if (!response.ok) {
          throw new Error('Error al obtener las carreras');
        }
        const data = await response.json();
        setCareers(data); // Guardamos las carreras obtenidas en el estado
      } catch (error) {
        console.error('Error al obtener las carreras:', error);
      }
    };

    fetchCareers(); // Llamada para obtener las carreras

    // Configurar años disponibles
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 20 }, (_, i) => currentYear - i);
    setAvailableYears(years);
  }, []);

  // Manejar la subida del proyecto
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('No estás autorizado para realizar esta acción.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Enviar el token en la solicitud
        },
        body: JSON.stringify({
          title,
          author,
          career,
          year,
          fileUrl: file ? file.name : null,
          summary,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al subir el proyecto');
      }

      const data = await response.json();
      alert(`Proyecto creado correctamente: ${data.message}`);
    } catch (error) {
      console.error('Error al subir el proyecto:', error);
      alert('Ocurrió un error al subir el proyecto. Por favor, inténtalo nuevamente.');
    }
  };

  return (
    <div className="upload-container">
      <h1>Subir Proyecto de Grado, Monográfico o Tesis</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="title">Título del Proyecto</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Autor</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="career">Carrera</label>
          <select
            id="career"
            value={career}
            onChange={(e) => setCareer(e.target.value)}
            required
          >
            <option value="">Selecciona una carrera</option>
            {careers.map((careerOption) => (
              <option key={careerOption.id} value={careerOption.name}>
                {careerOption.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="year">Año</label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          >
            <option value="">Selecciona un año</option>
            {availableYears.map((availableYear) => (
              <option key={availableYear} value={availableYear}>
                {availableYear}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="summary">Resumen del Proyecto</label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
            placeholder="Escriba un breve resumen del proyecto"
          />
        </div>

        <div className="form-group file-input">
          <label htmlFor="file">Archivo del Proyecto</label>
          <input
            type="file"
            id="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Subiendo...' : 'Subir Proyecto'}
        </button>
      </form>
      {message && <div className="message-box">{message}</div>}
    </div>
  );
};

export default UploadProject;
