import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
} from 'lucide-react';

const navigation = [
  {
    name: 'Explorar',
    href: '/',
    icon: CompassIcon,
  },
  {
    name: 'Carreras',
    href: '/careers',
    icon: BookOpenIcon,
  },
  {
    name: 'Donde Estudiar',
    href: '/universities',
    icon: BuildingIcon,
  },
  {
    name: 'Orientación Vocacional',
    href: '/guidance',
    icon: BrainIcon,
  },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#2560B9' }}
              >
                <GraduationCapIcon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-3 hidden sm:block">
                <h1 className="text-2xl font-bold" style={{ color: '#2F2F2F' }}>
                  Unis
                </h1>
                <p className="text-sm text-gray-600">
                  Encuentra tu universidad ideal
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md group transition-colors duration-200"
                >
                  <Icon
                    className="w-5 h-5 mr-2 group-hover:text-blue-600"
                    style={{ color: '#2560B9' }}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right section */}
          <div className="flex items-center space-x-6">
            <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
              <span className="sr-only">Ver notificaciones</span>
              <BellIcon className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <Link to="/profile" className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-gray-500" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  Astor De La Fuente
                </span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="sr-only">Abrir menú principal</span>
                {isMobileMenuOpen ? (
                  <XIcon className="block h-6 w-6" />
                ) : (
                  <MenuIcon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    <Icon className="w-5 h-5 mr-3" style={{ color: '#2560B9' }} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
