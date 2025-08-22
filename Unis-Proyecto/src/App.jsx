import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home.jsx';
import { UniversityList } from './components/UniversityList.jsx';
import { UniversityDetail } from './components/UniversityDetail.jsx';
import { CareerList } from './components/CareerList';
import CareerDetail from './components/CareerDetail.jsx';
import CareerInUniversity from './components/CareerInUniversity.jsx';
import { VocationalGuidance } from './components/VocationalGuidance';
import { UserProfile } from './components/UserProfile';
import { Login } from './components/auth/Login';
import { AuthLayout } from './components/auth/AuthLayout';
import { Faq } from './pages/Faq.jsx';
import { Terms } from './pages/Terms.jsx';
import { Privacy } from './pages/Privacy.jsx';
import { ChangePassword } from './components/ChangePassword';
import { AddCareer } from './components/admin/AddCareer';
import AddCareerInUniversity from './components/admin/AddCareerInUniversity';
import AddUniversity from './components/admin/AddUniversity.jsx';
import UserViews from "./components/admin/UserViews.jsx";

import { ProtectedAdminRoute } from './components/ProtectedAdminRoute';
import { Register } from './components/auth/Register.jsx';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Páginas generales */}
          <Route index element={<Home />} />
          <Route path="universities" element={<UniversityList />} />
          <Route path="universities/:id" element={<UniversityDetail />} />
          <Route path="universities/:universityId/careers/:careerId" element={<CareerInUniversity />} />
          <Route path="careers" element={<CareerList />} />
          <Route path="careers/:id" element={<CareerDetail />} />
          <Route path="guidance" element={<VocationalGuidance />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="faq" element={<Faq />} />
          <Route path="legal/terms" element={<Terms />} />
          <Route path="legal/privacy" element={<Privacy />} />
          <Route path="register" element={<Register />} />
          <Route path="change-password" element={<ChangePassword />} />

          {/* Rutas de Admin */}
          <Route
            path="add-career"
            element={
              <ProtectedAdminRoute>
                <AddCareer />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="admin/universidades"
            element={
              <ProtectedAdminRoute>
                <AddCareerInUniversity />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="add-university"
            element={
              <ProtectedAdminRoute>
                <AddUniversity />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="admin/usuarios"
            element={
              <ProtectedAdminRoute>
                <UserViews />
              </ProtectedAdminRoute>
            }
          />
        </Route>

        {/* Rutas de Auth */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
