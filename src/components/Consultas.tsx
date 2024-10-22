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
  const [query, setQuery] = useState<string>('');
  const [careerFilter, setCareerFilter] = useState<string>('');
  const [yearFilter, setYearFilter] = useState<string>('');

  const handleSearch = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
        setLoading(true);
        setError(null);

        // Construir el objeto de filtros dinámicamente
        const filters: any = {};
        if (query) filters.title = query;
        if (careerFilter) filters.career = careerFilter;
        if (yearFilter) filters.year = yearFilter;

        const response = await fetch('http://localhost:3000/searchProject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filters),
        });

        if (!response.ok) {
            const errorDetails = await response.text(); // Obtener detalles de error de la respuesta
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}. Detalles: ${errorDetails}`);
        }

        const data = await response.json();
        setResults(data as resultI[]);
    } catch (err) {
        console.error('Error al realizar la búsqueda:', err);
        setError(`Error al realizar la búsqueda. Detalles: ${(err as Error).message}`);
    } finally {
        setLoading(false);
    }
};
  const handleClearFilters = () => {
    setQuery('');
    setCareerFilter('');
    setYearFilter('');
    setResults([]);
    setError(null);
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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="filters">
          <select
            id="career"
            value={careerFilter}
            onChange={(e) => setCareerFilter(e.target.value)}
          >
            <option value="">Todas las carreras</option>
            <option value="ingenieria">Ingeniería</option>
            <option value="medicina">Medicina</option>
            <option value="administracion">Administración</option>
          </select>
          <input
            type="number"
            id="year"
            name="year"
            placeholder="Año"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          />
        </div>
        <div className="buttons-container"> 
          <button className="search-button" type="submit">
            Buscar
          </button>
          <button className="clear-button" type="button" onClick={handleClearFilters}>
            Limpiar Filtros
          </button>
        </div>
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
          !loading && !error && results.length === 0 && (
            <p>No se encontraron resultados.</p>
          )
        )}
      </div>
    </div>
  );
};



export default Consultas;
