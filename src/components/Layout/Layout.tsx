import React from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { Container, Box, Stack } from '@mui/material';
import { Header } from '../Header/Header';

const Layout = () => {
  return (
    <Stack sx={{ minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
        <Outlet />
      </Container>
    </Stack>
  );
};

export default Layout;
