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
    const { data, error } = await supabase.from('Universidad').select('*')
    if (error) {
      console.error('Error al traer universidades:', error.message)
      return []
    }
    return data
  }
  
  export async function getCarreras() {
    const { data, error } = await supabase.from('Carrera').select('*')
    if (error) {
      console.error('Error al traer universidades:', error.message)
      return []
    }
    return data
  }
  
