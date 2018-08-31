import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default ({ header }) => (
  <TableHead>
    <TableRow>
      {header.map((item) => (
        <TableCell numeric key={item}>
          {item}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);
