import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient.js';
import { UniversityBanner } from './UniversityBanner.jsx';
import { UniversityStats } from './UniversityStats.jsx';
import { UniversityInfo } from './UniversityInfo.jsx';
import { getUniversidadById } from '../bd/bd.js';
import { UniversityCareerList } from './UniversityCareerList.jsx';


export function UniversityDetail() {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('ID recibido desde URL:', id);
    if (!id) {
      setError('No se recibió ID de universidad');
      setLoading(false);
      return;
    }

    async function fetchUniversity() {
      setLoading(true);
      setError(null);

      const idNum = Number(id);
      console.log('ID convertido a número:', idNum);

      const data = await getUniversidadById(idNum)


      console.log('Data recibida:', data);
      console.log('Error recibido:', error);

      if (error) {
        setError('No se pudo cargar la universidad: ' + error.message);
        setUniversity(null);
      } else if (!data) {
        setError('Universidad no encontrada.');
        setUniversity(null);
      } else {
        setUniversity(data);
      }
      setLoading(false);
    }

    fetchUniversity();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Cargando universidad...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!university) return <p className="text-center mt-10">Universidad no encontrada.</p>;

  return (
    <div className="w-full min-h-screen bg-white">
    <UniversityBanner university={university} />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <UniversityStats university={university} />
      <UniversityInfo university={university} />
      <UniversityCareerList universityId={university.id} />
    </div>
  </div>
  );
}
