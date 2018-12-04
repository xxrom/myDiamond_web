import React, { Component } from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import './WorkTable.css';
// import fetchTableData from './libs/fetchTableData';
import { fetchWorkTableData } from '../../libs/api';
import { timeToString } from '../../libs/time';
import * as HOC from '../../HOC';

import { WorkRow } from './templates/';

class WorkTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          Header: 'Работа',
          columns: [
            {
              Header: 'Номер работы',
              accessor: 'work_id',
              minWidth: 60,
            },
            {
              Header: 'Дата работы',
              id: 'date',
              minWidth: 140,
              accessor: (d) => {
                return timeToString(d.date);
              },
            },
            {
              Header: 'Трудящийся Id',
              accessor: 'employee_id_table',
              minWidth: 200,
            },
            {
              Header: 'Дневной номер трудящегося',
              accessor: 'name_day_id',
              minWidth: 100,
            },
            {
              Header: 'Все время',
              accessor: 'full_time',
              minWidth: 100,
            },
          ],
        },
        {
          Header: 'Артикул',
          columns: [
            {
              Header: 'Номер артикула',
              accessor: 'article_id',
            },
            {
              Header: 'Артикул изделия',
              accessor: 'article',
            },
            {
              Header: 'Время на артикул',
              accessor: 'time',
            },
            {
              Header: 'Количество изделий',
              accessor: 'amount',
            },
            {
              Header: 'Коробок',
              accessor: 'boxes',
            },
            {
              Header: 'Шт. в коробке',
              accessor: 'in_box',
            },
            {
              Header: 'Последняя коробка',
              accessor: 'plus_box',
            },
          ],
        },
      ],
      data: [],
    };

    this.fetchWorkTableData = fetchWorkTableData.bind(this);
  }

  componentDidMount() {
    this.fetchWorkTableData();
  }
  render() {
    const { columns, data } = this.state;
    const WorkRowFunction = (row) => <WorkRow row={row} />;

    return (
      <div className="table-wrapper">
        <h1>Work Table</h1>
        {HOC.isEmpty({
          data,
          columns,
          dataName: 'data',
          defaultPageSize: 20,
          className: '-striped -highlight',
          SubComponent: WorkRowFunction,
          defaultSorted: [{ id: 'work_id', desc: true }],
        })(ReactTable)}
      </div>
    );
  }
}

export { WorkTable };
