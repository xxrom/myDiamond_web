import React, { Component } from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import * as HOC from '../../HOC';
import { initMethods, initState, timeToString } from './libs';
// import { AddEmployee } from '../../components/smart/';
// import { labels } from '../EmployeeForm/libs';

import { RowSettings } from './templates';

class EmployeeTable extends Component {
  constructor(props) {
    super(props);
    initState.call(this);
    initMethods.call(this);
  }

  componentDidMount() {
    this.fetchTableData();
  }

  render() {
    const { data, columns } = this.state;

    return (
      <div>
        <h1>Employee Table</h1>
        {HOC.isEmpty({
          data,
          columns,
          dataName: 'data',
          defaultPageSize: 20,
          className: '-striped -highlight',
          SubComponent: RowSettings,
        })(ReactTable)}
      </div>
    );
  }
}

export { EmployeeTable };
