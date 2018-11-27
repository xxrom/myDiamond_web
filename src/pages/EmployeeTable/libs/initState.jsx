import { timeToString } from '../../../libs/time';
function initState() {
  this.state = {
    columns: [
      {
        Header: 'Сотрудник',
        columns: [
          {
            Header: 'Номер Сотрудника',
            accessor: 'employee_id',
            sortMethod: (a, b) => {
              // Возможно это нафиг не нужно, но решил протестить.
              if (a.length === b.length) {
                return a > b ? 1 : -1;
              }
              return a.length > b.length ? 1 : -1;
            },
            minWidth: 80,
          },
          {
            Header: 'Фамилия Имя',
            accessor: 'name',
            PivotValue: ({ value }) => (
              <span style={{ color: 'darkred' }}>{value}</span>
            ),
            minWidth: 250,
          },
        ],
      },
      {
        Header: 'Тариф',
        columns: [
          {
            Header: 'Номер Тарифа',
            accessor: 'rate_id',
          },
          {
            Header: 'Тариф-будни',
            accessor: 'rate_week_day',
            sortMethod: (a, b) => {
              return a > b ? 1 : -1;
            },
          },
          {
            Header: 'Тариф-выходной',
            accessor: 'rate_week_end',
          },
          {
            Header: 'Начало тарифа',
            id: 'start_date',
            accessor: (d) => timeToString(d.start_date),
          },
          {
            Header: 'Конец тарифа',
            id: 'end_date',
            accessor: (d) => timeToString(d.end_date),
          },
        ],
      },
    ],
    data: [],
  };
}

export { initState };
