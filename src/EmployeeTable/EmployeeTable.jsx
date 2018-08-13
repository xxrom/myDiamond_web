import React, { Component } from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { fetchTableData, initMethods, initState } from './libs';

class EmployeeTable extends Component {
  constructor(props) {
    super(props);
    initState.call(this);
    initMethods.call(this);
  }

  componentDidMount() {
    fetchTableData.call(this);
  }

  render() {
    const { data, columns } = this.state;

    const editEmployee = (row) => (
      <div>
        <button onClick={this.onClickDelete(row)}>Удалить</button>
        <button onClick={this.onClickEdit(row)}>Изменить</button>
      </div>
    );

    return (
      <div>
        <h1>Employee Table</h1>
        {data.length === 0 ? (
          ''
        ) : (
          <ReactTable
            data={data}
            columns={columns}
            defaultPageSize={10}
            className="-striped -highlight"
            SubComponent={(row) => editEmployee(row)}
          />
        )}
      </div>
    );
  }
}

export default EmployeeTable;
