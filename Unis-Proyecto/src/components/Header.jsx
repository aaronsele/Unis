import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCapIcon,
  UserIcon,
  BookOpenIcon,
  BuildingIcon,
  BrainIcon,
  BellIcon,
  SettingsIcon,
  PlusCircleIcon,
  HandIcon,
  BarChartIcon, // <-- Agregado
} from 'lucide-react';
import './header.css';
import { usePerfil } from '../contexts/UsePerfil';

const navigation = [
  { name: 'Carreras', href: '/careers', icon: BookOpenIcon },
  { name: 'Donde Estudiar', href: '/universities', icon: BuildingIcon },
  { name: 'Orientación Vocacional', href: '/guidance', icon: BrainIcon },
  { name: 'Gráficos', href: '/graphics', icon: BarChartIcon }, // <-- Nueva opción
];

export function Header() {
  const { perfil } = usePerfil();

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center logo-container">
            <Link to="/" className="flex items-center">
              <div className="logo-icon">
                <img src="/src/assets/logoUnis.png" alt="Logo Unis" />
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="nav-desktop">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.name} to={item.href} className="nav-link">
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}

            {perfil?.esAdmin && (
              <div className="nav-link dropdown">
                <SettingsIcon className="w-5 h-5" />
                Admin
                <div className="dropdown-menu">
                  <Link to="/add-career" className="dropdown-item">
                    <PlusCircleIcon className="w-4 h-4" /> Agregar Carrera
                  </Link>

                  <Link to="/add-university" className="dropdown-item">
                    <PlusCircleIcon className="w-4 h-4" /> Agregar Universidad
                  </Link>

                  <Link to="/admin/universidades" className="dropdown-item">
                    <HandIcon className="w-4 h-4" /> Vincular Carrera a Universidad
                  </Link>
                  <Link to="/admin/usuarios" className="dropdown-item">
                    <UserIcon className="w-4 h-4" /> Usuarios
                  </Link>
                </div>
              </div>
            )}
          </nav>

          {/* Perfil + notificaciones */}
          <div className="right-section flex items-center space-x-4">
            <button className="notification-button">
              <BellIcon className="h-6 w-6" />
            </button>
            <div className="user-profile">
              <Link to="/profile" className="flex items-center space-x-2">
                {perfil?.foto ? (
                  <img
                    src={perfil.foto}
                    alt="Foto de perfil"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300"
                  />
                ) : (
                  <UserIcon className="w-6 h-6 text-gray-500" />
                )}
                {perfil?.nombre && (
                  <span className="text-gray-700 font-medium">
                    {perfil.nombre}
                  </span>
                )}
              </Link>
              <Link to="/settings" className="settings-button">
                <SettingsIcon className="h-6 w-6 text-gray-600" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
