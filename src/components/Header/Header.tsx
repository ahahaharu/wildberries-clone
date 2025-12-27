import React from 'react';
import { AppBar, Button, Toolbar, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout, selectUser } from '../../redux/slices/userSlice';

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuth, username } = useAppSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link
            to="/"
            style={{
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            WILDBERRIES CLONE
          </Link>
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Каталог
        </Button>

        {isAuth ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1">Привет, {username}</Typography>
            <Button
              color="inherit"
              onClick={handleLogout}
              variant="outlined"
              sx={{ borderColor: 'white' }}
            >
              Выйти
            </Button>
          </Box>
        ) : (
          // Если не вошли: Кнопка Войти
          <Button color="inherit" component={Link} to="/login">
            Войти
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
