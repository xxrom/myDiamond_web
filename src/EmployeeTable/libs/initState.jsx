export default function() {
  this.state = {
    columns: [
      {
        Header: 'Employee',
        columns: [
          {
            Header: 'employee_id',
            accessor: 'employee_id',
          },
          {
            Header: 'name',
            accessor: 'name',
          },
        ],
      },
      {
        Header: 'Rate',
        columns: [
          {
            Header: 'rate_id',
            accessor: 'rate_id',
          },
          {
            Header: 'rate_week_day',
            accessor: 'rate_week_day',
          },
          {
            Header: 'rate_week_end',
            accessor: 'rate_week_end',
          },
          {
            Header: 'start_date',
            accessor: 'start_date',
          },
          {
            Header: 'end_date',
            accessor: 'end_date',
          },
        ],
      },
    ],
    data: [],
  };
}
