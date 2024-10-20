import React, { useState } from 'react';
import './Consultas.css';

const Consultas: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<string[]>([]); // Puedes cambiar el tipo según los datos reales

  // Función para manejar la acción del botón de buscar
  const handleSearch = async () => {
    if (query.trim() === '') {
      alert('Por favor, ingresa un término de búsqueda.');
      return;
    }

    // Simulación de búsqueda
    try {
      // Aquí podrías hacer una solicitud al servidor para buscar datos reales.
      // Ejemplo de una búsqueda local simulada
      const mockResults = [
        'Proyecto de Grado en Ingeniería - 2021',
        'Monográfico de Medicina - 2022',
        'Tesis en Administración - 2020',
      ];
      const filteredResults = mockResults.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );

      setResults(filteredResults);
    } catch (err) {
      console.error('Error al realizar la búsqueda:', err);
      alert('Error al realizar la búsqueda. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="consultas-container">
      <h1>Buscar Proyectos de Grado, Monográficos y Tesis</h1>
      <div className="search-section">
        <input
          type="text"
          placeholder="Ingresa el término de búsqueda..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Buscar
        </button>
      </div>
      <div className="results-section">
        {results.length > 0 ? (
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
};

export default Consultas;
