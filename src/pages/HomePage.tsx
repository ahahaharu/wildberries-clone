import React from 'react';
import { useGetProductsQuery } from '../redux/api/productsApi';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { ProductCard } from '../components/ProductCard/ProductCard';

const HomePage = () => {
  const { data, isLoading, isError } = useGetProductsQuery();

  if (isLoading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error">
        Произошла ошибка при загрузке товаров
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: '20px 0' }}>
      <Typography variant="h4" component="h1" sx={{ marginBottom: '20px' }}>
        Хиты продаж
      </Typography>

      <Grid container spacing={3}>
        {data?.products.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <ProductCard
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.thumbnail}
              description={product.description}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
