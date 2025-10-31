import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { supabase } from '../lib/supabaseClient';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function Graphics() {
  const [uniData, setUniData] = useState(null);
  const [careerData, setCareerData] = useState(null);
  const [loadingUnis, setLoadingUnis] = useState(true);
  const [loadingCareers, setLoadingCareers] = useState(true);

  useEffect(() => {
    async function fetchUniFavorites() {
      try {
        // Traer las favoritas con la relación
        const { data, error } = await supabase
          .from('UniFavoritas')
          .select(`
            id_universidad,
            Universidad ( nombre )
          `);

        if (error) throw error;

        // Contar cuántas veces aparece cada universidad
        const counts = {};
        data.forEach(item => {
          const nombre = item.Universidad?.nombre || 'Desconocida';
          counts[nombre] = (counts[nombre] || 0) + 1;
        });

        const labels = Object.keys(counts);
        const values = Object.values(counts);

        setUniData({
          labels,
          datasets: [
            {
              label: 'Votos',
              data: values,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        console.error('Error trayendo UniFavoritas:', err);
      } finally {
        setLoadingUnis(false);
      }
    }

    async function fetchCareerFavorites() {
      try {
        // Traer las favoritas con la relación
        const { data, error } = await supabase
          .from('CarreraFavo')
          .select(`
            id_carrera,
            Carrera ( nombre )
          `);

        if (error) throw error;

        const counts = {};
        data.forEach(item => {
          const nombre = item.Carrera?.nombre || 'Desconocida';
          counts[nombre] = (counts[nombre] || 0) + 1;
        });

        const labels = Object.keys(counts);
        const values = Object.values(counts);

        setCareerData({
          labels,
          datasets: [
            {
              label: 'Votos',
              data: values,
              backgroundColor: [
                '#36A2EB',
                '#FF6384',
                '#FFCE56',
                '#9966FF',
                '#4BC0C0',
                '#FF9F40',
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        console.error('Error trayendo CarreraFavo:', err);
      } finally {
        setLoadingCareers(false);
      }
    }

    fetchUniFavorites();
    fetchCareerFavorites();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '50px',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      {/* Gráfico de universidades */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>Universidades más populares</h2>
        <div style={{ width: '400px', height: '400px' }}>
          {loadingUnis ? (
            <p>Cargando universidades...</p>
          ) : uniData ? (
            <Pie data={uniData} />
          ) : (
            <p>No hay datos disponibles.</p>
          )}
        </div>
      </div>

      {/* Gráfico de carreras */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>Carreras más populares</h2>
        <div style={{ width: '400px', height: '400px' }}>
          {loadingCareers ? (
            <p>Cargando carreras...</p>
          ) : careerData ? (
            <Pie data={careerData} />
          ) : (
            <p>No hay datos disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
}
