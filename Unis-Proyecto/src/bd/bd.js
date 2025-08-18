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

export async function crearPerfil(payload) {
  try {
    // 1️⃣ Crear usuario en Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.contraseña
    });

    if (authError) {
      console.error("Error al crear usuario Auth:", authError.message);
      return null;
    }

    // 2️⃣ Preparar payload solo con columnas válidas para Perfil
    const perfilPayload = {
      nombre: payload.nombre,
      email: payload.email,
      idRol: payload.idRol ? Number(payload.idRol) : null,
      especialidad: payload.especialidad || null,
      empresa: payload.empresa || null,
      esAdmin: false,
      user_id: authData.user.id,
      foto: payload.foto || null
    };

    // 3️⃣ Insertar en tabla Perfil
    const { data: perfilData, error: perfilError } = await supabase
      .from("Perfil")
      .insert([perfilPayload]);

    if (perfilError) {
      console.error("Error al insertar en Perfil:", perfilError.message);
      return null;
    }

    return perfilData;

  } catch (err) {
    console.error("Error inesperado en crearPerfil:", err);
    return null;
  }
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
        Perfil (
          nombre,
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



export async function getCareerInUniversity(universityId, careerId) {
  const { data, error } = await supabase
    .from('CarreraXUniversidad')
    .select(`
      duracionAnios,
      modalidad,
      costoMensual,
      direccion,
      telefono,
      email,
      horarioAtencion,
      foto,
      Universidad ( nombre ),
      Carrera ( nombre )
    `)
    .eq('idUniversidad', universityId)
    .eq('idCarrera', careerId)
    .single();

  if (error) {
    console.error('Error al traer carrera en universidad:', error);
    return null;
  }

  return {
    duracionAnios: data.duracionAnios,
    modalidad: data.modalidad,
    costoMensual: data.costoMensual,
    direccion: data.direccion,
    telefono: data.telefono,
    email: data.email,
    horarioAtencion: data.horarioAtencion,
    foto: data.foto,
    nombreUniversidad: data.Universidad?.nombre || '',
    nombreCarrera: data.Carrera?.nombre || ''
  };
}

export async function getUniversitiesForCareer(careerId) {
  const { data, error } = await supabase
    .from('CarreraXUniversidad')
    .select('Universidad(id,nombre,descripcion,foto,direccion,cantEstudiantes,cantCarreras,publica)')
    .eq('idCarrera', careerId);

  if (error) {
    console.error(error);
    return [];
  }

  return data.map(item => item.Universidad);
}

export async function addCareerInUniversity(data) {
  const { data: insertedData, error } = await supabase
    .from("CarreraXUniversidad")
    .insert([
      {
        duracionAnios: data.duracionAnios,
        modalidad: data.modalidad,
        costoMensual: data.costoMensual,
        direccion: data.direccion,
        telefono: data.telefono,
        email: data.email,
        horarioAtencion: data.horarioAtencion,
        idUniversidad: data.idUniversidad,
        idCarrera: data.idCarrera,
        foto: data.foto,
      },
    ])
    .select();

  if (error) {
    console.error("Error insertando carrera en universidad:", error);
    throw error;
  }

  return insertedData;
}