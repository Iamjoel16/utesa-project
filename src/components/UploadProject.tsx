import React, { useState } from 'react';
import './UploadProject.css';

const UploadProject: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [career, setCareer] = useState<string>('ingenieria');
  const [year, setYear] = useState<number | string>('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        // Limpiar el formulario
        setTitle('');
        setAuthor('');
        setCareer('ingenieria');
        setYear('');
        setFile(null);
      } else {
        alert('Error al subir el proyecto');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="upload-project-container">
      <h2>Subir Proyecto de Grado, Monográfico o Tesis</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título del Proyecto:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="author">Autor:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <label htmlFor="career">Carrera:</label>
        <select
          id="career"
          value={career}
          onChange={(e) => setCareer(e.target.value)}
        >
          <option value="ingenieria">Ingeniería</option>
          <option value="medicina">Medicina</option>
          <option value="administracion">Administración</option>
        </select>

        <label htmlFor="year">Año:</label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          required
        />

        <label htmlFor="file">Archivo del Proyecto:</label>
        <input
          type="file"
          accept='image/png, image/jpeg'
          id="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />

        <button type="submit">Subir Proyecto</button>
      </form>
    </div>
  );
};

export default UploadProject;
