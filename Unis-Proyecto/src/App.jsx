import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home.jsx';
import { UniversityList } from './components/UniversityList.jsx';
import { UniversityDetail } from './components/UniversityDetail.jsx';
import { CareerList } from './components/CareerList';
import CareerDetail from './components/CareerDetail.jsx';
import { VocationalGuidance } from './components/VocationalGuidance';
import { UserProfile } from './components/UserProfile';
import { Login } from './components/auth/Login';
import { AuthLayout } from './components/auth/AuthLayout';
import { Faq } from './pages/Faq.jsx';
import { Terms } from './pages/Terms.jsx';
import { Privacy } from './pages/Privacy.jsx';
import { Register } from './components/Register';
import { ChangePassword } from './components/ChangePassword';
import { AddCareer } from './components/admin/AddCareer';
import { usePerfil } from './contexts/UsePerfil';
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute';


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="universities" element={<UniversityList />} />
          <Route path="universities/:id" element={<UniversityDetail />} />
          <Route path="careers" element={<CareerList />} />
          <Route path="careers/:id" element={<CareerDetail />} />
          <Route path="guidance" element={<VocationalGuidance />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/legal/terms" element={<Terms />} />
          <Route path="/legal/privacy" element={<Privacy />} />
          <Route path="/register" element={<Register />} />
          <Route path="/change-password" element={<ChangePassword />} />
        <Route path="add-career" element={
  <ProtectedAdminRoute>
    <AddCareer />
  </ProtectedAdminRoute>
} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
