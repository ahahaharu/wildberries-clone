import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Rating,
  Chip,
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { useGetProductByIdQuery } from '../redux/api/productsApi';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useState(0);

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(id || '');
  const handleGoBack = () => navigate(-1);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const oldPrice =
    product && product.discountPercentage
      ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
      : null;

  if (isLoading)
    return <CircularProgress sx={{ display: 'block', margin: '50px auto' }} />;

  if (isError || !product) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" color="error">
          Товар не найден
        </Typography>
        <Button onClick={handleGoBack}>Назад</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleGoBack}
        sx={{ mb: 3 }}
      >
        Назад
      </Button>
      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={3}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative',
              height: '450px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'white',
            }}
          >
            {product.discountPercentage > 0 && (
              <Chip
                label={`-${Math.round(product.discountPercentage)}%`}
                color="error"
                sx={{
                  position: 'absolute',
                  top: 20,
                  left: 20,
                  fontWeight: 'bold',
                }}
              />
            )}
            <img
              src={product.images[0] || product.thumbnail}
              alt={product.title}
              style={{
                maxWidth: '90%',
                maxHeight: '90%',
                objectFit: 'contain',
              }}
            />
          </Paper>
        </Grid>

        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ fontSize: '1rem' }}
          >
            {product.brand} / {product.category}
          </Typography>

          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 800, mb: 1, lineHeight: 1.2 }}
          >
            {product.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                value={product.rating}
                precision={0.1}
                readOnly
                size="small"
              />
              <Typography variant="body2" sx={{ ml: 1, fontWeight: 'bold' }}>
                {product.rating}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.reviews.length} отзывов)
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
              <Typography
                variant="h3"
                color="primary"
                sx={{ fontWeight: 'bold' }}
              >
                {product.price} $
              </Typography>
              {oldPrice && (
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through', mb: 1 }}
                >
                  {oldPrice} $
                </Typography>
              )}
            </Box>
          </Box>

          <Typography variant="body1" sx={{ mb: 4 }}>
            {product.description}
          </Typography>

          <Box sx={{ mt: 'auto', display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
              fullWidth
              sx={{ height: '50px' }}
            >
              В корзину
            </Button>
          </Box>

          <Typography variant="caption" sx={{ mt: 2, color: 'text.secondary' }}>
            {product.shippingInformation} | {product.warrantyInformation}
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ width: '100%', mt: 6 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={handleTabChange}>
            <Tab label="Характеристики" />
            <Tab label={`Отзывы (${product.reviews.length})`} />
          </Tabs>
        </Box>

        {tabIndex === 0 && (
          <Box sx={{ p: 3 }}>
            <TableContainer component={Paper} elevation={0} variant="outlined">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: 'bold' }}
                    >
                      Вес
                    </TableCell>
                    <TableCell>{product.weight} г</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: 'bold' }}
                    >
                      Размеры (ШxВxГ)
                    </TableCell>
                    <TableCell>
                      {product.dimensions.width} x {product.dimensions.height} x{' '}
                      {product.dimensions.depth} см
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: 'bold' }}
                    >
                      Гарантия
                    </TableCell>
                    <TableCell>{product.warrantyInformation}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: 'bold' }}
                    >
                      Возврат
                    </TableCell>
                    <TableCell>{product.returnPolicy}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {tabIndex === 1 && (
          <Box sx={{ p: 3 }}>
            {product.reviews.length === 0 ? (
              <Typography>Отзывов пока нет.</Typography>
            ) : (
              <List>
                {product.reviews.map((review, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <Typography variant="subtitle1" fontWeight="bold">
                              {review.reviewerName}
                            </Typography>
                            <Rating
                              value={review.rating}
                              size="small"
                              readOnly
                            />
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography
                              variant="caption"
                              display="block"
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              {new Date(review.date).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                              {review.comment}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {index < product.reviews.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ProductPage;
