import React, { useState, useEffect } from 'react';
import './Consultas.css';

interface resultI {
  title: string;
  id: any;
  career: string;
  year: number;
  fileUrl: string;
  author: string;
  summary: string; 
}

const Consultas: React.FC = () => {
  const [results, setResults] = useState<resultI[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');
  const [careerFilter, setCareerFilter] = useState<string>('');
  const [yearFilter, setYearFilter] = useState<string>('');
  const [authorFilter, setAuthorFilter] = useState<string>('');
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [careers, setCareers] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await fetch('http://localhost:3000/careers', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Error al obtener las carreras');
        }
        const data = await response.json();
        setCareers(data); 
      } catch (error) {
        console.error('Error al obtener las carreras:', error);
      }
    };

    fetchCareers(); 
  
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 20 }, (_, i) => currentYear - i);
    setAvailableYears(years);
  }, []);

  const handleSearch = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const filters: any = {};
    if (query.trim()) filters.title = query;
    if (careerFilter) filters.career = careerFilter;
    if (yearFilter) filters.year = yearFilter;
    if (authorFilter.trim()) filters.author = authorFilter;

    try {
      setLoading(true);
      setError(null);
      setResults([]);

      const response = await fetch('http://localhost:3000/searchProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
        body: JSON.stringify(filters), 
      });

      if (!response.ok) {
        throw new Error('Error al realizar la búsqueda');
      }

      const data = await response.json();
      setResults(data as resultI[]);
    } catch (err) {
      console.error('Error al realizar la búsqueda:', err);
      setError('No hay datos que coincidan con su búsqueda. Inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consultas-container">
      <form className="search-section" onSubmit={handleSearch}>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Ingresa el término de búsqueda..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          type="text"
          id="author"
          name="author"
          placeholder="Ingresa el nombre del autor..."
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
        />
        <div className="filters">
          <select
            id="career"
            value={careerFilter}
            onChange={(e) => setCareerFilter(e.target.value)}
          >
            <option value="">Todas las carreras</option>
            {careers.map((career) => (
              <option key={career.id} value={career.name}>
                {career.name}
              </option>
            ))}
          </select>
          <select
            id="year"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option value="">Selecciona el año</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="buttons-container">
          <button className="search-button" type="submit">
            Buscar
          </button>
          <button
            className="clear-button"
            type="button"
            onClick={() => {
              setQuery('');
              setCareerFilter('');
              setYearFilter('');
              setAuthorFilter('');
              setResults([]);
              setError(null);
            }}
          >
            Limpiar Filtros
          </button>
        </div>
      </form>

      <div className="container-results">
        <h1>Buscar Proyectos de Grado, Monográficos y Tesis</h1>
        <div className="results-section">
          {loading && <p>Cargando resultados...</p>}
          {error && <p>{error}</p>}
          {results.length > 0 ? (
            <table className="results-table">
              {results.map(({ author, career, id, title, year, fileUrl, summary }: resultI) => (
                <tr key={id}>
                  <h2>{title}</h2>
                  <p><strong>Autor:</strong> {author}</p>
                  <p><strong>Carrera:</strong> {career}</p>
                  <p><strong>Año:</strong> {year}</p>
                  <p><strong>Resumen:</strong> <span dangerouslySetInnerHTML={{ __html: summary }} /></p> 
                </tr>
              ))}
            </table>
          ) : (
            !loading && <p></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Consultas;
