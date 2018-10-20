import { api } from '../../../libs/';

export default function() {
  this.onClickDelete = (row) => () => {
    console.log(`clicked Delete ROW`);
    console.log(row);

    const { employee_id } = row.original;
    console.log(`delete by employee_id = ${employee_id}`);

    api
      .deleteRatesByEmployeeId(employee_id)
      .then((data) => {
        console.log(`+ 1) data after deleting all Rates`, data);
        return data;
      })
      .then((data) => api.deleteEmployeeByEmployeeId(data.employee_id))
      .then((data) => {
        console.log(`+ 2) data after deleting all Employees`, data);
        this.fetchTableData(); // update Table data
      })
      .catch((err) => console.log(err));
  };

  this.fetchTableData = api.fetchTableData.bind(this);

  this.onClickEdit = (row) => () => {
    console.log(`clicked edit ROW`);
    console.log(row);
  };
}
