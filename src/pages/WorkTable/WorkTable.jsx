import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import TableUI from '@material-ui/core/Table';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import './WorkTable.css';
import fetchTableData from './libs/fetchTableData';
import * as HOC from '../../HOC';

import { WorkRow } from './templates/';

class WorkTable extends Component {
  constructor(props) {
    super(props);

    console.log('init workTable');
    this.state = {
      columns: [
        {
          Header: 'Работа',
          columns: [
            {
              Header: 'Номер работы',
              accessor: 'work_id',
              minWidth: 80,
            },
            {
              Header: 'Дата работы',
              accessor: 'date',
              minWidth: 100,
            },
            {
              Header: 'Трудящийся Id',
              accessor: 'date',
              minWidth: 100,
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

    this.fetchTableData = fetchTableData.bind(this);
  }

  componentDidMount() {
    this.fetchTableData();
  }
  render() {
    const { columns, data } = this.state;

    return (
      <div className="table-wrapper">
        <h1>Work Table</h1>
        {HOC.isEmpty({
          data,
          columns,
          dataName: 'data',
          defaultPageSize: 20,
          className: '-striped -highlight',
          SubComponent: WorkRow,
          defaultSorted: [{ id: 'work_id', desc: true }],
        })(ReactTable)}
      </div>
    );
  }
}

export { WorkTable };
