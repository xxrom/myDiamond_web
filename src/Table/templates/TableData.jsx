import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default ({ header, data }) => (
  <TableBody>
    {data.map((item) => (
      <TableRow key={item.work_id}>
        {header.map((key, index) => (
          <TableCell numeric key={`${key}${item[key]}${index}`}>
            {item[key]}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
);
