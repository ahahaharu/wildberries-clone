import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectFilter,
  setCategory,
  setSearch,
  setSort,
} from '../../redux/slices/filterSlice';
import { useGetCategoriesQuery } from '../../redux/api/productsApi';
import { Box } from '@mui/system';
import {
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';

export const SidebarFilters = () => {
  const dispatch = useAppDispatch();
  const { category, search, sortBy, order } = useAppSelector(selectFilter);
  const { data: categories } = useGetCategoriesQuery();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCategory(null));
    dispatch(setSearch(e.target.value));
  };

  const handleSort = (e: SelectChangeEvent) => {
    const value = e.target.value;

    if (value === '') {
      dispatch(setSort(undefined));
    }

    if (value === 'price_asc') {
      dispatch(setSort({ sortBy: 'price', order: 'asc' }));
    }
    if (value === 'price_desc') {
      dispatch(setSort({ sortBy: 'price', order: 'desc' }));
    }
    if (value === 'title_asc') {
      dispatch(setSort({ sortBy: 'title', order: 'asc' }));
    }
  };

  const handleCategory = (cat: string | null) => {
    dispatch(setSearch(''));
    dispatch(setCategory(cat));
  };

  return (
    <Box sx={{ padding: 2, bgcolor: 'background.paper', height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Поиск
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Поиск..."
        value={search}
        onChange={handleSearch}
        size="small"
        sx={{ marginBottom: 2 }}
      />
      <Divider sx={{ marginBottom: 2 }} />

      <Typography variant="h6" gutterBottom>
        Сортировка
      </Typography>
      <FormControl fullWidth size="small" sx={{ marginBottom: 2 }}>
        <InputLabel>Порядок</InputLabel>
        <Select
          value={sortBy && order ? `${sortBy}_${order}` : ''}
          label="Порядок"
          onChange={handleSort}
        >
          <MenuItem value="">
            <em style={{ color: '#9e9e9e' }}>По умолчанию</em>
          </MenuItem>
          <MenuItem value="price_asc">Сначала дешёвые</MenuItem>
          <MenuItem value="price_desc">Сначала дорогие</MenuItem>
          <MenuItem value="title_asc">По названию (A-Z)</MenuItem>
        </Select>
      </FormControl>
      <Divider sx={{ marginBottom: 2 }} />

      <Typography variant="h6" gutterBottom>
        Категории
      </Typography>
      <List component="nav" sx={{ maxHeight: 300, overflow: 'auto' }}>
        <ListItemButton
          selected={category === null}
          onClick={() => handleCategory(null)}
        >
          <ListItemText primary="Все товары" />
        </ListItemButton>

        {categories?.map((cat) => (
          <ListItemButton
            key={cat}
            selected={category === cat}
            onClick={() => handleCategory(cat)}
          >
            <ListItemText primary={cat} sx={{ textTransform: 'capitalize' }} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};
