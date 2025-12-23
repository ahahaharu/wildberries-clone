import React from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import { Header } from '../Header/Header';

const Layout = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
