import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  GraduationCapIcon,
  UserIcon,
  MenuIcon,
  BookOpenIcon,
  BuildingIcon,
  CompassIcon,
  BrainIcon,
  NewspaperIcon,
  BellIcon,
  XIcon,
} from 'lucide-react'

import './Header.css'

const navigation = [
  { name: 'Explorar', to: '/explorar', icon: CompassIcon },
  { name: 'Carreras', to: '/carreras', icon: BookOpenIcon },
  { name: 'Donde Estudiar', to: '/donde-estudiar', icon: BuildingIcon },
  { name: 'Orientación Vocacional', to: '/orientacion-vocacional', icon: BrainIcon },
  { name: 'Blog', to: '/blog', icon: NewspaperIcon },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          {/* Logo */}
          <div className="logo">
            <Link to="/" className="logo-link">
              <div className="logo-icon">
                <GraduationCapIcon className="icon-white" />
              </div>
              <div className="logo-text">
                <h1 className="logo-title">Unis</h1>
                <p className="logo-subtitle">Encuentra tu universidad ideal</p>
              </div>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="nav-desktop" aria-label="Menú principal">
            {navigation.map((item) => (
              <Link key={item.name} to={item.to} className="nav-link">
                <item.icon className="nav-icon" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right section */}
          <div className="right-section">
            <button className="btn-icon" aria-label="Ver notificaciones">
              <BellIcon className="icon-md" />
            </button>

            <div className="profile">
              <button className="profile-btn">
                <div className="profile-avatar">
                  <UserIcon className="icon-gray" />
                </div>
                <span className="profile-name">Astor De La Fuente</span>
              </button>
            </div>

            {/* Mobile menu toggle */}
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

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="menu-mobile" id="mobile-menu">
            {navigation.map((item) => (
              <Link key={item.name} to={item.to} className="nav-link-mobile">
                <item.icon className="nav-icon-mobile" />
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}