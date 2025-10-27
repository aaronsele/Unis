import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { supabase } from '../lib/supabaseClient';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Graphics() {
  const [uniData, setUniData] = useState(null);
  const [careerData, setCareerData] = useState(null);
  const [loadingUnis, setLoadingUnis] = useState(true);
  const [loadingCareers, setLoadingCareers] = useState(true);

  useEffect(() => {
    async function fetchUniFavorites() {
      try {
        const { data, error } = await supabase
          .from('UniFavoritas')
          .select('universidad_id');
        if (error) throw error;

        const counts = {};
        data.forEach(item => {
          counts[item.universidad_id] = (counts[item.universidad_id] || 0) + 1;
        });

        const labels = Object.keys(counts);
        const values = Object.values(counts);

        setUniData({
          labels,
          datasets: [
            {
              label: 'Universidades más favoritas',
              data: values,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
              ],
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
        const { data, error } = await supabase
          .from('CarreraFavo')
          .select('id_carrera');
        if (error) throw error;

        const counts = {};
        data.forEach(item => {
          counts[item.id_carrera] = (counts[item.id_carrera] || 0) + 1;
        });

        const labels = Object.keys(counts);
        const values = Object.values(counts);

        setCareerData({
          labels,
          datasets: [
            {
              label: 'Carreras más favoritas',
              data: values,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
              ],
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
    <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '400px', height: '400px' }}>
        {loadingUnis ? <p>Cargando universidades...</p> :
          uniData && <Pie data={uniData} />}
      </div>
      <div style={{ width: '400px', height: '400px' }}>
        {loadingCareers ? <p>Cargando carreras...</p> :
          careerData && <Pie data={careerData} />}
      </div>
    </div>
  );
}
