import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Consultas from './components/Consultas';
import UploadProject from './components/UploadProject';
import Guide from './components/Guide';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/consultas" element={<Consultas />} />
            <Route path="/subida-proyectos" element={<UploadProject />} />
            <Route path="/guia" element={<Guide />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
