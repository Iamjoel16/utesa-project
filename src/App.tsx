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
import AboutUs from './components/AboutUs';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/consultas" element={<Consultas />} />
            <Route path="/guia" element={<Guide />} />
            <Route path="/acerca" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredLevel={3}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subida-proyectos"
              element={
                <ProtectedRoute requiredLevel={3}>
                  <UploadProject />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
