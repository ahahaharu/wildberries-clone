import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';

export const App = () => {
  const basename =
    process.env.NODE_ENV === 'production' ? '/wildberries-clone' : '/';

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="product/:id" element={<ProductPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
