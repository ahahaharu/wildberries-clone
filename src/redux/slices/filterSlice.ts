import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface FilterState {
  search: string;
  category: string | null;
  currentPage: number;
  itemsPerPage: number;
  sortBy: string | undefined;
  order: 'asc' | 'desc' | undefined;
}

const initialState: FilterState = {
  search: '',
  category: null,
  currentPage: 1,
  itemsPerPage: 6,
  sortBy: undefined,
  order: undefined,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.currentPage = 1;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSort: (
      state,
      action: PayloadAction<{ sortBy: string; order: 'asc' | 'desc' }>
    ) => {
      state.sortBy = action.payload.sortBy;
      state.order = action.payload.order;
    },
  },
});

export const { setSearch, setCategory, setPage, setSort } = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;
