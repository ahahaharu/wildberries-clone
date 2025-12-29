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
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>
              WILDBERRIES CLONE
            </Box>
            <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }}>
              WB CLONE
            </Box>
          </Link>
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Каталог
        </Button>

        {isAuth ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="body1"
              sx={{
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Привет, {username}
            </Typography>
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
          <Button color="inherit" component={Link} to="/login">
            Войти
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
