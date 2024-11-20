import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageCareers.css';

const ManageCareers: React.FC = () => {
  const [careers, setCareers] = useState<{ id: number; name: string }[]>([]);
  const [newCareer, setNewCareer] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/careers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCareers(response.data);
    } catch (error) {
      console.error('Error al obtener las carreras:', error);
      setError('No se pudieron cargar las carreras.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCareer = async () => {
    if (!newCareer.trim()) {
      alert('Por favor, ingresa el nombre de la carrera.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/careers',
        { name: newCareer },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message);
      setNewCareer('');
      fetchCareers(); 
    } catch (error) {
      console.error('Error al añadir la carrera:', error);
      alert('No se pudo añadir la carrera.');
    }
  };

  const handleDeleteCareer = async (id: number) => {
    if (!window.confirm('¿Estás seguro de eliminar esta carrera?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:3000/careers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(response.data.message);
      fetchCareers(); 
    } catch (error) {
      console.error('Error al eliminar la carrera:', error);
      alert('No se pudo eliminar la carrera.');
    }
  };

  return (
    <div className="manage-careers-container">
  <h2>Gestionar Carreras Universitarias</h2>
  <div className="add-career-form">
    <input
      type="text"
      placeholder="Nueva Carrera"
      value={newCareer}
      onChange={(e) => setNewCareer(e.target.value)}
    />
    <button onClick={handleAddCareer}>Añadir Carrera</button>
  </div>
  {loading ? (
    <p>Cargando carreras...</p>
  ) : error ? (
    <p>{error}</p>
  ) : (
    <ul className="career-list">
      {careers.map((career) => (
        <li key={career.id}>
          <span>{career.name}</span>
          <button onClick={() => handleDeleteCareer(career.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  )}
</div>
  );
};

export default ManageCareers;
