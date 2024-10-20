import React, { useState } from 'react';
import './Consultas.css';

interface resultI {
  title: string;
  id: any;
  career: string;
  year: number;
  fileUrl: string;
  author: string;
}

const Consultas: React.FC = () => {
  const [results, setResults] = useState<resultI[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { value: title } = evt.currentTarget.elements.namedItem('title') as HTMLInputElement;

    if (title.trim() === '') {
      alert('Por favor, ingresa un término de búsqueda.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:3000/searchProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error('Error al realizar la búsqueda');
      }

      const data = await response.json();
      setResults(data as resultI[]);
    } catch (err) {
      console.error('Error al realizar la búsqueda:', err);
      setError('Error al realizar la búsqueda. Inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consultas-container">
      <h1>Buscar Proyectos de Grado, Monográficos y Tesis</h1>
      <form className="search-section" onSubmit={handleSearch}>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Ingresa el término de búsqueda..."
        />
        <button className="search-button" type="submit">
          Buscar
        </button>
      </form>
      <div className="results-section">
        {loading && <p>Cargando resultados...</p>}
        {error && <p>{error}</p>}
        {results.length > 0 ? (
          <ul className="results-list">
            {results.map(({ author, career, id, title, year }: resultI) => (
              <li key={id} className="result-item">
                <div className="result-card">
                  <h2>{title}</h2>
                  <p><strong>Autor:</strong> {author}</p>
                  <p><strong>Carrera:</strong> {career}</p>
                  <p><strong>Año:</strong> {year}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
};

export default Consultas;