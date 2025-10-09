import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import RoadmapItem from './RoadmapItem';

const ProductSection = ({ product, visibleColumns }) => {
  return (
    <TableContainer component={Paper} sx={{ mb: 4 }}>
      <Typography variant="h6" component="div" sx={{ p: 2 }}>
        {product.name}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            {visibleColumns.carryOver && <TableCell>Carry-over status</TableCell>}
            {visibleColumns.roadmapStatus && <TableCell>Roadmap status</TableCell>}
            {visibleColumns.itemName && <TableCell>Item name</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {product.items.map((item) => (
            <RoadmapItem key={item.id} item={item} visibleColumns={visibleColumns} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductSection;
