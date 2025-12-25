import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from '@mui/material';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

export const ProductCard = ({
  id,
  title,
  price,
  image,
  description,
}: ProductCardProps) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={title}
        sx={{ objectFit: 'contain', padding: '10px' }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description}
        </Typography>

        <Typography variant="h6" color="primary" sx={{ marginTop: '10px' }}>
          {price} $
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" component={Link} to={`/product/${id}`}>
          Подробнее
        </Button>
        <Button size="small" variant="contained">
          В корзину
        </Button>
      </CardActions>
    </Card>
  );
};
