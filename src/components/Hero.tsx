import React from 'react';
import './Hero.css';

function Hero() {
    return (
        <section className="hero">
            <h1>Consulta y Accede a Proyectos de Grado, Monográficos y Tesis de UTESA</h1>
            <a href="/consultas"><button className="explore-button">Explorar Proyectos</button></a>
        </section>
    );
}

export default Hero;
