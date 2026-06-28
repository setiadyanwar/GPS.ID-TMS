// Konfigurasi routing utama dan route guard untuk autentikasi
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import ProtectedRoute from './ProtectedRoute';
import { TooltipProvider } from '@/shared/ui/Tooltip/TooltipProvider';

// Lazy load pages untuk code splitting otomatis per route
const Login = lazy(() => import('../pages/Login'));
const VehicleList = lazy(() => import('../pages/VehicleList'));

export const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      {/* Global tooltip singleton — seperti Sonner, cukup dipasang sekali di sini */}
      <TooltipProvider />
      <Suspense>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/vehicle-list" 
            element={<ProtectedRoute><VehicleList /></ProtectedRoute>} />
          {/* Redirect root dan unknown routes ke dashboard (ProtectedRoute yang akan mencegat jika belum login) */}
          <Route path="/" element={<Navigate to="/vehicle-list" replace />} />
          <Route path="*" element={<Navigate to="/vehicle-list" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
