import React from 'react';
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from '../redux/api/productsApi';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  selectFilter,
  setCategory,
  setPage,
} from '../redux/slices/filterSlice';
import { SidebarFilters } from '../components/Sidebar/SidebarFilters';

const HomePage = () => {
  const dispatch = useAppDispatch();

  const { currentPage, itemsPerPage, category, search, sortBy, order } =
    useAppSelector(selectFilter);
  const skip = (currentPage - 1) * itemsPerPage;

  const { data, isLoading, isError } = useGetProductsQuery({
    limit: itemsPerPage,
    skip: skip,
    category: category,
    search,
    sortBy,
    order,
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    dispatch(setPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getMaxCountOfPages = () => Math.ceil(data.total / itemsPerPage);

  return (
    <Container maxWidth="xl" sx={{ padding: '20px 0' }}>
      {' '}
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Каталог
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <SidebarFilters />
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          {isLoading && (
            <CircularProgress sx={{ display: 'block', margin: '50px auto' }} />
          )}

          {isError && (
            <Typography color="error">Ошибка загрузки данных</Typography>
          )}

          {!isLoading && !isError && (
            <>
              <Grid container spacing={2}>
                {data?.products.map((product) => (
                  <Grid key={product.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                    <ProductCard
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      image={product.thumbnail}
                      description={product.description}
                      discountPercentage={product.discountPercentage}
                      rating={product.rating}
                      brand={product.brand}
                    />
                  </Grid>
                ))}
              </Grid>

              {data?.products.length === 0 && (
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                  Ничего не найдено
                </Typography>
              )}

              {data && data.total > 0 && getMaxCountOfPages() != 1 && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '40px',
                  }}
                >
                  <Pagination
                    count={getMaxCountOfPages()}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
