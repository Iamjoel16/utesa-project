import React from 'react';
import './SearchSection.css';

function SearchSection() {
    return (
        <section className="search-section">
            <h1>Buscar Proyectos</h1>
            <input type="text" placeholder="Buscar por título, autor o palabras clave..." />
            <button className="search-button">Buscar</button>
            <div className="filters">
                <label htmlFor="tipo">Tipo:</label>
                <select id="tipo">
                    <option value="todos">Todos</option>
                    <option value="proyecto">Proyecto de Grado</option>
                    <option value="monografico">Monográfico</option>
                    <option value="tesis">Tesis</option>
                </select>
                <label htmlFor="carrera">Carrera:</label>
                <select id="carrera">
                    <option value="todas">Todas</option>
                    <option value="ingenieria">Ingeniería</option>
                    <option value="medicina">Medicina</option>
                    <option value="administracion">Administración</option>
                </select>
                <label htmlFor="anio">Año:</label>
                <select id="anio">
                    <option value="todos">Todos</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                </select>
            </div>
        </section>
    );
}

export default SearchSection;
