import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>Товар № {id}</h2>
    </div>
  );
};

export default ProductPage;
