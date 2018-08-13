export default function() {
  this.state = {
    columns: [
      {
        Header: 'Сотрудник',
        columns: [
          {
            Header: 'Номер Сотрудника',
            accessor: 'employee_id',
          },
          {
            Header: 'Фамилия Имя',
            accessor: 'name',
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
          },
          {
            Header: 'Тариф-выходной',
            accessor: 'rate_week_end',
          },
          {
            Header: 'Начало тарифа',
            accessor: 'start_date',
          },
          {
            Header: 'Конец тарифа',
            accessor: 'end_date',
          },
        ],
      },
    ],
    data: [],
  };
}
