import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  UserIcon,
  MenuIcon,
  BookOpenIcon,
  BuildingIcon,
  CompassIcon,
  BrainIcon,
  NewspaperIcon,
  BellIcon,
  XIcon,
  ShieldIcon,
} from 'lucide-react'

import { supabase } from '../lib/supabaseClient'
import logoUnis from '../assets/logoUnis.png'
import './Header.css'

const navigation = [
  { name: 'Explorar', to: '/explorar', icon: CompassIcon },
  { name: 'Carreras', to: '/carreras', icon: BookOpenIcon },
  { name: 'Dónde Estudiar', to: '/donde-estudiar', icon: BuildingIcon },
  { name: 'Orientación Vocacional', to: '/orientacion-vocacional', icon: BrainIcon },
  { name: 'Blog', to: '/blog', icon: NewspaperIcon },
]

function Header() {
  const [user, setUser] = useState(null)
  const [esAdmin, setEsAdmin] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user?.email) {
        const { data, error } = await supabase
          .from('Perfil')
          .select('esAdmin')
          .eq('email', user.email)
          .single()

        if (!error && data?.esAdmin === true) {
          setEsAdmin(true)
        } else {
          setEsAdmin(false)
        }
      }
    }

    fetchUser()

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchUser()
    })

    return () => {
      listener?.subscription?.unsubscribe()
    }
  }, [])

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">

          {/* Logo */}
          <div className="logo">
            <Link to="/" className="logo-link">
              <img src={logoUnis} alt="Unis logo" className="logo-image" />
            </Link>
          </div>

          {/* Navegación desktop */}
          <nav className="nav-desktop" aria-label="Menú principal">
            {navigation.map((item) => (
              <Link key={item.name} to={item.to} className="nav-link">
                <item.icon className="nav-icon" />
                {item.name}
              </Link>
            ))}
            {esAdmin && (
              <Link to="/admin" className="nav-link">
                <ShieldIcon className="nav-icon" />
                Admin
              </Link>
            )}
          </nav>

          {/* Derecha */}
          <div className="right-section">
            <button className="btn-icon" aria-label="Ver notificaciones">
              <BellIcon className="icon-md" />
            </button>

            {user ? (
              <div className="profile">
                <button className="profile-btn">
                  <div className="profile-avatar">
                    {user.user_metadata?.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} alt="avatar" />
                    ) : (
                      <UserIcon className="icon-gray" />
                    )}
                  </div>
                  <span className="profile-name">
                    {user.user_metadata?.full_name || 'Usuario'}
                  </span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="profile-btn">
                <div className="profile-avatar">
                  <UserIcon className="icon-gray" />
                </div>
                <span className="profile-name">Iniciar sesión</span>
              </Link>
            )}

            {/* Mobile Toggle */}
            <div className="menu-toggle">
              <button
                type="button"
                aria-label="Abrir menú principal"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <XIcon className="icon-md" />
                ) : (
                  <MenuIcon className="icon-md" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menú mobile */}
        {isMobileMenuOpen && (
          <div className="menu-mobile" id="mobile-menu">
            {navigation.map((item) => (
              <Link key={item.name} to={item.to} className="nav-link-mobile">
                <item.icon className="nav-icon-mobile" />
                {item.name}
              </Link>
            ))}
            {esAdmin && (
              <Link to="/admin" className="nav-link-mobile">
                <ShieldIcon className="nav-icon-mobile" />
                Admin
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
