import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  Box,
  Chip,
  Rating,
} from '@mui/material';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  discountPercentage?: number;
  rating?: number;
  brand?: string;
}

export const ProductCard = ({
  id,
  title,
  price,
  image,
  description,
  discountPercentage,
  rating,
  brand,
}: ProductCardProps) => {
  const oldPrice = discountPercentage
    ? (price / (1 - discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: '8px',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
        '&:hover': {
          boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
        },
      }}
    >
      {discountPercentage && (
        <Chip
          label={`-${Math.round(discountPercentage)}%`}
          color="error"
          size="small"
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            fontWeight: 'bold',
            fontSize: '0.75rem',
            height: '20px',
          }}
        />
      )}

      <CardActionArea
        component={Link}
        to={`/product/${id}`}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            objectFit: 'contain',
            padding: '10px',
            aspectRatio: '1 / 1',
            width: '100%',
          }}
        />

        <CardContent sx={{ padding: '10px', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '8px',
              marginBottom: '5px',
            }}
          >
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: 'bold' }}
            >
              {price} $
            </Typography>

            {oldPrice && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                {oldPrice} $
              </Typography>
            )}
          </Box>

          <Typography
            variant="body2"
            component="div"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.2,
              height: '2.4em',
            }}
          >
            {brand && <span style={{ fontWeight: 'bold' }}>{brand} / </span>}
            {title}
          </Typography>

          {rating && (
            <Box
              sx={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}
            >
              <StarIcon
                fontSize="small"
                sx={{ color: '#ffc107', marginRight: '4px' }}
              />
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {rating}
              </Typography>
            </Box>
          )}
        </CardContent>
      </CardActionArea>

      <Box sx={{ padding: '10px' }}>
        <Button
          variant="contained"
          fullWidth
          component={Link}
          to={`/product/${id}`}
          sx={{ borderRadius: '8px', fontWeight: 'bold' }}
        >
          Подробнее
        </Button>
      </Box>
    </Card>
  );
};
