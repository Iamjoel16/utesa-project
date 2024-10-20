import React, { useState } from 'react';
import './Consultas.css';

interface resultI {
  title: string
  id: any
  career: string
  year: number
  fileUrl: string
  author: string
}

const Consultas: React.FC = () => {
  const [results, setResults] = useState<resultI[]>([]); 

  const handleSearch = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const {value: title} = evt.currentTarget.elements.namedItem('title') as HTMLInputElement


    if (title.trim() === '') {
      alert('Por favor, ingresa un término de búsqueda.');
      return;
    }

    try {

      fetch('http://localhost:3000/searchProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title
        }),
      }).then((res) => {
        return res.json()
      }).then((data) => {
        console.log(data)
        setResults(data as any)
      })

    } catch (err) {
      console.error('Error al realizar la búsqueda:', err);
      alert('Error al realizar la búsqueda. Inténtalo nuevamente.');
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
        <button className="search-button" type='submit'>
          Buscar
        </button>
      </form>
      <div className="results-section">
        {results.length > 0 ? (
          <ul>
            {results.map(({author, career, id,title, year}: resultI) => (
              <li key={id}>autor: {author} carrera: {career} titulo: {title} año: {year}</li>
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
