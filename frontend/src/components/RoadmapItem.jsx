import React from 'react';
import { TableCell, TableRow, Link } from '@mui/material';

const RoadmapItem = ({ item, visibleColumns }) => {
  const carryOverColor = item.colorStatus.carry_over ? item.colorStatus.carry_over.color : 'transparent';
  const healthColor = item.colorStatus.health ? item.colorStatus.health.color : 'transparent';

  return (
    <TableRow>
      {visibleColumns.carryOver && (
        <TableCell sx={{ width: '120px', backgroundColor: carryOverColor }}>
          {item.carryOverStatus}
        </TableCell>
      )}
      {visibleColumns.roadmapStatus && (
        <TableCell sx={{ width: '120px', backgroundColor: healthColor }}>
          {item.roadmapStatus}
        </TableCell>
      )}
      {visibleColumns.itemName && (
        <TableCell>
          <Link href={item.jiraLink} target="_blank" rel="noopener noreferrer">
            {item.name}
          </Link>
        </TableCell>
      )}
    </TableRow>
  );
};

export default RoadmapItem;
