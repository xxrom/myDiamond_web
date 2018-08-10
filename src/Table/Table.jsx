import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import './Table.css';
import fetchTableData from './libs/fetchTableData';
import { TableHeader, TableData } from './templates';

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [], header: [] };

    this.fetchTableData = fetchTableData.bind(this);
  }

  componentDidMount() {
    this.fetchTableData();
  }
  render() {
    if (this.state.data.length === 0) {
      return <h1>Нет данных =(</h1>;
    }

    const { header, data } = this.state;

    return (
      <div className="table-wrapper">
        <TableUI className="table">
          {HOC.IsEmpty({ dataName: 'header', header })(TableHeader)}
          <TableData data={data} header={header} />
        </TableUI>
      </div>
    );
  }
}

export default Table;
