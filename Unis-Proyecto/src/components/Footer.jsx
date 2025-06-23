import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCapIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
} from 'lucide-react';

const links = {
  explorar: [
    { name: 'Universidades', href: '/universities' },
    { name: 'Carreras', href: '/careers' },
    { name: 'Orientación Vocacional', href: '/guidance' },
    { name: 'Blog', href: '/blog' },
  ],
  recursos: [
    { name: 'Guía de Inscripción', href: '/guides/inscription' },
    { name: 'Becas', href: '/scholarships' },
    { name: 'Preguntas Frecuentes', href: '/faq' },
    { name: 'Eventos', href: '/events' },
  ],
  legal: [
    { name: 'Términos y Condiciones', href: '/legal/terms' },
    { name: 'Política de Privacidad', href: '/legal/privacy' },
    { name: 'Cookies', href: '/legal/cookies' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#2560B9' }}
              >
                <GraduationCapIcon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-3">
                <h3 className="text-xl font-bold" style={{ color: '#2F2F2F' }}>
                  Unis
                </h3>
              </div>
            </Link>
            <p className="text-gray-600">
              Ayudamos a estudiantes a encontrar su camino académico ideal y
              construir su futuro profesional.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Enlaces de Explorar */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Explorar
            </h3>
            <ul className="space-y-3">
              {links.explorar.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enlaces de Recursos */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Recursos
            </h3>
            <ul className="space-y-3">
              {links.recursos.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPinIcon className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-600">Av. Corrientes 1234, CABA</span>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-gray-600">+54 11 5555-5555</span>
              </li>
              <li className="flex items-center">
                <MailIcon className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-gray-600">contacto@unis.edu.ar</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pie del footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 Unis. Todos los derechos reservados.
            </p>
            <div className="mt-4 md:mt-0 space-x-6">
              {links.legal.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
