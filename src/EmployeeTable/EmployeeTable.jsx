import React, { Component } from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import * as HOC from '../HOC';
import { initMethods, initState } from './libs';

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

    const editEmployee = (row) => (
      <div>
        <button onClick={this.onClickDelete(row)}>Удалить Сотрудника</button>
        <button onClick={this.onClickEdit(row)}>Изменить Сотрудника</button>
      </div>
    );

    return (
      <div>
        <h1>Employee Table</h1>
        {HOC.isEmpty({
          dataName: 'data',
          data,
          columns,
          defaultPageSize: 10,
          className: '-striped -highlight',
          SubComponent: (row) => editEmployee(row),
        })(ReactTable)}
      </div>
    );
  }
}

export default EmployeeTable;
