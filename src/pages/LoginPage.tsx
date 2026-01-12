import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Paper,
} from '@mui/material';
import { useLoginMutation } from '../redux/api/productsApi';
import { useAppDispatch } from '../redux/hooks';
import { setCredentials } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, { isLoading, isError }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await login({ username, password }).unwrap();

      dispatch(
        setCredentials({
          username: userData.username,
          token: userData.accessToken,
        })
      );
      navigate('/');
    } catch (err) {
      console.error('Ошибка входа:', err);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 3, fontWeight: 'bold' }}>
          Вход в Wildberries
        </Typography>

        <div>
          Test user: <b>emilys</b> <br />
          Pass: <b>emilyspass</b>
        </div>

        {isError && (
          <Alert severity="error" sx={{ width: '100%', marginBottom: 2 }}>
            Неверный логин или пароль
          </Alert>
        )}

        <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
          <TextField
            label="Имя пользователя"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            label="Пароль"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isLoading}
            sx={{ marginTop: 3 }}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
