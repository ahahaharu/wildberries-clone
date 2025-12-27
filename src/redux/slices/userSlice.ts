import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UserState {
  isAuth: boolean;
  username: string | null;
  token: string | null;
}

const tokenFfromStorage = localStorage.getItem('token');
const usernameFromStorage = localStorage.getItem('username');

const initialState: UserState = {
  isAuth: !!tokenFfromStorage,
  username: usernameFromStorage || null,
  token: tokenFfromStorage || null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ username: string; token: string }>
    ) => {
      state.isAuth = true;
      state.username = action.payload.username;
      state.token = action.payload.token;

      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('username', action.payload.username);
    },
    logout: (state) => {
      state.isAuth = false;
      state.username = null;
      state.token = null;

      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
