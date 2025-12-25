import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './api/productsApi';
import userReducer from './slices/userSlice';
import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
