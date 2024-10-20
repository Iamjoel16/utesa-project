import React from 'react';
import './Guide.css';

const Guide: React.FC = () => {
  return (
    <div className="guide-container">
      <h2>Guía para Elaborar Proyectos de Grado, Monográficos y Tesis</h2>
      <div className="guide-content">
        <section className="guide-section">
          <h3>Introducción</h3>
          <p>
            Esta guía está diseñada para ayudar a los estudiantes de UTESA a elaborar sus proyectos de grado, monográficos y tesis. A continuación, encontrarás pasos y recursos útiles que te acompañarán durante el proceso.
          </p>
        </section>

        <section className="guide-section">
          <h3>Pasos para Elaborar un Proyecto</h3>
          <ol>
            <li><strong>Elección del Tema:</strong> Selecciona un tema de tu interés y relevante para tu carrera.</li>
            <li><strong>Revisión Bibliográfica:</strong> Investiga en fuentes académicas para encontrar información sobre tu tema.</li>
            <li><strong>Desarrollo del Marco Teórico:</strong> Expón los conceptos y teorías que respaldan tu investigación.</li>
            <li><strong>Metodología:</strong> Define cómo llevarás a cabo tu investigación, incluyendo métodos de recolección de datos.</li>
            <li><strong>Resultados y Conclusiones:</strong> Presenta tus hallazgos y reflexiona sobre ellos.</li>
          </ol>
        </section>

        <section className="guide-section">
          <h3>Recursos Adicionales</h3>
          <ul>
            <li><a href="/files/guia-elaboracion.pdf" download>Guía de Elaboración de Proyectos (PDF)</a></li>
            <li><a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer">Google Scholar - Revisión Bibliográfica</a></li>
            <li><a href="https://www.zotero.org/" target="_blank" rel="noopener noreferrer">Zotero - Herramienta de Gestión Bibliográfica</a></li>
          </ul>
        </section>

        <section className="guide-section">
          <h3>Ejemplos de Proyectos</h3>
          <ul>
            <li><a href="/files/proyecto-ejemplo1.pdf" download>Ejemplo de Proyecto de Grado - Ingeniería</a></li>
            <li><a href="/files/proyecto-ejemplo2.pdf" download>Ejemplo de Monográfico - Medicina</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Guide;
