import React, { useState, useEffect } from 'react';
import './UploadProject.css';

const UploadProject: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [career, setCareer] = useState('Ingenieria');
  const [year, setYear] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [availableYears, setAvailableYears] = useState<number[]>([]);

  useEffect(() => {
    // Generar una lista de años desde el año actual hasta 20 años atrás
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 20 }, (_, i) => currentYear - i);
    setAvailableYears(years);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('http://localhost:3000/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          author,
          career,
          year,
          fileUrl: file ? file.name : null,
        }),
      });

      if (response.ok) {
        alert('Proyecto subido con éxito');
        setTitle('');
        setAuthor('');
        setCareer('Ingenieria');
        setYear('');
        setFile(null);
      } else {
        alert('Error al subir el proyecto');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error al conectar con el servidor');
    } finally {
      setLoading(false);
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
          >
            <option value="Ingenieria">Ingeniería</option>
            <option value="Medicina">Medicina</option>
            <option value="Licenciatura">Licenciatura</option>
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

        <div className="form-group file-input">
          <label htmlFor="file">Archivo del Proyecto</label>
          <input
            type="file"
            id="file"
            accept='application/pdf'
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
