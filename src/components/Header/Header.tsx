import { AppBar, Button, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

export const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            WILDBERRIES
          </Link>
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Каталог
        </Button>

        <Button color="inherit" component={Link} to="/login">
          Войти
        </Button>
      </Toolbar>
    </AppBar>
  );
};
