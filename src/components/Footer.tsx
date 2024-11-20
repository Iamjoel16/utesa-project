import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="footer-logo">
                <img src="/images/utesa-logo.png" alt="UTESA Logo" className="logo-image" />
            </div>
            
            <div className="footer-info">
                <p>Sistema Corporativo Universidad Tecnológica de Santiago | UTESA</p>
            </div>

            <div className="footer-contact">
                <p>Contáctanos:</p>
                <p>(809) 221 - 6221</p>
                <button className="email-button" onClick={() => window.location.href = 'mailto:prueba@utesa.com'}>
                    Vía Correo
                </button>
            </div>
           
        </footer>
    );
};

export default Footer;
