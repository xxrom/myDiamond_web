import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableUI from '@material-ui/core/Table';

import './Table.css';
import fetchTableData from './libs/fetchTableData';
import { TableHeader, TableData } from './templates';
import * as HOC from '../HOC';

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
    const { header, data } = this.state;

    return (
      <div className="table-wrapper">
        <TableUI className="table">
          {HOC.isEmpty({ dataName: 'header', header })(TableHeader)}
          {HOC.isEmpty({ dataName: 'data', data, header })(TableData)}
        </TableUI>
      </div>
    );
    // <TableData data={data} header={header} />
  }
}

export default Table;
