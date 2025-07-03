import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCapIcon,
  UserIcon,
  BookOpenIcon,
  BuildingIcon,
  CompassIcon,
  BrainIcon,
  BellIcon,
} from 'lucide-react';
import './header.css';

const navigation = [
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
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center logo-container">
            <Link to="/" className="flex items-center">
              <div className="logo-icon">
              <img src='/src/assets/logoUnis.png' alt="Logo Unis" />
              </div>
            </Link>
          </div>

          {/* Navigation - always visible */}
          <nav className="nav-desktop">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="nav-link"
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right section */}
          <div className="right-section">
            <button className="notification-button">
              <BellIcon className="h-6 w-6" />
            </button>
            <div className="user-profile">
              <Link to="/profile" className="flex items-center space-x-3">
                <div className="user-icon">
                  <UserIcon className="w-5 h-5 text-gray-500" />
                </div>
                
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
