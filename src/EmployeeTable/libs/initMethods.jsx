import { deleteRatesByEmployeeId, deleteEmployeeByEmployeeId } from './api';
import { fetchTableData } from './';

export default function() {
  this.onClickDelete = (row) => () => {
    console.log(`clicked Delete ROW`);
    console.log(row);

    const { employee_id } = row.original;
    console.log(`delete by employee_id = ${employee_id}`);

    deleteRatesByEmployeeId(employee_id)
      .then((data) => {
        console.log(`+ 1) data after deleting all Rates`, data);
        return data;
      })
      .then((data) => deleteEmployeeByEmployeeId(data.employee_id))
      .then((data) => {
        console.log(`+ 2) data after deleting all Employees`, data);
        this.fetchTableData(); // update Table data
      })
      .catch((err) => console.log(err));
  };

  this.fetchTableData = fetchTableData.bind(this);

  this.onClickEdit = (row) => () => {
    console.log(`clicked edit ROW`);
    console.log(row);
  };
}
