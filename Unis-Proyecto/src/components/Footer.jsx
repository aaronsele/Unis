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
import './footer.css';

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
    <footer>
      <div className="footer-container">
        <div className="footer-grid">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <div className="logo-icon">
                <img src="/src/assets/logoUnis2.png" alt="Logo Unis" className="logo-img" />
              </div>
              <div className="ml-3">
                <h3 className="text-xl font-bold">Unis</h3>
              </div>
            </Link>
            <p>
              Ayudamos a estudiantes a encontrar su camino académico ideal y
              construir su futuro profesional.
            </p>
            <div className="flex space-x-4">
              <a href="#"><FacebookIcon className="w-5 h-5" /></a>
              <a href="#"><TwitterIcon className="w-5 h-5" /></a>
              <a href="#"><InstagramIcon className="w-5 h-5" /></a>
              <a href="#"><LinkedinIcon className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3>Explorar</h3>
            <ul className="space-y-3">
              {links.explorar.map((link) => (
                <li key={link.name}>
                  <Link to={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPinIcon className="w-5 h-5 mr-2 mt-0.5" />
                <span>Av. Corrientes 1234, CABA</span>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="w-5 h-5 mr-2" />
                <span>+54 11 5555-5555</span>
              </li>
              <li className="flex items-center">
                <MailIcon className="w-5 h-5 mr-2" />
                <span>contacto@unis.edu.ar</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 Unis. Todos los derechos reservados.</p>
          <div className="footer-links">
            {links.legal.map((link) => (
              <Link key={link.name} to={link.href}>{link.name}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
