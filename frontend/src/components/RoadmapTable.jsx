import React from 'react';
import ProductSection from './ProductSection';
import { Box } from '@mui/material';

const RoadmapTable = ({ data, visibleColumns }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto' }}>
      {data.map((product) => (
        <Box key={product.id} sx={{ minWidth: '300px' }}>
          <ProductSection product={product} visibleColumns={visibleColumns} />
        </Box>
      ))}
    </Box>
  );
};

export default RoadmapTable;
