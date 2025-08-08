import { supabase } from '../lib/supabaseClient'

// version genérica:

// export async function getTabla(nombreTabla) {
//   const { data, error } = await supabase.from(nombreTabla).select('*')
//   if (error) {
//     console.error(`Error al traer datos de ${nombreTabla}:`, error.message)
//     return []
//   }
//   return data
// }

//y dsp se trae así:

// useEffect(() => {
//     async function fetchNombreDelUseState() {
//       const data = await nombreFuncion()
//       setNombreDelUseState(data)
//     }
//     fetchCareers()
//   }, [])

export async function getUniversidades() {
  const { data, error } = await supabase
    .from('Universidad')
    .select(`
      *,
      InstalacionxUniversidad (
        id,
        Instalaciones (
          nombre
        )
      ),
      RequisitosAdmisionXUniversidad (
        id,
        RequisitosAdmision (
          nombre
        )
      )
    `)

  if (error) {
    console.error('Error al traer universidades:', error.message)
    return []
  }


  const universidades = data.map((u) => ({
    ...u,
    facilities: u.InstalacionxUniversidad?.map(iu => iu.Instalaciones?.nombre) || [],
    admissionProcess: {
      requirements: u.RequisitosAdmisionXUniversidad?.map(ru => ru.RequisitosAdmision?.nombre) || [],
      cost: u.costoMensualPromedio || 'No especificado',
      dates: u.fechaInscripcion || 'No disponible',
    },
    contact: {
      address: u.direccion,
      phone: u.telefono,
      email: u.email,
      website: u.sitioWeb,
    },
  }))
  console.log('🔍 DATA DE SUPABASE:', data) // <-- ESTE ES EL IMPORTANTE

  return universidades
}

  
  export async function getCarreras() {
    const { data, error } = await supabase.from('Carrera').select('*')
    if (error) {
      console.error('Error al traer universidades:', error.message)
      return []
    }
    return data
  }

  export async function getCarreraById(id) {
  const { data, error } = await supabase
    .from('Carrera')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error al traer carrera por ID:', error.message);
    return null;
  }
  return data;
}
  
  export async function getUniversidadById(id) {
    const { data, error } = await supabase
      .from('Universidad')
      .select(`
        *,
        InstalacionxUniversidad (
          id,
          Instalaciones (
            nombre
          )
        ),
        RequisitosAdmisionXUniversidad (
          id,
          RequisitosAdmision (
            nombre
          )
        )
      `)
      .eq('id', id)
      .single()
  
    if (error) {
      console.error('Error al traer universidad por ID:', error.message)
      return null
    }
  
    return {
      ...data,
      facilities: data.InstalacionxUniversidad?.map(iu => iu.Instalaciones?.nombre) || [],
      admissionProcess: {
        requirements: data.RequisitosAdmisionXUniversidad?.map(ru => ru.RequisitosAdmision?.nombre) || [],
        cost: data.costoMensualPromedio || 'No especificado',
        dates: data.fechaInscripcion || 'No disponible',
      },
      contact: {
        address: data.direccion,
        phone: data.telefono,
        email: data.email,
        website: data.sitioWeb,
      },
    }
  }
  
  export async function getCarrerasByUniversidadId(universidadId) {
    const { data, error } = await supabase
      .from('CarreraXUniversidad')
      .select(`
        id,
        duracionAnios,
        modalidad,
        costoMensual,
        direccion,
        telefono,
        email,
        horarioAtencion,
        carrera:Carrera (
          id,
          nombre,
          descripcion,
          foto
        )
      `)
      .eq('idUniversidad', universidadId) // <-- nombre correcto de la columna
  
    if (error) {
      console.error('Error al traer carreras por universidad:', error.message)
      return []
    }
  
    // devolvemos solo la info de la carrera + datos extra de la tabla intermedia
    return data.map(item => ({
      ...item.carrera,
      duracionAnios: item.duracionAnios,
      modalidad: item.modalidad,
      costoMensual: item.costoMensual,
      direccion: item.direccion,
      telefono: item.telefono,
      email: item.email,
      horarioAtencion: item.horarioAtencion
    }))
  }
  
  
  export async function getCursosOV() {
    const { data, error } = await supabase
      .from('cursoOV')
      .select(`
        *,
        Profesional (
          nombre,
          apellido,
          foto,
          especialidad
        )
      `);
  
    if (error) {
      console.error('Error al traer cursos vocacionales:', error.message);
      return [];
    }
  
    return data;
  }

  export async function getPerfilByUserId(user_id) {
    const { data, error } = await supabase
      .from('Perfil')
      .select('*')
      .eq('user_id', user_id)
      .limit(1) 
  
    if (error) {
      console.error('Error al traer el perfil:', error.message)
      return null
    }
  
    return data?.[0] || null
  }
  
export async function insertCarrera(carrera) {
  const { data, error } = await supabase
    .from('Carrera')
    .insert([carrera]);

  if (error) {
    console.log('Error al insertar carrera:', error);
    return null;
  }

  return data;
}
