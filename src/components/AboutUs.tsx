import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-us">
            <section className="history">
                <h2>Historia</h2>
                <p>
                    La Universidad Tecnológica de Santiago, UTESA, redefine su misión con el fin de dar respuestas a los nuevos retos que consisten en apoyar y sustentar la construcción de un futuro para todos, cuyos propósitos tomen en cuenta las profundas transformaciones que los avances tecnológicos y científicos han producido, en una sociedad en la cual el conocimiento y la comunicación ocupan un lugar primordial.
                </p>
                <p>
                    Esa sociedad está movida por las competencias para crear, innovar y emprender, en un movimiento permanente, bajo los lineamientos de los paradigmas de una nueva sociedad mundial. Las nuevas reformas que es necesario emprender abarcan un nuevo modelo de gestión académica-administrativa, el parque industrial existente y también el parque tecnológico, de tal manera que puedan servir como laboratorios para la incubación de empresas, proyectos y programas de emprendimiento, modelos de organización, para dar soluciones a los retos planteados. Como base de todo lo anterior, tenemos la obligación de dar cumplimiento a la misión, contenida en los fundamentos filosóficos del nuevo Sistema Corporativo Universidad Tecnológica de Santiago.
                </p>
            </section>

            <section className="philosophical-foundations">
                <h2>Fundamentos Filosóficos</h2>
                <h3>Filosofía</h3>
                <p>
                    La Universidad Tecnológica de Santiago, UTESA, en su declaración de principios, promueve la democracia, la cultura nacional y universal, aporta alternativas y soluciones a los problemas nacionales, presta servicios pertinentes a la comunidad en el ámbito local, nacional e internacional. Por su carácter de Universidad Corporativa, crítica, abierta y humanista ofrece amplias oportunidades en todos los niveles y modalidades de la educación superior, a las personas con aspiraciones de superación personal y profesional, coherentes con las exigencias del mercado laboral y el nivel de desarrollo de las fuerzas productivas del país, bajo los más altos estándares de calidad.
                </p>
                <h3>Misión</h3>
                <p>
                    Formamos líderes de manera integral a través de nuestras funciones de docencia, investigación y vinculación, desde un modelo de sistema corporativo con proyección global, de emprendimiento y sostenibilidad. Conforme a un criterio humanista, contribuimos a la búsqueda permanente de soluciones a los desafíos de la sociedad, mediante la ciencia, la tecnología y la innovación.
                </p>
                <h3>Visión</h3>
                <p>
                    Ser el referente de ecosistema universitario de excelencia e innovación permanente, comprometido con el desarrollo sostenible, el emprendimiento y la responsabilidad corporativa.
                </p>
            </section>
        </div>
    );
};

export default AboutUs;
