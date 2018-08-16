import React, { Component } from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import * as HOC from '../HOC';
import { initMethods, initState, timeToString } from './libs';
import AddEmployee from '../AddEmployee';
import { labels } from '../EmployeeForm/libs';

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

    const editEmployee = (row) => {
      const newLabels = [...labels];
      console.log(row);
      console.log(newLabels);
      newLabels.map(({ key, type }, index) => {
        switch (type) {
          case 'text': {
            if (typeof row.original[key] !== 'undefined') {
              newLabels[index].defaultValue = row.original[key];
            }
            break;
          }
          case 'date': {
            if (typeof row.original[key] !== 'undefined') {
              newLabels[index].defaultValue = timeToString(row.original[key]);
            }
          }
        }
      });
      console.log('newLabels', newLabels);
      return (
        <div>
          <button onClick={this.onClickDelete(row)}>Удалить Сотрудника</button>
          <button onClick={this.onClickEdit(row)}>Изменить Сотрудника</button>
          <AddEmployee labels={labels} />
        </div>
      );
    };

    return (
      <div>
        <h1>Employee Table</h1>
        {HOC.isEmpty({
          data,
          columns,
          dataName: 'data',
          defaultPageSize: 20,
          className: '-striped -highlight',
          SubComponent: (row) => editEmployee(row),
        })(ReactTable)}
      </div>
    );
  }
}

export default EmployeeTable;
